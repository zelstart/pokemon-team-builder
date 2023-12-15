import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './TeamCard.css';

// these should be the names of the props we'll be using.
// handleRatingUpdate will be the function needed to update the rating
// the handleRatingUpdate will need to check the following:
// whether or not the user is logged in, whether or not the user is the creator of the team, and whether or not they've rated this team before.
// if any of these are true, the rating WILL NOT be updated and the user should be notified
// that function will probably live in the home page, since that's where the team cards will be rendered.
function TeamCard({ teamName, teamId, rating, pokemon, handleRatingUpdate, user, creator }) {
  return (
    <Col lg={3} className='team-card mx-2 mt-2'>
      <div className='team-card-body'>
        <Row className='top-element justify-content-center text-center'><Link className='team-name' to={`/team/${teamId}`}>{teamName}</Link></Row>
        <Row className='middle-element align-content-between'>
          {Array.from({ length: 6 }).map((_, index) => (
            <Row key={index} className='team-row align-content-center flex-nowrap'>
            {pokemon[index] ? (
              <>
                <Col xs={4} sm={4} md={4} lg={4} className=''>
                  <img className='team-icon' src={pokemon[index].icon} alt={pokemon[index].name} />
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} className='d-flex align-items-center'>
                  <p className='rc-400-bold p-name m-0 p-0'>{pokemon[index].name}</p>
                </Col>
              </>
            ) : (
              // Render placeholder if there is no Pokemon at this index
              <Col className='d-flex align-items-center'>
                <p className='rc-400-bold p-name m-0 p-0'></p>
              </Col>
            )}
          </Row>
          ))}
        </Row>
        <Row className='bottom-element'>{/* TODO: rating system. */}</Row>
      </div>
    </Col>
  );
}
export default TeamCard;