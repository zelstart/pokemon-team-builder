import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useState } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

import './App.css'
import './style.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-center align-center min-100-vh">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App
