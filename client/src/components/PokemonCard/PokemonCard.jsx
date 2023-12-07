import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Container, Modal } from 'react-bootstrap';
import '../../style.css';
import './PokemonCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import SpritePlaceholder from '../../assets/images/placeholders/sprite-placeholder.png';
import typesIcons from '../../assets/data/types';
import natures from '../../assets/data/natures';

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

function PokemonCard({ setTeamMember, name = '--', level = '--', ability = '--', stats = {}, ivs, evs, moves = [], sprite = SpritePlaceholder, nature = '--', types = ['unknown'] }) {


    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const MAX_HP_STAT_VALUE = 720;
    const MAX_OTHER_STAT_VALUE = 250;

    const pokemonLevel = level;
    // set the base stats, ivs, and evs to the values passed in as props, or to '--' if they are not passed in
    const [baseStats, setBaseStats] = useState(stats || { hp: '--', atk: '--', def: '--', spa: '--', spd: '--', spe: '--' });
    const [ivStats, setIvStats] = useState(ivs || { hp: '--', atk: '--', def: '--', spa: '--', spd: '--', spe: '--' });
    const [evStats, setEvStats] = useState(evs || { hp: '--', atk: '--', def: '--', spa: '--', spd: '--', spe: '--' });

    // create an array of objects for each stat
    const statsArray = [
        { name: 'HP', base: baseStats.hp, iv: ivStats.hp, ev: evStats.hp },
        { name: 'Atk', base: baseStats.atk, iv: ivStats.atk, ev: evStats.atk },
        { name: 'Def', base: baseStats.def, iv: ivStats.def, ev: evStats.def },
        { name: 'SpA', base: baseStats.spa, iv: ivStats.spa, ev: evStats.spa },
        { name: 'SpD', base: baseStats.spd, iv: ivStats.spd, ev: evStats.spd },
        { name: 'Spe', base: baseStats.spe, iv: ivStats.spe, ev: evStats.spe },
    ];

    // calculate the stats for the pokemon
    const calculateTotalStats = (stat) => {
        let totalStat;
        if (stat === 'hp') {
            totalStat = ((2 * baseStats[stat] + ivStats[stat] + Math.floor(evStats[stat] / 4)) * pokemonLevel / 100) + pokemonLevel + 10;
        } else {
            totalStat = ((2 * baseStats[stat] + ivStats[stat] + Math.floor(evStats[stat] / 4)) * pokemonLevel / 100) + 5;
        }

        // adjust the stat based on the nature
        const natureEffect = natures[nature];
        if (natureEffect) {
            if (natureEffect.increase === stat) {
                totalStat *= 1.1;
            }
            if (natureEffect.decrease === stat) {
                totalStat *= 0.9;
            }
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

    const [isFlipped, setIsFlipped] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editName, setEditName] = useState(name);
    const [editLevel, setEditLevel] = useState(level);
    const [editAbility, setEditAbility] = useState(ability);
    const [editNature, setEditNature] = useState(nature);
    const [editMoves, setEditMoves] = useState(moves);
    const [editSprite, setEditSprite] = useState(sprite);
    const [editStats, setEditStats] = useState(stats);
    const [editIVs, setEditIVs] = useState(ivs);
    const [editEVs, setEditEVs] = useState(evs);
    const [pokemonNames, setPokemonNames] = useState([]);

    // API CALL TO GET LIST OF POKEMON NAMES 
    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
            .then(response => response.json())
            .then(data => setPokemonNames(data.results.map(pokemon => pokemon.name)));
    }, []);

    // This useEffect hook will run whenever the editName state changes
    useEffect(() => {
        if (!isEditMode) {
            setEditName(name);
        }
    }, [name, isEditMode]);

    const handleEditClick = () => {
        setIsEditMode(!isEditMode);
    };

    const handleSaveClick = () => {
        if (!pokemonNames.includes(editName)) {
            // turn this into a prettier alert later
            // also might want to think about if we care about what the case gets set to.
            alert('Please enter a valid Pokémon name.');
            return;
        }

        const updatedPokemon = {
            name: editName,
            level: editLevel,
            nature: editNature,
            ability: editAbility,
            moves: editMoves,
            ivs: editIVs,
            evs: editEVs,
        };

        setTeamMember(updatedPokemon);
        setIsEditMode(false);
    };

    // creates the card-top section of the card
    const cardTop = (
        <Row className='card-top justify-content-center'>

            <Col lg={6} md={6} sm={6} className='d-flex align-items-center'>
                {isEditMode ? (
                    <>
                        <input list="pokemon-names" type="text" value={editName} onChange={e => setEditName(e.target.value)} />
                        <datalist id="pokemon-names">
                            {pokemonNames.map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))}
                        </datalist>
                    </>
                ) : (
                    <p className='poke-name'>{name}</p>
                )}
            </Col>

            <Col lg={3} md={3} sm={3} className='d-flex align-items-center'>
                {isEditMode ? (
                    <input type="text" value={editLevel} onChange={e => setEditLevel(e.target.value)} />
                ) : (
                    <p className='poke-level'>lv. {level}</p>
                )}
            </Col>

            <Col lg={1} className='d-flex align-items-center justify-content-start'>
                <FontAwesomeIcon
                    icon={isEditMode ? faFloppyDisk : faPenToSquare}
                    onClick={isEditMode ? handleSaveClick : handleEditClick}
                    className='edit-save'
                />
            </Col>

            <Col lg={3} md={3} sm={3} className='d-flex align-items-center'>
                <div className='stat-button' onClick={handleFlip}> <FontAwesomeIcon icon={faChevronRight} className='stats-chevron' /></div>
            </Col>

        </Row>
    );


    // creates a row for each stat
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

    return (
        <div className='poke-card m-1'>
            {isFlipped ? (
                <Row className='justify-content-center no-select'>
                    {cardTop}

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
                    {statsArray.map((stat) => (
                        <StatRow key={stat.name} statName={stat.name} baseStat={stat.base} iv={stat.iv} ev={stat.ev} />
                    ))}

                </Row>
            ) : (
                // CARD FRONT // MOVES, SPRITE, ABILITY, NATURE
                <Row className='justify-content-center no-select'>
                    {cardTop}
                    {/* CARD MIDDLE // MOVESET + SPRITE */}
                    <Row className='card-middle'>
                        <Col lg={12}>
                            <p className='rc-400 rc-400-bold'>moveset</p>
                        </Col>
                        <Col lg={8} md={8} sm={8}>
                            <Row>
                                {[...Array(2)].map((_, index) => (
                                    <Col lg={6} md={6} sm={6} key={index}>
                                        {isEditMode ? (
                                            <input type="text" value={editMoves[index] || ''} onChange={e => handleMoveChange(index, e.target.value)} />
                                        ) : (
                                            <p className='rc-400'>{moves[index] || '--'}</p>
                                        )}
                                    </Col>
                                ))}
                            </Row>
                            <Row>
                                {[...Array(2)].map((_, index) => (
                                    <Col lg={6} md={6} sm={6} key={index + 2}>
                                        {isEditMode ? (
                                            <input type="text" value={editMoves[index + 2] || ''} onChange={e => handleMoveChange(index + 2, e.target.value)} />
                                        ) : (
                                            <p className='rc-400'>{moves[index + 2] || '--'}</p>
                                        )}
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                        <Col lg={4}>
                            <img className='poke-icon' src={sprite} alt={name} />
                        </Col>
                    </Row>

                    {/* CARD BOTTOM // ABILITY + NATURE */}
                    <Row className='card-bottom'>
                        <Col lg={6} sm={6}>
                            {isEditMode ? (
                                <>
                                    <input type="text" value={editAbility} onChange={e => setEditAbility(e.target.value)} />
                                    <select value={editNature} onChange={e => setEditNature(e.target.value)}>
                                        {Object.keys(natures).map((nature, index) => (
                                            <option key={index} value={nature}>{nature}</option>
                                        ))}
                                    </select>
                                </>
                            ) : (
                                <>
                                    <p><span className='rc-400-bold'>ability: </span><span className='rc-400'>{ability}</span></p>
                                    <p><span className='rc-400-bold'>nature: </span><span className='rc-400'>{nature}</span></p>
                                </>
                            )}
                        </Col>

                        <Col lg={6} sm={6} className='types d-flex flex-column'>
                            {types.slice(0, 2).map((type, index) => (
                                <img className='type-icon' key={index} src={typesIcons[type]} alt={type} />
                            ))}
                        </Col>
                    </Row>

                </Row>
            )}
        </div>

    );
}

export default PokemonCard;