import { React, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TeamCard from '../../TeamCard/TeamCard.jsx';

const Home = () => {

    //placeholder data for team card
    const teamData = {
        teamName: "Team Name Here",
        // rating: 4.5,
        pokemon: [
            { name: "Pikachu", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" },
            { name: "Pikachu", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" },
            { name: "Pikachu", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" },
            { name: "Pikachu", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" },
            { name: "Pikachu", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" },
            { name: "Pikachu", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" },
        ],
        user: "User1",
        creator: "Creator1"
    };

    return (
        <Container className='mt-2'>
            <Row className='mx-5 mt-5'>
                <Col lg={12}>
                    <h2>recently created teams</h2>
                </Col>
            </Row>

            <Row className='mx-5'>

                    <TeamCard {...teamData} />

            </Row>
        </Container>
    )
}

export default Home;