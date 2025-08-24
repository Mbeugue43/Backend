import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

// 🔹 Déclaration des mutations GraphQL pour insérer les différents types de documents
const INSERT_CARTE_IDENTITE_RAMASSEE = gql`
  mutation InsertCarteIdentiteRamassee(
    $lieu_vote: String!,
    $adresse: String!,
    $nom: String!,
    $prenom: String!,
    $date_naissance: date!,
    $lieu_naissance: String!,
    $commentaire: String
  ) {
    insert_carteidentiteramassee_one(object: { 
      lieu_vote: $lieu_vote, 
      adresse: $adresse, 
      nom: $nom, 
      prenom: $prenom, 
      date_naissance: $date_naissance, 
      lieu_naissance: $lieu_naissance,
      commentaire: $commentaire
    }) {
      id
      nom
      prenom
    }
  }
`;

const INSERT_CARTE_ETUDIANT_RAMASSEE = gql`
  mutation InsertCarteEtudiantRamassee(
    $ine: String!,
    $ecole_rattachement: String!,
    $nom: String!,
    $prenom: String!,
    $filiere: String!,
    $date_naissance: date!,
    $lieu_naissance: String!,
    $commentaire: String
  ) {
    insert_carteetudiantramassee_one(object: { 
      ine: $ine, 
      ecole_rattachement: $ecole_rattachement, 
      nom: $nom, 
      prenom: $prenom, 
      filiere: $filiere, 
      date_naissance: $date_naissance, 
      lieu_naissance: $lieu_naissance,
      commentaire: $commentaire
    }) {
      id
      nom
      prenom
    }
  }
`;

const INSERT_PASSEPORT_RAMASSE = gql`
  mutation InsertPasseportRamasse(
    $nom: String!,
    $prenom: String!,
    $date_naissance: date!,
    $lieu_naissance: String!,
    $nationalite: String!,
    $commentaire: String
  ) {
    insert_passeportramasse_one(object: { 
      nom: $nom,
      prenom: $prenom, 
      date_naissance: $date_naissance, 
      lieu_naissance: $lieu_naissance,
      nationalite: $nationalite,
      commentaire: $commentaire
    }) {
      id
      nom
      prenom
    }
  }
`;

const INSERT_PERMIS_RAMASSE = gql`
  mutation InsertPermisRamasse(
    $nom: String!,
    $prenom: String!,
    $date_naissance: date!,
    $lieu_naissance: String!,
    $categories: String!,
    $adresse: String!,
    $commentaire: String
  ) {
    insert_permisramasse_one(object: { 
      nom: $nom,
      prenom: $prenom, 
      date_naissance: $date_naissance, 
      lieu_naissance: $lieu_naissance,
      categories: $categories,
      adresse: $adresse,
      commentaire: $commentaire
    }) {
      id
      nom
      prenom
    }
  }
`;

const INSERT_CARTE_COMMERCE_RAMASSEE = gql`
  mutation InsertCarteCommerceRamassee(
    $nom: String!,
    $prenom: String!,
    $profession: String!,
    $numero_agrement: String!,
    $commentaire: String
  ) {
    insert_cartecommerceramassee_one(object: { 
      nom: $nom, 
      prenom: $prenom, 
      profession: $profession, 
      numero_agrement: $numero_agrement, 
      commentaire: $commentaire 
    }) {
      id
      nom
      prenom
    }
  }
`;

const INSERT_CARTE_PROFESSIONNELLE_RAMASSEE = gql`
  mutation InsertCarteProfessionnelleRamassee(
    $nom: String!,
    $prenom: String!,
    $matricule: String!,
    $commentaire: String
  ) {
    insert_carteprofessionnelleramassee_one(object: { 
      nom: $nom, 
      prenom: $prenom, 
      matricule: $matricule, 
      commentaire: $commentaire 
    }) {
      id
      nom
      prenom
    }
  }
`;

const INSERT_CARTE_GRISE_RAMASSEE = gql`
  mutation InsertCarteGriseRamassee(
    $nom: String!,
    $prenom: String!,
    $numero_plaque: String!,
    $marque_modele: String!,
    $etat: String!,
    $commentaire: String
  ) {
    insert_cartegrisramassee_one(object: { 
      nom: $nom, 
      prenom: $prenom, 
      numero_plaque: $numero_plaque, 
      marque_modele: $marque_modele, 
      etat: $etat, 
      commentaire: $commentaire 
    }) {
      id
      nom
      prenom
    }
  }
`;

