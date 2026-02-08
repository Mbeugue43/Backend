const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema(
  {
    dossierMedicalId: {
      type: String,
      required: true
    },

    patientId: {
      type: String,
      required: true
    },

    medecinId: {
      type: String,
      required: true
    },

    dateConsultation: {
      type: Date,
      default: Date.now
    },

    motif: {
      type: String,
      required: true
    },

    symptomes: [String],

    diagnostic: String,

    recommandations: String,

    examensDemandes: [String],

    ordonnanceId: String,   // plus d’ObjectId ici

    constantes: {
      temperature: Number,
      tension: String,
      poids: Number
    },

    statut: {
      type: String,
      enum: ['EN_COURS', 'TERMINEE', 'ANNULEE'],
      default: 'EN_COURS'
    },

    diagnosticValide: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Consultation', consultationSchema);
