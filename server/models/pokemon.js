const { Schema, model } = require('mongoose');

const pokemonSchema = new Schema(
  {
    level : {
    type: Number,
    required: true,
    default: 1
    },
    pokeDexNo : {
    type: Number,
    required: true,
    },
    move_1: {
      type: String,
    },
    move_2: {
    type: String,
    },
    move_3: {
    type: String,
    },
    move_4: {
    type: String,
    },
    ability: {
    type: String,
    },
    item: {
    type: String,
    },
    hp_ev: {
    type: Number,
    default: 0
    },
    attack_ev: {
    type: Number,
    default: 0
    },
    special_attack_ev: {
    type: Number,
    default: 0
    },
    defense_ev: {
    type: Number,
    default: 0
    },
    special_defense_ev: {
    type: Number,
    default: 0
    },
    speed_ev: {
    type: Number,
    default: 0
    },
    hp_iv: {
    type: Number,
    default: 0
    },
    attack_iv: {
    type: Number,
    default: 0
    },
    special_attack_iv: {
    type: Number,
    default: 0
    },
    defense_iv: {
    type: Number,
    default: 0
    },
    special_defense_iv: {
    type: Number,
    default: 0
    },
    speed_iv: {
    type: Number,
    default: 0
    },
  },
);

module.exports = pokemonSchema;
