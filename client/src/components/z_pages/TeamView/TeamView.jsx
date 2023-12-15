import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import PokemonCard from '../../PokemonCard/PokemonCard.jsx';
import { QUERY_SINGLE_TEAM } from '../../utils/queries';
import { Row, Col, Container } from 'react-bootstrap';

const TeamView = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(QUERY_SINGLE_TEAM, {
        variables: { teamId: id },
    });

    const [teamMembers, setTeamMembers] = useState([]);

    const updateTeamMember = (index, newMember) => {
        setTeamMembers(prevMembers => {
            const newMembers = [...prevMembers];
            newMembers[index] = newMember;
            return newMembers;
        });
    };


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <Container className=''>
            <Row>
                <Col> 
                <h1>{data.team.name}</h1>
                </Col>
            </Row>

            <Row>
                {data.team.pokemon.map((pokemon, index) => {
                    const { move_1, move_2, move_3, move_4, nature, level, types, sprite, ability, name } = pokemon;
                    const moves = [move_1, move_2, move_3, move_4];
                    console.log(data);
                    return (
                        <Col className='mb-3' lg={4} key={index}>
                            <PokemonCard
                                updateTeamMember={updateTeamMember}
                                moves={moves}
                                nature={nature}
                                level={level}
                                types={types}
                                sprite={sprite}
                                ability={ability}
                                name={name}
                                isViewing={true}
                            />
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
            }

export default TeamView;