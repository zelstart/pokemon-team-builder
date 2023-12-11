const { Schema, model } = require('mongoose');

// import schema from Pokemon.js
const pokemonSchema = require('./pokemon');

const teamsSchema = new Schema(
  {
    name : {
        type: String,
        required: true
    } ,
    userCreator: {
      type: String,
      required: true,
      trim: true,
    },
    pokemon : [pokemonSchema]
  },
);


const Teams = model('Teams', teamsSchema);

module.exports = Teams;
