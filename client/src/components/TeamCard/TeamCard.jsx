import React from 'react';
import Card from 'react-bootstrap/Card';
import './TeamCard.css';

// these should be the names of the props we'll be using.
// handleRatingUpdate will be the function needed to update the rating
function TeamCard({ teamName, rating, pokemon, handleRatingUpdate, user, creator }) {
  return (
    <Card className="card">
      <Card.Body>
        <div className="top-element">{teamName}</div>
        <div className="middle-element">
        {/* Map the team's pokemon info in this element, just the icon and name for now */}
          {pokemon.map((p, index) => (
            <div key={index} className="team-row">
              <img src={p.icon} alt={p.name} />
              <span>{p.name}</span>
            </div>
          ))}
        </div>
        <div className="bottom-element">{/* TODO: rating system. */}</div>
      </Card.Body>
    </Card>
  );
}

export default TeamCard;