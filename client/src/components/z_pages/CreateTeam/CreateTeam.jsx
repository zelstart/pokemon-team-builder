import { React, useState } from 'react';
import PokemonCard from '../../PokemonCard/PokemonCard.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import './CreateTeam.css';

const CreateTeam = () => {
    const [teamName, setTeamName] = useState('');

    // Initial state for a team member
    const initialState = {
        name: 'Pikachu',
        level: 10,
        moves: ['Tackle', 'Growl', 'Thunder Shock', 'Tail Whip'],
        ability: 'Static',
        nature: 'Hardy',
        Types: ['Electric'],
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

    const addTeamMember = () => {
        if (teamMembers.length < 6) {
            setTeamMembers([...teamMembers, initialState]);
        }
    };

    const handleSaveTeam = () => {
        // code to save the team to the user's account
        // for right now just a console log :p
        console.log('Team saved:', teamName, team);
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
                            className='mx-1'
                            type="text"
                            id="teamName"
                            value={teamName}
                            onChange={e => setTeamName(e.target.value)}
                        />
                    </div>
                    <button className='my-4 mx-1' onClick={handleSaveTeam}>Save Team</button>
                </Col>
            </Row>

            <Row>
                {teamMembers.map((member, index) => (
                    <Col lg={4} key={index} className='mb-4'>
                        <PokemonCard {...member} />
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