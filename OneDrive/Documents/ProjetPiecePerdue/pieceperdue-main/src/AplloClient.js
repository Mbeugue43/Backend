// src/ApolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://helped-drum-70.hasura.app/v1/graphql',  // Remplace par l'URL de ton Hasura (Cloud ou local)
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret': 'zAZyqKAeU8oqk5HhFfROZJFYr6rtKsEDzysD6zLvqpma4th0ZY1XRLgdVnPy65LW', // Remplace avec ta clé secrète d'administration si nécessaire
  },
});

export default client;



