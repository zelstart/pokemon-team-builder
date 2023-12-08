import React, { useState, useEffect } from 'react';
import Select from 'react-select';
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
import { calculateTotalStats, calculateColor } from '../utils/pokemonUtils.js';

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

function PokemonCard({ setTeamMember, name, level, ability, stats = {}, ivs, evs, moves = [], sprite = SpritePlaceholder, nature, types = ['unknown'] }) {

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const MAX_HP_STAT_VALUE = 720;
    const MAX_OTHER_STAT_VALUE = 250;

    const pokemonLevel = level;
    const [baseStats, setBaseStats] = useState(stats || { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 });
    const [ivStats, setIvStats] = useState(ivs || { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 });
    const [evStats, setEvStats] = useState(evs || { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 });

    // create an array of objects for each stat
    const statsArray = [
        { name: 'HP', base: baseStats.hp, iv: ivStats.hp, ev: evStats.hp },
        { name: 'Atk', base: baseStats.atk, iv: ivStats.atk, ev: evStats.atk },
        { name: 'Def', base: baseStats.def, iv: ivStats.def, ev: evStats.def },
        { name: 'SpA', base: baseStats.spa, iv: ivStats.spa, ev: evStats.spa },
        { name: 'SpD', base: baseStats.spd, iv: ivStats.spd, ev: evStats.spd },
        { name: 'Spe', base: baseStats.spe, iv: ivStats.spe, ev: evStats.spe },
    ];

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
        fetch('https://pokeapi.co/api/v2/pokemon?limit=1118')
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
        // sets the name to all lowercase to match the API so you don't get errors for invalid pokemon names
        const formattedEditName = editName.toLowerCase();
        // checks if the name entered is a valid pokemon name
        if (!pokemonNames.map(name => name.toLowerCase()).includes(formattedEditName)) {
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
                        <input className='pokemon-input rc-400' list='pokemon-names' type='text' value={editName} onChange={e => setEditName(e.target.value)} />
                        <datalist id='pokemon-names'>
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
                    <>
                        <label htmlFor='sm-input rc-400' className='sm-label'>lv.</label>
                        <input id='sm-input' className='pokemon-input sm-input rc-400' type='text' value={editLevel} onChange={e => setEditLevel(e.target.value)} />
                    </>
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
        const totalStat = calculateTotalStats(statName.toLowerCase(), baseStats, ivStats, evStats, pokemonLevel, nature, natures);
        const width = totalStat / (statName === 'HP' ? MAX_HP_STAT_VALUE : MAX_OTHER_STAT_VALUE) * 100;
        const color = calculateColor(statName.toLowerCase(), baseStats, ivStats, evStats, pokemonLevel, nature, natures, MAX_HP_STAT_VALUE, MAX_OTHER_STAT_VALUE);

        return (
            <Row className='stat-table'>
                <div className='d-flex'>
                    <Col lg={1} className='rc-400-bold stat-margin'>{statName}</Col>
                    <Col lg={1} className='rc-400 stat-margin'>{baseStat}</Col>
                    <Col lg={1} className='rc-400 stat-margin'>{iv}</Col>
                    <Col lg={1} className='rc-400 stat-margin'>{ev}</Col>
                    <Col lg={1} className='rc-400 stat-margin'>{totalStat}</Col>
                    <Col lg={5} className='rc-400 stat-margin d-flex align-items-center'>
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
                    {statsArray.map((stat) => (
                        <StatRow key={stat.name} statName={stat.name} baseStat={stat.base} iv={stat.iv} ev={stat.ev} />
                    ))}

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
                                                {/* will populate with data from api fetch */}
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
                                            <select className='pokemon-input rc-400' value={editMoves[index] || ''} onChange={e => handleMoveChange(index, e.target.value)}>
                                                <option value="">--select move--</option>
                                                {/* will populate with data from api fetch */}
                                            </select>
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
                                    <select className='pokemon-input rc-400' type='text' value={editAbility} onChange={e => setEditAbility(e.target.value)}>
                                        <option value="">--select ability--</option>
                                        {/* will populate with data from api fetch */}
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
