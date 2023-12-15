import React, { useState, useEffect, useRef } from 'react';
import { Card, Row, Col, Form, Button, Container, Modal } from 'react-bootstrap';
import { isEqual } from 'lodash';
import '../../style.css';
import './PokemonCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import SpritePlaceholder from '/images/placeholders/sprite-placeholder.png';
import typesIcons from '../../assets/data/types';
import natures from '../../assets/data/natures';
import { calculateTotalStats, calculateColor } from '../utils/pokemonUtils.js';
import { fetchPokemonNames, getPokemonDetails } from '../utils/pokemonAPI.js';

// ivs and evs are buggy.

function PokemonCard({
    index,
    isViewing,
    updateTeamMember,
    onRemove,
    name,
    level,
    ability,
    moves = [],
    sprite = SpritePlaceholder,
    nature,
    types = ['unknown']
}) {

    const [currentMember, setCurrentMember] = useState({ name, level, ability, moves, sprite, nature, types });
    const prevMemberRef = useRef();

    useEffect(() => {
        prevMemberRef.current = currentMember;
    }, [currentMember]);

    const prevMember = prevMemberRef.current;

    useEffect(() => {
        if (!isEqual(prevMember, currentMember)) {
            updateTeamMember(index, currentMember);
        }
    }, [currentMember, index, updateTeamMember]);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    // const MAX_HP_STAT_VALUE = 720;
    // const MAX_OTHER_STAT_VALUE = 250;

    // const pokemonLevel = level;
    // const [baseStats, setBaseStats] = useState(stats);
    // const [ivStats, setIvStats] = useState(ivs);
    // const [evStats, setEvStats] = useState(evs);

    // // create an array of objects for each stat
    // const statsArray = [
    //     { name: 'HP', base: baseStats.hp, iv: ivStats.hp, ev: evStats.hp },
    //     { name: 'Atk', base: baseStats.atk, iv: ivStats.atk, ev: evStats.atk },
    //     { name: 'Def', base: baseStats.def, iv: ivStats.def, ev: evStats.def },
    //     { name: 'SpA', base: baseStats.spa, iv: ivStats.spa, ev: evStats.spa },
    //     { name: 'SpD', base: baseStats.spd, iv: ivStats.spd, ev: evStats.spd },
    //     { name: 'Spe', base: baseStats.spe, iv: ivStats.spe, ev: evStats.spe },
    // ];


    // const initialEditIVs = statsArray.reduce((acc, stat) => ({ ...acc, [stat.name]: 0 }), {});
    // const initialEditEVs = statsArray.reduce((acc, stat) => ({ ...acc, [stat.name]: 0 }), {});

    // const [editIVs, setEditIVs] = useState(initialEditIVs);
    // const [editEVs, setEditEVs] = useState(initialEditEVs);

    const [isFlipped, setIsFlipped] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editName, setEditName] = useState(name);
    const [editLevel, setEditLevel] = useState(level);
    const [editAbility, setEditAbility] = useState(ability);
    const [editNature, setEditNature] = useState(nature);
    const [editMoves, setEditMoves] = useState(moves);
    const [editSprite, setEditSprite] = useState(sprite);
    // const [editStats, setEditStats] = useState(stats);
    const [pokemonNames, setPokemonNames] = useState([]);

    const [pokemonInfo, setPokemonInfo] = useState([]);
    const [editAbilities, setEditAbilities] = useState([]);
    const [editTypes, setEditTypes] = useState([]);


    useEffect(() => {
        fetchPokemonNames()
            .then(pokemonInfo => setPokemonInfo(pokemonInfo))
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        if (editName) {
            getPokemonDetails(editName)
                .then(details => {
                    if (details) {
                        console.log(details);
                        setEditSprite(details.sprite);
                        setEditMoves(details.moves);
                        // setEditStats(details.stats);
                        setEditAbilities(details.abilities);
                        setEditTypes(details.types);

                        if (details.abilities.length > 0) {
                            setEditAbility(details.abilities[0]);
                        }
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    }, [editName]);

    // This useEffect hook will run whenever the editName state changes
    useEffect(() => {
        if (!isEditMode) {
            setEditName(name);
        }
    }, [name, isEditMode]);

    // function handleIVChange(statName, value) {
    //     setEditIVs(prevIVs => ({ ...prevIVs, [statName]: value }));
    // }

    // function handleEVChange(statName, value) {
    //     setEditEVs(prevEVs => ({ ...prevEVs, [statName]: value }));
    // }

    const handleMoveChange = (index, newMove) => {
        setEditMoves(prevMoves => {
            const newMoves = [...prevMoves];
            newMoves[index] = newMove;
            return newMoves;
        });
    };


    const handleEditClick = () => {
        setIsEditMode(!isEditMode);
    };

    const handleSaveClick = () => {
        const formattedEditName = editName.toLowerCase();
        if (!pokemonInfo.map(pokemon => pokemon.name.toLowerCase()).includes(formattedEditName)) {
            alert('Please enter a valid Pokémon name.');
            return;
        }

        // capitalize the first letter of the pokemon name
        const capitalizedEditName = formattedEditName.charAt(0).toUpperCase() + formattedEditName.slice(1);

        const updatedPokemon = {
            name: capitalizedEditName,
            level: editLevel,
            nature: editNature,
            ability: editAbility,
            moves: editMoves,
            sprite: editSprite,
            types: editTypes,
        };

        setCurrentMember(updatedPokemon);
        setIsEditMode(false);
    };

    // creates the card-top section of the card
    const cardTop = (
        <Row className='card-top justify-content-center'>

            <Col lg={6} md={6} sm={6} className='d-flex align-items-center'>
                {isEditMode ? (
                    <>
                        <input className='pokemon-input rc-400' list='pokemon-names' type='text' value={editName} onChange={e => setEditName(e.target.value)} />
                        <datalist id='pokemon-names'>
                            {pokemonInfo.map((pokemon, index) => (
                                <option key={index} value={pokemon.name}>
                                    {pokemon.name}
                                </option>
                            ))}
                        </datalist>
                    </>
                ) : (
                    <p className='poke-name'>{name}</p>
                )}
            </Col>

            <Col lg={3} md={3} sm={3} className='d-flex align-items-center'>
                {isEditMode ? (
                    <>
                        <label htmlFor='sm-input rc-400' className='sm-label'>lv.</label>
                        <input id='sm-input' className='pokemon-input sm-input rc-400' type='text' value={editLevel} onChange={e => setEditLevel(e.target.value)} />
                    </>
                ) : (
                    <p className='poke-level'>lv. {level}</p>
                )}
            </Col>

            {!isViewing && (
                <Col lg={1} className='d-flex align-items-center justify-content-start'>
                    <FontAwesomeIcon
                        icon={isEditMode ? faFloppyDisk : faPenToSquare}
                        onClick={isEditMode ? handleSaveClick : handleEditClick}
                        className='edit-save'
                    />
                </Col>
            )}

            {/* removing stats for now */}
            {/* <Col lg={3} md={3} sm={3} className='d-flex align-items-center'>
                <div className='stat-button' onClick={handleFlip}> <FontAwesomeIcon icon={faChevronRight} className='stats-chevron' /></div>
            </Col> */}

            {/* delete button */}
            <Col lg={3} md={3} sm={3} className='d-flex align-items-center'>
                <div className={`delete-button ${isViewing ? 'default-cursor' : ''}`} onClick={() => onRemove(index)}>
                    {!isViewing && (
                        <FontAwesomeIcon icon={faTrash} className='stats-chevron' />
                    )}
                </div>
            </Col>

        </Row>
    );

    // creates a row for each stat
    function renderStatRow(statName, baseStat, handleIVChange, handleEVChange, iv, ev, key) {
        const totalStat = calculateTotalStats(statName.toLowerCase(), baseStats, editIVs, editEVs, pokemonLevel, nature, natures);
        const width = totalStat / (statName === 'HP' ? MAX_HP_STAT_VALUE : MAX_OTHER_STAT_VALUE) * 100;
        const color = calculateColor(statName.toLowerCase(), baseStats, ivStats, evStats, pokemonLevel, nature, natures, MAX_HP_STAT_VALUE, MAX_OTHER_STAT_VALUE);

        return (
            <Row className='stat-table' key={key}>
                <div className='d-flex'>
                    <Col lg={1} className='rc-400-bold stat-margin'>{statName}</Col>
                    <Col lg={1} className='rc-400 stat-margin'>{baseStat}</Col>
                    <Col lg={1} className='rc-400 stat-margin'>
                        {isEditMode ?
                            <input className='sm-input' type="number" value={iv} onChange={(e) => handleIVChange(statName, e.target.value)} /> :
                            iv
                        }
                    </Col>
                    <Col lg={1} className='rc-400 stat-margin'>
                        {isEditMode ?
                            <input className='sm-input' type="number" value={ev} onChange={(e) => handleEVChange(statName, e.target.value)} /> :
                            ev
                        }
                    </Col>
                    <Col lg={1} className='rc-400 stat-margin'>{totalStat}</Col>
                    <Col lg={5} className='rc-400 stat-margin d-flex align-items-center'>
                        <div className='stat-bar' style={{ width: `${width}%`, backgroundColor: color }}></div>
                    </Col>
                </div>
            </Row>
        );
    }
    return (
        <div className='poke-card'>
            {isFlipped ? (
                <Row className='justify-content-center no-select'>
                    {cardTop}

                    {/* CARD MIDDLE // STATS */}
                    {/* Looks better on large screens now. Just gotta make it work with smaller screens.*/}
                    <Row className='stat-table'>
                        <div className='d-flex'>
                            <Col lg={1} className='rc-400-bold stat-margin'>Stat</Col>
                            <Col lg={1} className='rc-400-bold stat-margin'>Base</Col>
                            <Col lg={1} className='rc-400-bold stat-margin'>IV</Col>
                            <Col lg={1} className='rc-400-bold stat-margin'>EV</Col>
                            <Col lg={5} className='rc-400-bold stat-margin'>Total</Col>
                        </div>
                    </Row>
                    {statsArray.map((stat, index) => {
                        const { name: statName, base: baseStat } = stat;
                        const iv = editIVs[statName];
                        const ev = editEVs[statName];

                        return renderStatRow(statName, baseStat, handleIVChange, handleEVChange, iv, ev, index);
                    })}

                    {isEditMode ? (
                        <select className='rc-400 pokemon-input' value={editNature} onChange={e => setEditNature(e.target.value)}>
                            {Object.keys(natures).map(nature => {
                                const { increase, decrease } = natures[nature];
                                const label = increase && decrease ? `${nature} (+${increase.toUpperCase()}, -${decrease.toUpperCase()})` : nature;
                                return <option key={nature} value={nature}>{label}</option>
                            })}
                        </select>
                    ) : (
                        <></>
                    )}

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
                                            <select className='pokemon-input rc-400' value={editMoves[index] || ''} onChange={e => handleMoveChange(index, e.target.value)}>
                                                <option value="">--select move--</option>
                                                {editMoves.map((move, moveIndex) => {
                                                    const formattedMove = move.replace(/-/g, ' ');
                                                    return (
                                                        <option key={moveIndex} value={formattedMove}>{formattedMove}</option>
                                                    );
                                                })}
                                            </select>
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
                                            <select className='pokemon-input rc-400' value={editMoves[index + 2] || ''} onChange={e => handleMoveChange(index + 2, e.target.value)}>
                                                <option value="">--select move--</option>
                                                {editMoves.map((move, moveIndex) => {
                                                    const formattedMove = move.replace(/-/g, ' ');
                                                    return (
                                                        <option key={moveIndex} value={formattedMove}>{formattedMove}</option>
                                                    );
                                                })}
                                            </select>
                                        ) : (
                                            <p className='rc-400'>{moves[index + 2] || '--'}</p>
                                        )}
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                        <Col lg={4}>
                            <img className='poke-icon' src={editSprite} alt={name} />
                        </Col>
                    </Row>

                    {/* CARD BOTTOM // ABILITY + NATURE */}
                    <Row className='card-bottom'>
                        <Col lg={6} sm={6}>
                            {isEditMode ? (
                                <>
                                    <select className='pokemon-input rc-400' value={editAbility} onChange={e => setEditAbility(e.target.value)}>
                                        <option value="">--select ability--</option>
                                        {editAbilities.map((ability, abilityIndex) => {
                                            const formattedAbility = ability.replace(/-/g, ' ');
                                            return (
                                                <option key={abilityIndex} value={formattedAbility}>{formattedAbility}</option>
                                            );
                                        })}
                                    </select>

                                    <select className='rc-400 pokemon-input' value={editNature} onChange={e => setEditNature(e.target.value)}>
                                        {Object.keys(natures).map(nature => {
                                            const { increase, decrease } = natures[nature];
                                            const label = increase && decrease ? `${nature} (+${increase.toUpperCase()}, -${decrease.toUpperCase()})` : nature;
                                            return <option key={nature} value={nature}>{label}</option>
                                        })}
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
                            {editTypes.slice(0, 2).map((type, index) => {
                                const icon = typesIcons[type.toLowerCase()];
                                return (
                                    <img className='type-icon' key={index} src={icon} alt={type} />
                                );
                            })}
                        </Col>
                    </Row>

                </Row>
            )}
        </div>

    );
}

export default PokemonCard;    