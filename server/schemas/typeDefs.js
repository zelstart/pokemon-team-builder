const typeDefs = `
  type User {
    _id: ID
    username: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    me: User
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;