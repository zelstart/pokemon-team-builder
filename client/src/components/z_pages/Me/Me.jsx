import { React, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TeamCard from '../../TeamCard/TeamCard.jsx';

const Me = () => {
return (
    <Container className='mt-2'>
        <Row className='mx-5 mt-5'>
            <Col lg={12}>
                <h2>your teams</h2>
            </Col>
        </Row>

{/* Will turn this into a map later */}
        <Row className='mx-5'>
                <TeamCard {...teamData} />
        </Row>
    </Container>
)
}

export default Me;