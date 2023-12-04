import React from 'react';
import { Card, Row, Col, Form, Button, Container, Modal } from 'react-bootstrap';
import './PokemonCard.css';

// this is just the html so far!! need to actually make it dynamic with props and such

function PokemonCard() {
    return (
<Row className='justify-content-center'>
    <Col lg={3} md={6} sm={12} className='poke-card m-1'>

        {/* CARD TOP // NAME + LEVEL */}
        <Row className='card-top justify-content-center'>
            <Col lg={6} md={6} sm={6} className='d-flex align-items-center'>
                <p className='poke-name'>bulbasaur</p>
            </Col>
            <Col lg={3} md={3} sm={3} className='d-flex align-items-center'>
                <p className='poke-level'>lv. 50</p>
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

                    <div className='stat-button'>stats <FontAwesomeIcon icon={faChevronRight} className='stats-chevron'/></div>
            </Col>
        </Row>
    )
}
export default PokemonCard;