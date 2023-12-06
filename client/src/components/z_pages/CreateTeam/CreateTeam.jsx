import React from 'react';
import PokemonCard from '../../PokemonCard/PokemonCard.jsx';
import { Container, Row, Col } from 'react-bootstrap';

const CreateTeam = () => {
    const team = new Array(6).fill(null);
    const firstRow = team.slice(0, 3);
    const secondRow = team.slice(3, 6);

    return (
        <Container>
            <Row>
                {firstRow.map((pokemon, index) => (
                    <Col lg={4} key={index} className='mb-4'>
                        <PokemonCard />
                    </Col>
                ))}
            </Row>
            <Row>
                {secondRow.map((pokemon, index) => (
                    <Col lg={4} key={index + 3} className='mb-4'>
                        <PokemonCard />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CreateTeam;