import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './TeamCard.css';

// these should be the names of the props we'll be using.
// handleRatingUpdate will be the function needed to update the rating
// the handleRatingUpdate will need to check the following:
// whether or not the user is logged in, whether or not the user is the creator of the team, and whether or not they've rated this team before.
// if any of these are true, the rating WILL NOT be updated and the user should be notified
// that function will probably live in the home page, since that's where the team cards will be rendered.
function TeamCard({ teamName, rating, pokemon, handleRatingUpdate, user, creator }) {
  return (
    <Col lg={3} className='team-card mx-2 mt-2'>
      <div className='team-card-body'>
        <Row className='top-element justify-content-center'>{teamName}</Row>
        <Row className='middle-element align-content-between'>
          {pokemon.map((p, index) => (
            <Row key={index} className='team-row align-content-center'>
              <Col lg={4} className=''>
                <img className='team-icon' src={p.icon} alt={p.name} />
              </Col>
              <Col className='d-flex align-items-center'>
                <p className='rc-400-bold p-name m-0 p-0'>{p.name}</p>
              </Col>
            </Row>
          ))}
        </Row>
        <Row className='bottom-element'>{/* TODO: rating system. */}</Row>
      </div>
    </Col>
  );
}

export default TeamCard;