const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    //  Nom du service médical
    nom: {
      type: String,
      required: true,

    },

    // Description du service
    description: {
      type: String,
  
    },

    // Type de service
    type: {
      type: String,
      enum: [
        'MEDECINE_GENERALE',
        'PEDIATRIE',
        'GYNECOLOGIE',
        'DENTISTERIE',
        'OPHTALMOLOGIE',
        'CARDIOLOGIE',
        'AUTRE'
      ],
      default: 'AUTRE'
    },

    //  Médecins rattachés au service
    medecins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],

    //  Assistants rattachés
    assistants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],

    // Durée moyenne consultation (minutes)
    dureeMoyenneConsultation: {
      type: Number,
      default: 15
    },

    // Statut du service
    statut: {
      type: String,
      enum: ['ACTIF', 'INACTIF'],
      default: 'ACTIF'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Service', serviceSchema);
