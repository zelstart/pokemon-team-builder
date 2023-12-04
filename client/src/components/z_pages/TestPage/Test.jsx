import React from 'react';
import { Card, Row, Col, Form, Button, Container, Modal } from 'react-bootstrap';
import './Testing.css';
import '../../../style.css';

function TestingPage() {
    return (
        <Container>
            <Row>
                <Col className='poke-card'>

                    <Row className='card-top'>
                        <Col lg={8}>
                            <p className='poke-name'>Bulbasaur</p>
                        </Col>

                        <Col lg={2}>
                            <p className='poke-level'>lv. 50</p>
                        </Col>
                    </Row>

                    <Row className='card-middle'>
                        <Col lg={8}>
                            <Row>
                                <Col lg={6}>
                                    <p className='poke-move'>vine whip</p>
                                </Col>
                                <Col lg={6}>
                                    <p className='poke-move'>leer</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <p className='poke-move'>razor leaf</p>
                                </Col>
                                <Col lg={6}>
                                    <p className='poke-move'>growl</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={4}>
                            <Row>
                                <Col lg={12}>
                                    <img className='poke-icon' src='https://img.pokemondb.net/sprites/sword-shield/icon/bulbasaur.png' alt='bulbasaur' />
                                </Col>
                            </Row>
                        </Col>
                    </Row>


                    <Row className='card-bottom'>
                        <Col lg={8}>
                            <p><span className="bold">ability: </span>overgrow</p>
                            <p><span className="bold">nature: </span>modest</p>
                        </Col>
                    </Row>


                </Col>
            </Row>
        </Container>

    )
}