// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import App from './App';
import './index.css';

// Remplacez par l'URL de votre endpoint GraphQL Hasura
const client = new ApolloClient({
  uri: 'https://cunning-shepherd-53.hasura.app/v1/graphql', // URL de l'API Hasura
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret': 'sFUwBbrS9Q3zdKCQHMOLPjIMGVAc3HODg65rCOxmTES0qcUheDITOBeG4OQ4upid' // Ajoutez votre clé secrète Hasura
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
