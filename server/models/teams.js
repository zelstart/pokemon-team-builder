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
    // pokemon : [pokemonSchema]
    pokemon: [
      {
        name: String,
        sprite: String,
        move_1: String,
        move_2: String,
        move_3: String,
        move_4: String,
        ability: String,
        nature: String,
        level: Number,
      },
    ],
  },
);


const Teams = model('Teams', teamsSchema);

module.exports = Teams;
