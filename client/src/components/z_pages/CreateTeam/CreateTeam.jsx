import React from 'react';
import PokemonCard from '../../PokemonCard/PokemonCard.jsx';
import { Container, Row, Col } from 'react-bootstrap';

const CreateTeam = () => {
    const team = new Array(6).fill(null);

    return (
        <Container>
            <Row>
                {team.map((pokemon, index) => (
                    <Col key={index}>
                        <PokemonCard />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CreateTeam;