const { ApolloServer, gql } = require('apollo-server-lambda');
const { resolvers } = require('../server/schemas/resolvers');
const { typeDefs } = require('../server/schemas/typeDefs');

const server = new ApolloServer({ typeDefs, resolvers });
exports.handler = server.createHandler();