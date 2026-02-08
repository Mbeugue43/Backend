const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema(
  {
    // 👤 Utilisateur à l’origine de l’action
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    // 🎭 Rôle de l’utilisateur au moment de l’action
    role: {
      type: String,
      enum: ['Patient', 'Medecin', 'Pharmacien', 'Assistant', 'Admin'],
      required: true
    },

    // 📝 Action effectuée
    action: {
      type: String,

    },

    // 📌 Type de ressource concernée
    resourceType: {
      type: String,
      enum: [
        'DOSSIER_MEDICAL',
        'CONSULTATION',
        'ORDONNANCE',
        'RENDEZ_VOUS',
        'UTILISATEUR'
      ],
      required: true
    },

    // 🔗 ID de la ressource concernée
    resourceId: {
      type: mongoose.Schema.Types.ObjectId
    },

    // 🌐 Adresse IP (optionnel V1)
    ipAddress: {
      type: String
    },

    // 🧭 Détails supplémentaires
    details: {
      type: Object
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Journal', journalSchema);
