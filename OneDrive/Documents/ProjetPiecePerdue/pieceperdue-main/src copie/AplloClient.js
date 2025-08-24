// src/ApolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://cunning-shepherd-53.hasura.app/v1/graphql',  // Remplace par l'URL de ton Hasura (Cloud ou local)
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret': 'sFUwBbrS9Q3zdKCQHMOLPjIMGVAc3HODg65rCOxmTES0qcUheDITOBeG4OQ4upid', // Remplace avec ta clé secrète d'administration si nécessaire
  },
});

export default client;



