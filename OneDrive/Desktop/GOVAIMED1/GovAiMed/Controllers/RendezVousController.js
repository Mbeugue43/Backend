const RendezVous = require('../Models/RendezVousModel');

// Créer un rendez-vous
const createNewRendezVous = async (req, res) => {
  try {
    const { patientId, medecinId, serviceId, dateRendezVous, rang, ticketPaye, commentaire } = req.body;

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
      newRendezVous
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error creating rendezvous",
      error: error.message
    });
  }
};

// Récupérer tous les rendez-vous
const getAllRendezVous = async (req, res) => {
  try {
    const rendezvous = await RendezVous.find();
    return res.status(200).json(rendezvous);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching rendezvous",
      error: error.message
    });
  }
};

// Récupérer un rendez-vous par ID
const getRendezVousById = async (req, res) => {
  try {
    const { id } = req.params;
    const rendezvous = await RendezVous.findById(id);

    if (!rendezvous) {
      return res.status(404).json({ message: "Rendez-vous introuvable" });
    }

    return res.status(200).json(rendezvous);

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching rendezvous",
      error: error.message
    });
  }
};

// Mettre à jour un rendez-vous
const updateRendezVous = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRendezVous = await RendezVous.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedRendezVous) {
      return res.status(404).json({ message: "Rendez-vous introuvable" });
    }

    return res.status(200).json({
      message: "Rendez-vous mis à jour avec succès",
      updatedRendezVous
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error updating rendezvous",
      error: error.message
    });
  }
};

// Supprimer un rendez-vous
const deleteRendezVous = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await RendezVous.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Rendez-vous introuvable" });
    }

    return res.status(200).json({
      message: "Rendez-vous supprimé avec succès"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error deleting rendezvous",
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
