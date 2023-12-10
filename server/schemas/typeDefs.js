const typeDefs = `
  type User {
    _id: ID
    username: String
    password: String
    savedTeams: [Teams]
  }

  type Teams {
    _id: ID
    name: String
    userCreator: String
    pokemon: [Pokemon]
  }

  type Pokemon {
    _id: ID
    pokeDexNo: Number
    level: Number
    move_1: String
    move_2: String
    move_3: String
    move_4: String
    ability: String
    item: String
    hp_ev: Number
    attack_ev: Number
    special_attack_ev: Number
    defense_ev: Number
    special_defense_ev: Number
    speed_ev: Number
    hp_iv: Number
    attack_iv: Number
    special_attack_iv: Number
    defense_iv: Number
    special_defense_iv: Number
    speed_iv: Number
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    teams(username: String): [Teams]
    team(teamId: ID!): Team
    me: User
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth
    createTeam(): Teams
    updateTeam(teamId: ID!, name: String!): Teams
    removeTeam(teamId: ID!): Teams
    addPokemon(teamId: ID!, pokeDexNo: Number!): Teams
    removePokemon(teamId: ID!, pokeId: ID!): Teams
    updatePokemon(teamId: ID!, pokeId: ID!, level: Number!, move_1: String!, move_2: String!, move_3: String!, move_4: String!, ability: String!, item: String!, hp_ev: Number!, attack_ev: Number!, special_attack_ev: Number!, defense_ev: Number!, special_defense_ev: Number!, speed_ev: Number!, hp_iv: Number!, attack_iv: Number!, special_attack_iv: Number!, defense_iv: Number!, special_defense_iv: Number!, speed_iv: Number!): Teams
  }
`;

module.exports = typeDefs;
