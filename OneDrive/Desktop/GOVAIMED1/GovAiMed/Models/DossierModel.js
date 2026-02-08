const mongoose = require('mongoose');

/* ============================
   Sous-schemas du dossier médical
============================ */

// Antécédents
const antecedentSchema = new mongoose.Schema({ 
  antecedent: String
}, { _id: false });

// Allergies
const allergieSchema = new mongoose.Schema({
  allergie: String
}, { _id: false });

// Contact d'urgence    
const contactUrgenceSchema = new mongoose.Schema({
  nom: String,
  telephone: String,
  lien: String
}, { _id: false });

/* ============================
   Schéma principal DossierMedical
============================ */

const dossierSchema = new mongoose.Schema(
  {
    // Référence vers le patient (version SIMPLE)
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    medecinId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    // Résumé global
    resumeMedical: String,

    // Groupe sanguin
    groupeSanguin: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },

    // Antécédents médicaux
    antecedents: {
      type: [antecedentSchema],
      default: []
    },

    // Allergies connues
    allergies: {
      type: [allergieSchema],
      default: []
    },

    // Contact d'urgence
    contactUrgence: contactUrgenceSchema,

    // Statut du dossier
    statut: {
      type: String,
      enum: ['ACTIF', 'ARCHIVE'],
      default: 'ACTIF'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('DossierMedical', dossierSchema);
