const { Schema, model } = require('mongoose');

// import schema from Pokemon.js
const pokemonSchema = require('./pokemon');

const teamsSchema = new Schema(
  {
    name : {
        type: String,
        required: true
    } ,
     pokemon : [pokemonSchema]
  },
);


const Teams = model('Teams', teamsSchema);

module.exports = Teams;
