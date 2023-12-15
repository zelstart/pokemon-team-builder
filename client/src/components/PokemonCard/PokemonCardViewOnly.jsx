import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../PokemonCard/PokemonCard.css';
import typesIcons from '../../assets/data/types';
import natures from '../../assets/data/natures';

function PokemonCardViewOnly({ name, level, statsArray, moves, sprite, ability, nature, types = [] }) {

    return (
        <div className='poke-card-no-gradient'>
            <Row className='justify-content-center no-select'>
                <Row className='card-top justify-content-center'>
                    <Col lg={6} md={6} sm={6} className='d-flex align-items-center'>
                        <p className='poke-name'>{name}</p>
                    </Col>

                    <Col lg={3} md={3} sm={3} className='d-flex align-items-center'>
                        <p className='poke-level'>lv. {level}</p>
                    </Col>
                </Row>

                <Row className='card-middle'>
                    <Col lg={12}>
                        <p className='rc-400 rc-400-bold'>moveset</p>
                    </Col>
                    <Col lg={8} md={8} sm={8}>
                        <Row>
                            {[...Array(2)].map((_, index) => (
                                <Col lg={6} md={6} sm={6} key={index}>
                                    <p className='rc-400'>{moves[index] || '--'}</p>
                                </Col>
                            ))}
                        </Row>
                        <Row>
                            {[...Array(2)].map((_, index) => (
                                <Col lg={6} md={6} sm={6} key={index + 2}>
                                    <p className='rc-400'>{moves[index + 2] || '--'}</p>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <img className='poke-icon' src={sprite} alt={name} />
                    </Col>
                </Row>

                <Row className='card-bottom'>
                    <Col lg={6} sm={6}>
                        <p><span className='rc-400-bold'>ability: </span><span className='rc-400'>{ability}</span></p>
                        <p><span className='rc-400-bold'>nature: </span><span className='rc-400'>{nature}</span></p>
                    </Col>

                    <Col lg={6} sm={6} className='types d-flex flex-column'>
                        {types && types.slice(0, 2).map((type, index) => {
                            const icon = typesIcons[type.toLowerCase()];
                            return (
                                <img className='type-icon' key={index} src={icon} alt={type} />
                            );
                        })}
                    </Col>
                </Row>
            </Row>
        </div>
    );
}

export default PokemonCardViewOnly;