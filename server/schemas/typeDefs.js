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
    name: String
    level: String
    move_1: String
    move_2: String
    move_3: String
    move_4: String
    ability: String
    types: [String]
    nature: String
    sprite: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    teams(username: String): [Teams]
    team(teamId: ID!): Teams
    me: User
    recentTeams: [Teams]
  }



  input PokemonInput {
    name: String!
    sprite: String!
    move_1: String!
    move_2: String!
    move_3: String!
    move_4: String!
    ability: String!
    nature: String!
    level: String!
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth
    createTeam(name: String, pokemon: [PokemonInput!]!): Teams
    updateTeam(teamId: ID!, name: String!): Teams
    removeTeam(teamId: ID!): Teams
    addPokemon(teamId: ID!, pokeDexNo: Int!): Teams
    removePokemon(teamId: ID!, pokeId: ID!): Teams
    updatePokemon(teamId: ID!, pokeId: ID!, level: String!, move_1: String!, move_2: String!, move_3: String!, move_4: String!, ability: String!, item: String!, hp_ev: Int!, attack_ev: Int!, special_attack_ev: Int!, defense_ev: Int!, special_defense_ev: Int!, speed_ev: Int!, hp_iv: Int!, attack_iv: Int!, special_attack_iv: Int!, defense_iv: Int!, special_defense_iv: Int!, speed_iv: Int!): Teams
  }
`;

module.exports = typeDefs;
