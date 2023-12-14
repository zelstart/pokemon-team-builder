import { React, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TeamCard from '../../TeamCard/TeamCard.jsx';
import { useQuery } from '@apollo/client';
import { GET_RECENT_TEAMS } from '../../utils/queries';

const Home = () => {
    const { loading, error, data } = useQuery(GET_RECENT_TEAMS);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <Container className='mt-2'>
            <Row className='mx-5 mt-5'>
                <Col lg={12}>
                    <h2>Recent Teams</h2>
                </Col>
            </Row>

            <Row className='mx-5'>
                {data.recentTeams.map((team) => (
                    <TeamCard
                        key={team._id}
                        teamId={team._id}
                        teamName={team.name}
                        pokemon={team.pokemon.map(p => ({ name: p.name, icon: p.sprite }))}
                    />
                ))}
            </Row>
        </Container>
    );
};

export default Home;