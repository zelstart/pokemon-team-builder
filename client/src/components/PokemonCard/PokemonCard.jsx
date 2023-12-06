import React, { useState } from 'react';
import { Card, Row, Col, Form, Button, Container, Modal } from 'react-bootstrap';
import '../../style.css';
import './PokemonCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Grass from '../../assets/images/grass.png';

// this is just the html so far!! need to actually make it dynamic with props and such
// what needs to be done: 
// 1. Create a state for each editable field (pokemon name, sprite, moveset, ability, nature, IVs, EVs, level) which will be editable once the user clicks the pen icon.
// 2. For the pokemon name, use an autocomplete input that fetches data from the PokeAPI as the user types.
// 3. When a pokemon is selected, update the other fields (sprite, moveset, ability, base stats) based on the API response.
// 4. For the sprite, add an onClick event that cycles through the available sprites.
// 5. For the moveset and ability, use a dropdown that is populated with the available moves/abilities for the selected pokemon.
// 6. For the nature, IVs, EVs, and level, use a simple input field with validation to ensure the entered values are within the allowed range.
// 7. Add an onChange event to each input field that updates the corresponding state.
// 8. When the user is done editing, have a save button that sends a mutation to the GraphQL API to update the team object.

function PokemonCard() {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };
    
    const MAX_HP_STAT_VALUE = 720;
    const MAX_OTHER_STAT_VALUE = 250;
    
    // TEMPORARY DATA
    const pokemonLevel = 50; // Placeholder for Pokemon's level
    const [baseStats, setBaseStats] = useState({ hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 });
    const [ivStats, setIvStats] = useState({ hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 });
    const [evStats, setEvStats] = useState({ hp: 252, atk: 0, def: 0, spa: 252, spd: 0, spe: 4 });

    // const [baseStats, setBaseStats] = useState(baseStatsProp);
    // const [ivStats, setIvStats] = useState(ivStatsProp);
    // const [evStats, setEvStats] = useState(evStatsProp);


    const stats = [
        { name: 'HP', base: baseStats.hp, iv: ivStats.hp, ev: evStats.hp },
        { name: 'Atk', base: baseStats.atk, iv: ivStats.atk, ev: evStats.atk },
        { name: 'Def', base: baseStats.def, iv: ivStats.def, ev: evStats.def },
        { name: 'SpA', base: baseStats.spa, iv: ivStats.spa, ev: evStats.spa },
        { name: 'SpD', base: baseStats.spd, iv: ivStats.spd, ev: evStats.spd },
        { name: 'Spe', base: baseStats.spe, iv: ivStats.spe, ev: evStats.spe },
    ];

    // will need to pass in props for baseStats, ivStats, evStats
    // useEffect(() => {
    //     setBaseStats(baseStatsProp);
    //     setIvStats(ivStatsProp);
    //     setEvStats(evStatsProp);
    // }, [baseStatsProp, ivStatsProp, evStatsProp]);

    // calculate the stats for the pokemon
    const calculateTotalStats = (stat) => {
        let totalStat;
        if (stat === 'hp') {
            totalStat = ((2 * baseStats[stat] + ivStats[stat] + Math.floor(evStats[stat] / 4)) * pokemonLevel / 100) + pokemonLevel + 10;
        } else {
            totalStat = ((2 * baseStats[stat] + ivStats[stat] + Math.floor(evStats[stat] / 4)) * pokemonLevel / 100) + 5;
        }
        return Math.round(totalStat);
    };

    // color the bars based on stat value
    const calculateColor = (stat) => {
        const totalStat = calculateTotalStats(stat);
        const maxStat = stat === 'hp' ? MAX_HP_STAT_VALUE : MAX_OTHER_STAT_VALUE;
        const totalStatPercentage = (totalStat / maxStat) * 100;
        const green = Math.round((totalStatPercentage / 100) * 255);
        const red = 255 - green;
        return `rgb(${red}, ${green}, 0)`;
    };


    const StatRow = ({ statName, baseStat, iv, ev }) => {
        const totalStat = calculateTotalStats(statName.toLowerCase());
        const width = totalStat / (statName === 'HP' ? MAX_HP_STAT_VALUE : MAX_OTHER_STAT_VALUE) * 100;
        const color = calculateColor(statName.toLowerCase());

        return (
            <Row className='stat-table'>
                <div className='d-flex'>
                    <Col className='rc-400-bold'>{statName}</Col>
                    <Col className='rc-400'>{baseStat}</Col>
                    <Col className='rc-400'>{iv}</Col>
                    <Col className='rc-400'>{ev}</Col>
                    <Col className='rc-400 d-flex align-items-center'>
                        <div className='stat-bar' style={{ width: `${width}%`, backgroundColor: color }}></div>
                    </Col>
                </div>
            </Row>
        );
    };

    // i'm thinking the best/easiest way is going to be make each field on the card editable. maybe add a little edit
    // icon, and when you click it, it turns into a form field. then when you click out of it, it turns back into text
    // and saves the value to the database. 
    return (
        <div>
            {isFlipped ? (
                // CARD BACK // STATS
                <Row className='justify-content-center no-select'>
                    <Col lg={3} md={6} sm={12} className='poke-card m-1'>
                        {/* CARD TOP // NAME + LEVEL */}
                        <Row className='card-top justify-content-center'>
                            <Col lg={6} md={6} sm={6} className='d-flex align-items-center'>
                                <p className='poke-name'>bulbasaur</p>
                            </Col>
                            <Col lg={3} md={3} sm={3} className='d-flex align-items-center'>
                                <p className='poke-level'>lv. 50</p>
                            </Col>
                            <Col lg={3} md={3} sm={3} className='d-flex align-items-center'>
                                <div className='stat-button' onClick={handleFlip}> <FontAwesomeIcon icon={faChevronRight} className='stats-chevron' /></div>
                            </Col>
                        </Row>

                        {/* CARD MIDDLE // STATS */}
                        {/* I dont love it right now. I want the first four columns to be narrower than the last, but it is what it is for now.*/}
                        <Row className='stat-table'>
                            <div className='d-flex'>
                                <Col className='rc-400-bold'>Stat</Col>
                                <Col className='rc-400-bold'>Base</Col>
                                <Col className='rc-400-bold'>IV</Col>
                                <Col className='rc-400-bold'>EV</Col>
                                <Col></Col>
                            </div>
                        </Row>
                        {stats.map((stat) => (
                            <StatRow key={stat.name} statName={stat.name} baseStat={stat.base} iv={stat.iv} ev={stat.ev} />
                        ))}
                    </Col>
                </Row>
            ) : (
                // CARD FRONT // MOVES, SPRITE, ABILITY, NATURE
                <Row className='justify-content-center no-select'>
                    <Col lg={3} md={6} sm={12} className='poke-card m-1'>
                        {/* CARD TOP // NAME + LEVEL */}
                        <Row className='card-top justify-content-center'>
                            <Col lg={6} md={6} sm={6} className='d-flex align-items-center'>
                                <p className='poke-name'>bulbasaur</p>
                            </Col>
                            <Col lg={3} md={3} sm={3} className='d-flex align-items-center'>
                                <p className='poke-level'>lv. 50</p>
                            </Col>
                            <Col lg={3} md={3} sm={3} className='d-flex align-items-center'>
                                <div className='stat-button' onClick={handleFlip}> <FontAwesomeIcon icon={faChevronRight} className='stats-chevron' /></div>
                            </Col>
                        </Row>
                        {/* CARD MIDDLE // MOVESET + SPRITE */}
                        <Row className='card-middle'>
                            <Col lg={12}>
                                <p className='rc-400 rc-400-bold'>moveset</p>
                            </Col>
                            <Col lg={4} md={4} sm={4}>
                                <Row>
                                    <p className='rc-400'>vine whip</p>
                                    <p className='rc-400'>leer</p>
                                </Row>
                            </Col>
                            <Col lg={4} md={4} sm={4}>
                                <Row>
                                    <p className='rc-400'>razor leaf</p>
                                    <p className='rc-400'>growl</p>
                                </Row>
                            </Col>
                            <Col lg={4}>
                                <img className='poke-icon' src='https://img.pokemondb.net/sprites/sword-shield/icon/bulbasaur.png' alt='bulbasaur' />
                            </Col>
                        </Row>

                        {/* CARD BOTTOM // ABILITY + NATURE */}
                        <Row className='card-bottom'>
                            <Col lg={6}>
                                <p><span className="rc-400-bold">ability: </span><span className='rc-400'>overgrow</span></p>
                                <p><span className="rc-400-bold">nature: </span><span className='rc-400'>modest</span></p>
                            </Col>

                            <Col lg={6} className='types d-flex flex-column'>
                                <img className='type-icon' src={Grass} alt='grass' />
                                <img className='type-icon' src={Grass} alt='grass' />
                            </Col>

                        </Row>
                    </Col>
                </Row>
            )}
        </div>

    );
}

export default PokemonCard;