const INSERT_AUTRE_DOCUMENT_RAMASSE = gql`
  mutation InsertAutreDocumentRamasse(
    $nom: String!,
    $prenom: String!,
    $type_document: String!,
    $date_naissance: date!,
    $lieu_naissance: String!,
    $description: String,
    $commentaire: String
  ) {
    insert_autredocumentramasse_one(object: { 
      nom: $nom, 
      prenom: $prenom,
      type_document: $type_document,
      date_naissance: $date_naissance, 
      lieu_naissance: $lieu_naissance,
      description: $description,
      commentaire: $commentaire
    }) {
      id
      nom
      prenom
    }
  }
`;

const PieceRamace = () => {
  const [selectedType, setSelectedType] = useState(""); // Pour stocker le type sélectionné
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    type_document: "",
    date_naissance: "",
    lieu_naissance: "",
    description: "",
    commentaire: "",
    lieu_vote: "",
    adresse: "",
    ine: "",
    ecole_rattachement: "",
    filiere: "",
    nationalite: "",
    categories: "",
    profession: "",
    numero_agrement: "",
    matricule: "",
    numero_plaque: "",
    marque_modele: "",
    etat: "",
  });

  // 🔹 Mutations GraphQL
  const [insertCarteIdentite] = useMutation(INSERT_CARTE_IDENTITE_RAMASSEE);
  const [insertCarteEtudiant] = useMutation(INSERT_CARTE_ETUDIANT_RAMASSEE);
  const [insertPasseport] = useMutation(INSERT_PASSEPORT_RAMASSE);
  const [insertPermis] = useMutation(INSERT_PERMIS_RAMASSE);
  const [insertCarteCommerce] = useMutation(INSERT_CARTE_COMMERCE_RAMASSEE);
  const [insertCarteProfessionnelle] = useMutation(INSERT_CARTE_PROFESSIONNELLE_RAMASSEE);
  const [insertCarteGrise] = useMutation(INSERT_CARTE_GRISE_RAMASSEE);
  const [insertAutreDocumentRamasse] = useMutation(INSERT_AUTRE_DOCUMENT_RAMASSE);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = formData.date_naissance ? new Date(formData.date_naissance).toISOString().split('T')[0] : "";

    try {
      // 👇 En fonction du type sélectionné, on effectue la mutation correspondante
      if (selectedType === "carte_identite") {
        await insertCarteIdentite({ variables: { ...formData, date_naissance: formattedDate } });
      } else if (selectedType === "carte_etudiant") {
        await insertCarteEtudiant({ variables: { ...formData, date_naissance: formattedDate } });
      } else if (selectedType === "passeport") {
        await insertPasseport({ variables: { ...formData, date_naissance: formattedDate } });
      } else if (selectedType === "permis") {
        await insertPermis({ variables: { ...formData, date_naissance: formattedDate } });
      } else if (selectedType === "carte_commerce") {
        await insertCarteCommerce({ variables: { ...formData } });
      } else if (selectedType === "carte_professionnelle") {
        await insertCarteProfessionnelle({ variables: { ...formData } });
      } else if (selectedType === "carte_grise") {
        await insertCarteGrise({ variables: { 
          nom: formData.nom,
          prenom: formData.prenom,
          numero_plaque: formData.numero_plaque,
          marque_modele: formData.marque_modele,
          etat: formData.etat,
          commentaire: formData.commentaire
        }});
      } else if (selectedType === "autre_document_ramasse") {
        await insertAutreDocumentRamasse({
          variables: {
            nom: formData.nom,
            prenom: formData.prenom,
            type_document: formData.type_document,
            date_naissance: formattedDate,
            lieu_naissance: formData.lieu_naissance,
            description: formData.description,
            commentaire: formData.commentaire,
          }
        });
      }

      // Réinitialisation du formulaire après soumission
      setFormData({
        nom: "",
        prenom: "",
        type_document: "",
        date_naissance: "",
        lieu_naissance: "",
        description: "",
        commentaire: "",
        lieu_vote: "",
        adresse: "",
        ine: "",
        ecole_rattachement: "",
        filiere: "",
        nationalite: "",
        categories: "",
        profession: "",
        numero_agrement: "",
        matricule: "",
        numero_plaque: "",
        marque_modele: "",
        etat: "",
      });

    } catch (err) {
      console.error("Erreur lors de l'insertion :", err);
    }
  };

  return (
    <div className="piece-ramace-container">
      <h2 className="title">Déclarer une Carte Ramassée</h2>

      {/* 🔹 Sélecteur pour choisir le type de carte */}
      <div className="form">
        <label>Type de carte :</label>
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} required>
          <option value="">-- Sélectionner --</option>
          <option value="carte_identite">Carte d'Identité</option>
          <option value="carte_etudiant">Carte Étudiant</option>
          <option value="passeport">Passeport</option>
          <option value="permis">Permis</option>
          <option value="carte_commerce">Carte de Commerce</option>
          <option value="carte_professionnelle">Carte Professionnelle</option>
          <option value="carte_grise">Carte Grise</option>
          <option value="autre_document_ramasse">Autre Document Ramassé</option>
        </select>
      </div>

      {/* 🔹 Formulaire pour chaque type de carte */}
      {selectedType && (
        <form className="form" onSubmit={handleSubmit}>
          {/* Nom */}
          <label>Nom:</label>
          <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
          
          {/* Prénom */}
          <label>Prénom:</label>
          <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />
          
          {/* Date de naissance */}
          <label>Date de naissance:</label>
          <input type="date" name="date_naissance" value={formData.date_naissance} onChange={handleChange} required />
          
          {/* Lieu de naissance */}
          <label>Lieu de naissance:</label>
          <input type="text" name="lieu_naissance" value={formData.lieu_naissance} onChange={handleChange} required />
          
          {/* Commentaire */}
          <label>Commentaire:</label>
          <textarea name="commentaire" value={formData.commentaire} onChange={handleChange} />

          {/* Conditions spécifiques en fonction du type de document */}
          {selectedType === "carte_identite" && (
            <>
              <label>Lieu de vote:</label>
              <input type="text" name="lieu_vote" value={formData.lieu_vote} onChange={handleChange} />
              
              <label>Adresse:</label>
              <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} />
            </>
          )}
          
          {selectedType === "carte_etudiant" && (
            <>
              <label>INE:</label>
              <input type="text" name="ine" value={formData.ine} onChange={handleChange} required />
              
              <label>École de rattachement:</label>
              <input type="text" name="ecole_rattachement" value={formData.ecole_rattachement} onChange={handleChange} required />
              
              <label>Filière:</label>
              <input type="text" name="filiere" value={formData.filiere} onChange={handleChange} required />
            </>
          )}

          {/* Pour les autres types de carte */}
          {selectedType === "passeport" && (
            <>
              <label>Nationalité:</label>
              <input type="text" name="nationalite" value={formData.nationalite} onChange={handleChange} required />
            </>
          )}
          
          {selectedType === "permis" && (
            <>
              <label>Catégories:</label>
              <input type="text" name="categories" value={formData.categories} onChange={handleChange} required />
              
              <label>Adresse:</label>
              <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} />
            </>
          )}

          {selectedType === "carte_commerce" && (
            <>
              <label>Profession:</label>
              <input type="text" name="profession" value={formData.profession} onChange={handleChange} required />
              
              <label>Numéro d'agrément:</label>
              <input type="text" name="numero_agrement" value={formData.numero_agrement} onChange={handleChange} />
            </>
          )}
          
          {selectedType === "carte_professionnelle" && (
            <>
              <label>Matricule:</label>
              <input type="text" name="matricule" value={formData.matricule} onChange={handleChange} />
            </>
          )}

          {selectedType === "carte_grise" && (
            <>
              <label>Numéro de plaque:</label>
              <input type="text" name="numero_plaque" value={formData.numero_plaque} onChange={handleChange} />
              
              <label>Marque et modèle:</label>
              <input type="text" name="marque_modele" value={formData.marque_modele} onChange={handleChange} />
              
              <label>État:</label>
              <input type="text" name="etat" value={formData.etat} onChange={handleChange} />
            </>
          )}

          {selectedType === "autre_document_ramasse" && (
            <>
              <label>Type de document:</label>
              <input type="text" name="type_document" value={formData.type_document} onChange={handleChange} />
              
              <label>Description:</label>
              <textarea name="description" value={formData.description} onChange={handleChange} />
            </>
          )}

          {/* Bouton de soumission */}
          <button type="submit">Soumettre</button>
        </form>
      )}
    </div>
  );
};

export default PieceRamace;
