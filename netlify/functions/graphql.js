const { ApolloServer, gql } = require('apollo-server-lambda');
const mongoose = require('mongoose');
const typeDefs = require('../../server/schemas/typeDefs');
const resolvers = require('../../server/schemas/resolvers');

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        console.log('Using cached database instance');
        return Promise.resolve(cachedDb);
    }

    return mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(db => {
            cachedDb = db;
            return cachedDb;
        });
}

const server = new ApolloServer({ typeDefs, resolvers });

exports.handler = async (event, context) => {
    try {
        await connectToDatabase();
        return server.createHandler()(event, context);
    } catch (error) {
        console.error('Error handling request:', error);
        return {
            statusCode: 500,
            body: 'Internal Server Error',
        };
    }
};