import React, { useState } from 'react';
import { Card, Row, Col, Form, Button, Container, Modal } from 'react-bootstrap';
import '../../../style.css';
import './PokemonCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

// this is just the html so far!! need to actually make it dynamic with props and such

function PokemonCard() {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    // TEMPORARY DATA
    const [baseStats, setBaseStats] = useState({ hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 });
    const [ivStats, setIvStats] = useState({ hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 });
    const [evStats, setEvStats] = useState({ hp: 252, atk: 0, def: 0, spa: 252, spd: 0, spe: 4 });

    // const [baseStats, setBaseStats] = useState({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 });
    // const [ivStats, setIvStats] = useState({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 });
    // const [evStats, setEvStats] = useState({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 });

    // will need to pass in props for baseStats, ivStats, evStats
    // useEffect(() => {
    //     setBaseStats(baseStatsProp);
    //     setIvStats(ivStatsProp);
    //     setEvStats(evStatsProp);
    // }, [baseStatsProp, ivStatsProp, evStatsProp]);

    const MAX_HP_STAT_VALUE = 720;
    const MAX_OTHER_STAT_VALUE = 250;
    const pokemonLevel = 50; // Placeholder for Pokemon's level

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
                        {/* This will eventually be condensed into a map function for each stat instead of making a new row for each stat.*/}
                        <Row className='card-middle'>
                            <Col className='stats' lg={12}>
                                <div className='stat'>
                                    <div className='stat-line'>
                                        <span className='bold'>HP</span>
                                        <span>{calculateTotalStats('hp')}</span>
                                        <div className='stat-bar' style={{ width: `${calculateTotalStats('hp') / MAX_HP_STAT_VALUE * 100}%`, backgroundColor: calculateColor('hp') }}></div>
                                    </div>
                                </div>

                                <div className='stat'>
                                    <div className='stat-line'>
                                        <span className='bold'>Atk</span>
                                        <span>{calculateTotalStats('atk')}</span>
                                        <div className='stat-bar' style={{ width: `${calculateTotalStats('atk') / MAX_HP_STAT_VALUE * 100}%`, backgroundColor: calculateColor('atk') }}></div>
                                    </div>
                                </div>

                                <div className='stat'>
                                    <div className='stat-line'>
                                        <span className='bold'>Def</span>
                                        <span>{calculateTotalStats('def')}</span>
                                        <div className='stat-bar' style={{ width: `${calculateTotalStats('def') / MAX_HP_STAT_VALUE * 100}%`, backgroundColor: calculateColor('def') }}></div>
                                    </div>
                                </div>

                                <div className='stat'>
                                    <div className='stat-line'>
                                        <span className='bold'>SpA </span>
                                        <span>{calculateTotalStats('spa')}</span>
                                        <div className='stat-bar' style={{ width: `${calculateTotalStats('spa') / MAX_HP_STAT_VALUE * 100}%`, backgroundColor: calculateColor('spa') }}></div>
                                    </div>
                                </div>


                                <div className='stat'>
                                    <div className='stat-line'>
                                        <span className='bold'>SpD </span>
                                        <span>{calculateTotalStats('spd')}</span>
                                        <div className='stat-bar' style={{ width: `${calculateTotalStats('spd') / MAX_HP_STAT_VALUE * 100}%`, backgroundColor: calculateColor('spd') }}></div>
                                    </div>
                                </div>


                                <div className='stat'>
                                    <div className='stat-line'>
                                        <span className='bold'>Spe </span>
                                        <span>{calculateTotalStats('def')}</span>
                                        <div className='stat-bar' style={{ width: `${calculateTotalStats('spe') / MAX_HP_STAT_VALUE * 100}%`, backgroundColor: calculateColor('def') }}></div>
                                    </div>
                                </div>

                            </Col>
                        </Row>

                        {/* CARD BOTTOM // IVs + EVs */}
                        {/* will clean/pretty this up later. eventually will fill data dynamically.  */}
                        <Row className='card-bottom'>
                            <Col className='iv-spread' lg={6}>
                                <p className='bold'>IVs</p>
                                <p className='stat'><span className='bold'>HP: </span> 0 </p>
                                <p className='stat'><span className='bold'>Atk: </span> 0 </p>
                                <p className='stat'><span className='bold'>Def: </span> 0 </p>
                                <p className='stat'><span className='bold'>SpA: </span> 0 </p>
                                <p className='stat'><span className='bold'>SpD: </span> 0 </p>
                                <p className='stat'><span className='bold'>Spe: </span> 0 </p>
                            </Col>
                            <Col className='ev-spread' lg={6}>
                                <p className='bold'>EVs</p>
                                <p className='stat'><span className='bold'>HP: </span> 0 </p>
                                <p className='stat'><span className='bold'>Atk: </span> 0 </p>
                                <p className='stat'><span className='bold'>Def: </span> 0 </p>
                                <p className='stat'><span className='bold'>SpA: </span> 0 </p>
                                <p className='stat'><span className='bold'>SpD: </span> 0 </p>
                                <p className='stat'><span className='bold'>Spe: </span> 0 </p>
                            </Col>
                        </Row>
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
                                <p className='moves bold'>moveset</p>
                            </Col>
                            <Col lg={4} md={4} sm={4}>
                                <Row>
                                    <p className='poke-move'>vine whip</p>
                                    <p className='poke-move'>leer</p>
                                </Row>
                            </Col>
                            <Col lg={4} md={4} sm={4}>
                                <Row>
                                    <p className='poke-move'>razor leaf</p>
                                    <p className='poke-move'>growl</p>
                                </Row>
                            </Col>
                            <Col lg={4}>
                                <img className='poke-icon' src='https://img.pokemondb.net/sprites/sword-shield/icon/bulbasaur.png' alt='bulbasaur' />
                            </Col>
                        </Row>

                        {/* CARD BOTTOM // ABILITY + NATURE */}
                        <Row className='card-bottom'>
                            <Col lg={6}>
                                <p className='ability'><span className="bold">ability: </span>overgrow</p>
                                <p className='nature'><span className="bold">nature: </span>modest</p>
                            </Col>

                            <Col lg={6} className='types d-flex flex-column'>
                                <img className='type-icon' src='https://archives.bulbagarden.net/media/upload/thumb/7/7b/GrassIC_SV.png/105px-GrassIC_SV.png' alt='grass' />
                                <img className='type-icon' src='https://archives.bulbagarden.net/media/upload/thumb/7/7b/GrassIC_SV.png/105px-GrassIC_SV.png' alt='grass' />
                            </Col>

                        </Row>
                    </Col>
                </Row>
            )}
        </div>
    );
}
export default PokemonCard;