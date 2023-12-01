import React from 'react';
import Card from 'react-bootstrap/Card';
import './TeamCard.css';

// these should be the names of the props we'll be using.
// handleRatingUpdate will be the function needed to update the rating
// the handleRatingUpdate will need to check the following:
// whether or not the user is logged in, whether or not the user is the creator of the team, and whether or not they've rated this team before.
// if any of these are true, the rating WILL NOT be updated and the user should be notified
// that function will probably live in the home page, since that's where the team cards will be rendered.
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