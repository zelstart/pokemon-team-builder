import React from 'react';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Container } from 'react-bootstrap';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

import './App.css'
import './style.css';
// uncomment these once components are created
// import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';


function App() {
  return (
    <ApolloProvider client={client}>
      <Container fluid>
        {/* <Header /> */}
        <Outlet />
        {/* <Footer /> */}
      </Container>
    </ApolloProvider>
  );
}

export default App
