const mongoose = require('mongoose');
const RendezVous = require('../Models/RendezVousModel');

   // Créer un nouveau rendez-vous
   
const createNewRendezVous = async (req, res) => {
  try {
    const { patientId, medecinId, serviceId, dateRendezVous, rang, ticketPaye, commentaire } = req.body;

    // Validation des IDs
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ message: "ID patient invalide." });
    }
    if (!mongoose.Types.ObjectId.isValid(medecinId)) {
      return res.status(400).json({ message: "ID médecin invalide." });
    }
    if (serviceId && !mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({ message: "ID service invalide." });
    }

    const newRendezVous = await RendezVous.create({
      patientId,
      medecinId,
      serviceId,
      dateRendezVous,
      rang,
      ticketPaye,
      commentaire
    });

    return res.status(201).json({
      message: "Rendez-vous créé avec succès",
      rendezVous: newRendezVous
    });

  } catch (error) {
    console.error("Erreur createNewRendezVous:", error);
    return res.status(500).json({
      message: "Erreur création rendez-vous",
      error: error.message
    });
  }
};


   //Récupérer tous les rendez-vous

const getAllRendezVous = async (req, res) => {
  try {
    const rendezvous = await RendezVous.find()
      .populate('patientId', 'fullName email')
      .populate('medecinId', 'fullName email')
      .populate('serviceId', 'nom description');

    return res.status(200).json(rendezvous);

  } catch (error) {
    console.error("Erreur getAllRendezVous:", error);
    return res.status(500).json({
      message: "Erreur récupération rendez-vous",
      error: error.message
    });
  }
};


   // Récupérer un rendez-vous par ID

const getRendezVousById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID rendez-vous invalide." });
    }

    const rendezvous = await RendezVous.findById(id)
      .populate('patientId', 'fullName email')
      .populate('medecinId', 'fullName email')
      .populate('serviceId', 'nom description');

    if (!rendezvous) {
      return res.status(404).json({ message: "Rendez-vous introuvable" });
    }

    return res.status(200).json(rendezvous);

  } catch (error) {
    console.error("Erreur getRendezVousById:", error);
    return res.status(500).json({
      message: "Erreur récupération rendez-vous",
      error: error.message
    });
  }
};


  // Mettre à jour un rendez-vous

const updateRendezVous = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID rendez-vous invalide." });
    }

    const updatedRendezVous = await RendezVous.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updatedRendezVous) {
      return res.status(404).json({ message: "Rendez-vous introuvable" });
    }

    return res.status(200).json({
      message: "Rendez-vous mis à jour avec succès",
      rendezVous: updatedRendezVous
    });

  } catch (error) {
    console.error("Erreur updateRendezVous:", error);
    return res.status(500).json({
      message: "Erreur mise à jour rendez-vous",
      error: error.message
    });
  }
};


  // Supprimer un rendez-vous

const deleteRendezVous = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID rendez-vous invalide." });
    }

    const deleted = await RendezVous.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Rendez-vous introuvable" });
    }

    return res.status(200).json({ message: "Rendez-vous supprimé avec succès" });

  } catch (error) {
    console.error("Erreur deleteRendezVous:", error);
    return res.status(500).json({
      message: "Erreur suppression rendez-vous",
      error: error.message
    });
  }
};

module.exports = {
  createNewRendezVous,
  getAllRendezVous,
  getRendezVousById,
  updateRendezVous,
  deleteRendezVous
};