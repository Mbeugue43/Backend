import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Header from "../components/Header";
import "../styles/PiecePerdu.css"; // Assure-toi que ce fichier CSS existe

// 🔹 Mutation text GraphQL pour insérer une carte d'identité perdue
const INSERT_CARTE_IDENTITE_PERDUE = gql`
  mutation InsertCarteIdentitePerdue(
    $nom: String!,
    $prenom: String!,
    $date_naissance: date!,
    $lieu_naissance: String!,
    $lieu_vote: String,
    $adresse: String
  ) {
    insert_carte_identite_perdue_one(object: {
      nom: $nom,
      prenom: $prenom,
      date_naissance: $date_naissance,
      lieu_naissance: $lieu_naissance,
      lieu_vote: $lieu_vote,
      adresse: $adresse
    }) {
      id
      nom
      prenom
    }
  }
`;

// 🔹 Mutation GraphQL pour insérer une carte étudiant perdue
const INSERT_CARTE_ETUDIANT_PERDUE = gql`
  mutation InsertCarteEtudiantPerdue(
    $ine: String!,
    $ecole_rattachement: String!,
    $prenom: String!,
    $nom: String!,
    $date_naissance: date!,
    $lieu_naissance: String!,
    $filiere: String
  ) {
    insert_carte_etudiant_perdue_one(object: {
      ine: $ine,
      ecole_rattachement: $ecole_rattachement,
      prenom: $prenom,
      nom: $nom,
      date_naissance: $date_naissance,
      lieu_naissance: $lieu_naissance,
      filiere: $filiere
    }) {
      id
      nom
      prenom
    }
  }
`;

const PiecePerdu = () => {
  const [selectedType, setSelectedType] = useState(""); // Type de carte sélectionné
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    lieu_naissance: "",
    lieu_vote: "",
    adresse: "",
    ine: "",
    ecole_rattachement: "",
    filiere: ""
  });

  const [insertCarteIdentite, { loading: loadingIdentite, error: errorIdentite, data: dataIdentite }] = 
    useMutation(INSERT_CARTE_IDENTITE_PERDUE);

  const [insertCarteEtudiant, { loading: loadingEtudiant, error: errorEtudiant, data: dataEtudiant }] = 
    useMutation(INSERT_CARTE_ETUDIANT_PERDUE);

  // 🔹 Gestion des champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = { ...formData, date_naissance: new Date(formData.date_naissance).toISOString().split("T")[0] };

    try {
      if (selectedType === "carte_identite") {
        await insertCarteIdentite({ variables: formattedData });
      } else if (selectedType === "carte_etudiant") {
        await insertCarteEtudiant({ variables: formattedData });
      }

      alert("Déclaration enregistrée avec succès !");
      setFormData({
        nom: "",
        prenom: "",
        date_naissance: "",
        lieu_naissance: "",
        lieu_vote: "",
        adresse: "",
        ine: "",
        ecole_rattachement: "",
        filiere: ""
      });
    } catch (err) {
      console.error("Erreur lors de l'insertion :", err);
    }
  };

  return (
    <div className="piece-perdu-container">
      {/* <Header /> */}
      <h2 className="title">Déclarer une pièce perdue</h2>

      {/* 🔹 Menu déroulant pour choisir le type de carte */}
      <div className="form-group">
        <label>Type de carte :</label>
        <select onChange={(e) => setSelectedType(e.target.value)} value={selectedType} required>
          <option value="">-- Sélectionner --</option>
          <option value="carte_identite">Carte d'Identité</option>
          <option value="carte_etudiant">Carte Étudiant</option>
        </select>
      </div>

      {/* 🔹 Formulaire carte d'identité */}
      {selectedType === "carte_identite" && (
        <form className="form" onSubmit={handleSubmit}>
          <label>Nom :</label>
          <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />

          <label>Prénom :</label>
          <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />

          <label>Date de naissance :</label>
          <input type="date" name="date_naissance" value={formData.date_naissance} onChange={handleChange} required />

          <label>Lieu de naissance :</label>
          <input type="text" name="lieu_naissance" value={formData.lieu_naissance} onChange={handleChange} required />

          <label>Lieu de vote :</label>
          <input type="text" name="lieu_vote" value={formData.lieu_vote} onChange={handleChange} />

          <label>Adresse :</label>
          <textarea name="adresse" value={formData.adresse} onChange={handleChange}></textarea>

          <button type="submit" disabled={loadingIdentite}>
            {loadingIdentite ? "Enregistrement..." : "Soumettre"}
          </button>
        </form>
      )}

      {/* 🔹 Formulaire carte étudiant */}
      {selectedType === "carte_etudiant" && (
        <form className="form" onSubmit={handleSubmit}>
          <label>INE :</label>
          <input type="text" name="ine" value={formData.ine} onChange={handleChange} required />

          <label>École de rattachement :</label>
          <input type="text" name="ecole_rattachement" value={formData.ecole_rattachement} onChange={handleChange} required />

          <label>Nom :</label>
          <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />

          <label>Prénom :</label>
          <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />

          <label>Date de naissance :</label>
          <input type="date" name="date_naissance" value={formData.date_naissance} onChange={handleChange} required />

          <label>Lieu de naissance :</label>
          <input type="text" name="lieu_naissance" value={formData.lieu_naissance} onChange={handleChange} required />

          <label>Filière :</label>
          <input type="text" name="filiere" value={formData.filiere} onChange={handleChange} />

          <button type="submit" disabled={loadingEtudiant}>
            {loadingEtudiant ? "Enregistrement..." : "Soumettre"}
          </button>
        </form>
      )}

      {/* 🔹 Messages d'erreur */}
      {errorIdentite && <p className="error-message">Erreur: {errorIdentite.message}</p>}
      {errorEtudiant && <p className="error-message">Erreur: {errorEtudiant.message}</p>}
    </div>
  );
};

export default PiecePerdu;
