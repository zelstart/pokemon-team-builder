const express = require('express');
const { ApolloServer } = require('apollo-server-express'); // we're going to switch to using apollo-server-express
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors');
const db = require('./config/connection');
const routes = require('./routes');
const { typeDefs, resolvers } = require('./schemas');
const app = express();
const PORT = process.env.PORT || 3001;

// start Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Use authMiddleware to authenticate user and attach user data to req.user
    const authUser = authMiddleware({ req });
    return { user: authUser.user };
  },
  cors: {
    origin: '*', // Allow all origins
    credentials: true // Credentials are allowed
  }
});

const startApolloServer = async () => {
  await server.start();
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Apply the Apollo server as middleware to the express instance
  server.applyMiddleware({ app, path: '/graphql', cors: false }); 

  app.use(routes);
  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
  }
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`); 
    });
  });
};

// start Apollo server
startApolloServer();