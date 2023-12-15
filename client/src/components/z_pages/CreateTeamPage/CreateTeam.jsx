import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonCard from '../../PokemonCard/PokemonCard.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import './CreateTeam.css';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { CREATE_TEAM } from '../../utils/mutations';

const CreateTeam = () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    const [maker, { error }] = useMutation(CREATE_TEAM);
    const [teamName, setTeamName] = useState('');

    if (!token) {
        return false;
    }


    // Initial state for a team member
    const initialState = {
        name: 'Pikachu',
        level: '10',
        moves: ['mega punch', 'pay day', 'thunder punch', 'slam'],
        ability: 'static',
        nature: 'hardy',
        types: ['Electric'],
        stats: {
            hp: 35,
            atk: 55,
            def: 40,
            spa: 50,
            spd: 50,
            spe: 90
        },
        ivs: {
            hp: 31,
            atk: 0,
            def: 31,
            spa: 31,
            spd: 31,
            spe: 31

        },
        evs: {
            hp: 4,
            atk: 0,
            def: 0,
            spa: 252,
            spd: 0,
            spe: 252
        },
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    }

    const [teamMembers, setTeamMembers] = useState([initialState]);

    const handleSetTeamMember = (index, newMember) => {
        setTeamMembers(prevTeam => prevTeam.map((member, i) => i === index ? newMember : member));
    };

    const updateTeamMember = (index, newMember) => {
        setTeamMembers(prevMembers => {
            const newMembers = [...prevMembers];
            newMembers[index] = newMember;
            return newMembers;
        });
    };


    const addTeamMember = () => {
        if (teamMembers.length < 6) {
            setTeamMembers([...teamMembers, initialState]);
        }
    };

    const handleRemovePokemon = (index) => {
        if (teamMembers.length <= 1) {
            alert('You must have at least one Pokémon on the page.');
            return;
        }

        const updatedTeamMembers = teamMembers.filter((_, i) => i !== index);
        setTeamMembers(updatedTeamMembers);
    };


    const navigate = useNavigate();
    const handleSaveTeam = async () => {
        try {
            console.log(teamMembers);
            const pokemonData = teamMembers.map(member => ({
                name: member.name,
                sprite: member.sprite,
                move_1: member.moves[0],
                move_2: member.moves[1],
                move_3: member.moves[2],
                move_4: member.moves[3],
                ability: member.ability,
                nature: member.nature,
                level: member.level,
            }));

            const responseTeam = await maker({ variables: { name: teamName, pokemon: pokemonData } });
            console.log("response : ", responseTeam);

            // Redirect to the /me route
            navigate('/me');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container className='mt-2'>
            <Row>
                <Col>
                    <div>
                        <label className='mt-3 mx-1' htmlFor="teamName"><h3>Team Name:</h3></label>
                    </div>
                    <div>
                        <input
                            className='mx-1 team-name-input'
                            type="text"
                            id="teamName"
                            value={teamName}
                            onChange={e => setTeamName(e.target.value)}
                        />
                    </div>
                    <button className='my-4 mx-1 save-team' onClick={handleSaveTeam}>save team</button>
                </Col>
            </Row>
            <Row>
            {teamMembers.map((member, index) => (
                <Col lg={4} key={index} className='mb-4'>
                    <PokemonCard
                        {...member}
                        index={index}
                        updateTeamMember={updateTeamMember}
                        onRemove={() => handleRemovePokemon(index)}
                        isViewing={false}
                        />
                </Col>
            ))}
                {teamMembers.length < 6 && (
                    <Col lg={4} className='mb-4 d-flex justify-content-center align-items-center'>
                        <button className='mx-1 add-pkmn' onClick={addTeamMember}>add a pokémon</button>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default CreateTeam;