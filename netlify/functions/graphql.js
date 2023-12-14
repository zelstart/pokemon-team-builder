const { ApolloServer, gql } = require('apollo-server-lambda');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('../../server/schemas');

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
    context.callbackWaitsForEmptyEventLoop = false;
    await connectToDatabase();
    return server.createHandler()(event, context);
};