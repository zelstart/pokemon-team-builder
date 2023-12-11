const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
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
  context: authMiddleware,
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
  app.use('/graphql', expressMiddleware(server));
  app.use(routes);
  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
  }
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};
// start Apollo server
startApolloServer();