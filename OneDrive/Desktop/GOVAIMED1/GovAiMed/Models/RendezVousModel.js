const mongoose = require('mongoose');

  // Schéma Rendez-Vous


const rendezVousSchema = new mongoose.Schema(
  {
    // Patient concerné
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    // Médecin concerné
    medecinId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    // Service (optionnel)
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    },

    // Date et heure prévues du rendez-vous
    dateRendezVous: {
      type: Date,
      required: true
    },

    // Rang dans la file d’attente
    rang: {
      type: Number,
      required: true,
      min: 1
    },

    // Statut du rendez-vous
    statut: {
      type: String,
      enum: ['EN_ATTENTE', 'EN_COURS', 'TERMINE', 'ANNULE'],
      default: 'EN_ATTENTE'
    },

    // Ticket payé ou non
    ticketPaye: {
      type: Boolean,
      default: false
    },

    // Heure réelle de début
    heureDebut: {
      type: Date
    },

    // Heure réelle de fin
    heureFin: {
      type: Date
    },

    // Commentaire guichet / assistant
    commentaire: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('RendezVous', rendezVousSchema);