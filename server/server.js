const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const routes = require('./routes');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// start Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  cors: {
    origin: '*', // Allow all origins
    credentials: true // Credentials are allowed
  }
});

server.start().then(() => {
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  server.applyMiddleware({ app, path: '/graphql' }); // Apply Apollo middleware to the '/graphql' path
  app.use(routes);
  
  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    
    // add a wildcard route to serve up the client's index.html file
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
});