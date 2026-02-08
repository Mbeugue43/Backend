const mongoose = require('mongoose');

const rendezVousSchema = new mongoose.Schema(
  {
    // Identifiants simples (version débutant)
    patientId: {
      type: String,
      required: true
    },

    medecinId: {
      type: String,
      required: true
    },

    serviceId: {
      type: String
    },

    // Date et heure du rendez-vous
    dateRendezVous: {
      type: Date,
      required: true
    },

    // Rang dans la file d’attente
    rang: {
      type: Number,
      required: true
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
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('RendezVous', rendezVousSchema);
