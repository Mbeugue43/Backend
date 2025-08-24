// src/App.js
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import './App.css';

// Mutation GraphQL pour insérer un utilisateur
const INSERT_USER = gql`
  mutation InsertUser(
    $nom: String!, 
    $prenom: String!, 
    $date_naissance: String!, 
    $adresse: String, 
    $lieu_naissance: String
  ) {
    insert_users(objects: { 
      nom: $nom, 
      prenom: $prenom, 
      date_naissance: $date_naissance, 
      adresse: $adresse, 
      lieu_naissance: $lieu_naissance 
    }) {
      returning {
        id
        nom
        prenom
        date_naissance
        adresse
        lieu_naissance
      }
    }
  }
`;

// Mutation GraphQL pour mettre à jour un utilisateur
const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: Int!, 
    $nom: String, 
    $prenom: String, 
    $date_naissance: String, 
    $adresse: String, 
    $lieu_naissance: String
  ) {
    update_users(
      where: { id: { _eq: $id } },
      _set: { 
        nom: $nom, 
        prenom: $prenom, 
        date_naissance: $date_naissance, 
        adresse: $adresse, 
        lieu_naissance: $lieu_naissance 
      }
    ) {
      returning {
        id
        nom
        prenom
        date_naissance
        adresse
        lieu_naissance
      }
    }
  }
`;

function App() {
  // État pour les champs du formulaire
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [adresse, setAdresse] = useState('');
  const [lieuNaissance, setLieuNaissance] = useState('');
  const [userId, setUserId] = useState(null); // Pour mettre à jour un utilisateur existant

  // Mutation Apollo pour insérer un utilisateur
  const [insertUser, { loading, error, data }] = useMutation(INSERT_USER);

  // Mutation Apollo pour mettre à jour un utilisateur
  const [updateUser] = useMutation(UPDATE_USER);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Si un ID utilisateur est défini, on met à jour l'utilisateur, sinon on insère un nouvel utilisateur
    if (userId) {
      updateUser({
        variables: {
          id: userId,
          nom,
          prenom,
          date_naissance: dateNaissance,
          adresse,
          lieu_naissance: lieuNaissance,
        },
      });
    } else {
      insertUser({
        variables: {
          nom,
          prenom,
          date_naissance: dateNaissance,
          adresse,
          lieu_naissance: lieuNaissance,
        },
      });
    }

    // Réinitialisation des champs après soumission
    setNom('');
    setPrenom('');
    setDateNaissance('');
    setAdresse('');
    setLieuNaissance('');
    setUserId(null);
  };

  return (
    <div className="App">
      <h1>{userId ? 'Mettre à jour l\'Utilisateur' : 'Ajouter un Utilisateur'}</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nom">Nom:</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="prenom">Prénom:</label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dateNaissance">Date de Naissance:</label>
          <input
            type="date"
            id="dateNaissance"
            value={dateNaissance}
            onChange={(e) => setDateNaissance(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="adresse">Adresse:</label>
          <textarea
            id="adresse"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="lieuNaissance">Lieu de Naissance:</label>
          <input
            type="text"
            id="lieuNaissance"
            value={lieuNaissance}
            onChange={(e) => setLieuNaissance(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Enregistrement...' : userId ? 'Mettre à jour' : 'Ajouter Utilisateur'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Erreur: {error.message}</p>}
      {data && <p style={{ color: 'green' }}>Utilisateur ajouté avec succès !</p>}
    </div>
  );
}

export default App;
