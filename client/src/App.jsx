import React from 'react';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Container } from 'react-bootstrap';

import Header from "./components/Header/Header.jsx";

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

import './style.css';
// uncomment these once components are created
// import Footer from './components/Footer/Footer';


function App() {
  
  return (
    <ApolloProvider client={client}>
      <Container fluid>
        <Header/>
        <Outlet />
        {/* <Footer /> */}
      </Container>
    </ApolloProvider>
  );
}

export default App
