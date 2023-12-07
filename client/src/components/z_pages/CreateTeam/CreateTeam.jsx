import React, { useState } from 'react';
import PokemonCard from '../../PokemonCard/PokemonCard.jsx';
import { Container, Row, Col } from 'react-bootstrap';

const CreateTeam = () => {
    // Initialize an array of objects for the state
    const [team, setTeam] = useState(new Array(6).fill({
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

    }));

    const handleSetTeamMember = (index, newMember) => {
        setTeam(prevTeam => prevTeam.map((member, i) => i === index ? newMember : member));
    };

    return (
        <Container className='mt-2'>
            <Row>
                {team.slice(0, 3).map((pokemon, index) => (
                    <Col lg={4} key={index} className='mb-4'>
                        <PokemonCard 
                            {...pokemon}
                            setTeamMember={(newMember) => handleSetTeamMember(index, newMember)}
                        />
                    </Col>
                ))}
            </Row>
            <Row>
                {team.slice(3, 6).map((pokemon, index) => (
                    <Col lg={4} key={index + 3} className='mb-4'>
                        <PokemonCard 
                            {...pokemon}
                            setTeamMember={(newMember) => handleSetTeamMember(index + 3, newMember)}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CreateTeam;