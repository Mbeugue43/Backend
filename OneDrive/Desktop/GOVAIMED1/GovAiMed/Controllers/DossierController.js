const mongoose = require('mongoose');
const Dossier = require('../Models/DossierModel'); // ✅ nom cohérent

// Create new dossier (SECURISÉ)
const createNewDossier = async (req, res) => {
  try {
    // Vérifier que req.user existe
    if (!req.user) {
      return res.status(401).json({ message: "Non authentifié. Veuillez vous connecter." });
    }

    // Seul un médecin ou un admin peut créer un dossier
    if (req.user.role !== 'Medecin' && req.user.role !== 'Admin') {
      return res.status(403).json({ message: "Accès refusé. Seuls les médecins et les administrateurs peuvent créer un dossier." });
    }

    const { patientId, medecinId, resumeMedical, groupeSanguin, antecedents, allergies, contactUrgence, statut } = req.body;

    if (!patientId) {
      return res.status(400).json({ message: "L'ID du patient est requis." });
    }

    // Si c'est un médecin (pas un admin), il devient automatiquement le médecin responsable
    let medecinResponsable = medecinId;
    if (req.user.role === 'Medecin') {
      // Le médecin connecté devient automatiquement le médecin responsable
      medecinResponsable = req.user._id.toString();
    } else if (req.user.role === 'Admin') {
      // L'admin doit spécifier un médecin responsable
      if (!medecinId) {
        return res.status(400).json({ message: "Un médecin responsable doit être spécifié lors de la création par un admin." });
      }
      medecinResponsable = medecinId;
    }

    // Vérifier que patientId et medecinResponsable sont des ObjectIds valides
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ message: "L'ID du patient n'est pas valide." });
    }
    if (!mongoose.Types.ObjectId.isValid(medecinResponsable)) {
      return res.status(400).json({ message: "L'ID du médecin n'est pas valide." });
    }

    // Vérifier si un dossier existe déjà pour ce patient avec ce médecin (tous statuts)
    const existingDossier = await Dossier.findOne({ 
      patientId, 
      medecinId: medecinResponsable
    });

    if (existingDossier) {
      const statutMessage = existingDossier.statut === 'ACTIF' 
        ? "Un dossier médical actif existe déjà pour ce patient avec ce médecin." 
        : "Un dossier médical existe déjà pour ce patient avec ce médecin (statut: " + existingDossier.statut + ").";
      return res.status(400).json({ 
        message: statutMessage + " Veuillez utiliser le dossier existant ou archiver l'ancien dossier avant d'en créer un nouveau." 
      });
    }

    // Vérifier aussi s'il existe un dossier actif pour ce patient (peu importe le médecin)
    const existingActiveDossier = await Dossier.findOne({ 
      patientId, 
      statut: 'ACTIF' 
    });

    if (existingActiveDossier && existingActiveDossier.medecinId.toString() !== medecinResponsable) {
      return res.status(400).json({ 
        message: "Un dossier médical actif existe déjà pour ce patient avec un autre médecin. Veuillez archiver l'ancien dossier avant d'en créer un nouveau." 
      });
    }

    // Préparer les données du dossier (Mongoose convertira automatiquement les strings en ObjectId)
    const dossierData = {
      patientId,
      medecinId: medecinResponsable,
      resumeMedical: resumeMedical || undefined,
      groupeSanguin: groupeSanguin || undefined,
      antecedents: Array.isArray(antecedents) ? antecedents : [],
      allergies: Array.isArray(allergies) ? allergies : [],
      statut: statut || 'ACTIF'
    };

    // Ajouter contactUrgence seulement s'il est fourni et valide
    if (contactUrgence && (contactUrgence.nom || contactUrgence.telephone || contactUrgence.lien)) {
      dossierData.contactUrgence = {
        nom: contactUrgence.nom || undefined,
        telephone: contactUrgence.telephone || undefined,
        lien: contactUrgence.lien || undefined
      };
    }

    const dossier = await Dossier.create(dossierData);

    return res.status(201).json({
      message: "Dossier créé avec succès",
      dossier
    });

  } catch (error) {
    // Gérer spécifiquement l'erreur de clé dupliquée MongoDB
    if (error.code === 11000 || error.name === 'MongoServerError') {
      const duplicateKey = error.keyPattern || error.keyValue;
      let message = "Un dossier existe déjà pour cette combinaison patient/médecin.";
      
      if (duplicateKey && duplicateKey.patientId && duplicateKey.medecinId) {
        message = "Un dossier existe déjà pour ce patient avec ce médecin. Veuillez utiliser le dossier existant ou archiver l'ancien dossier.";
      } else if (duplicateKey && duplicateKey.patientId) {
        message = "Un dossier existe déjà pour ce patient. Veuillez archiver l'ancien dossier avant d'en créer un nouveau.";
      }
      
      return res.status(400).json({
        message: message,
        error: error.message,
        errorName: error.name
      });
    }
    
    return res.status(500).json({
      message: "Erreur lors de la création du dossier",
      error: error.message,
      errorName: error.name,
      validationErrors: error.errors ? Object.keys(error.errors).reduce((acc, key) => {
        acc[key] = error.errors[key].message;
        return acc;
      }, {}) : undefined,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};



// Get all dossiers
const getAllDossiers = async (req, res) => {
  try {
    const dossiers = await Dossier.find();
    return res.status(200).json(dossiers);
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching dossiers',
      error: error.message
    });
  }
};



// Get dossier by id
const getDossierById = async (req, res) => {
  try {
    const { id } = req.params;
    const dossier = await Dossier.findById(id);

    if (!dossier) {
      return res.status(404).json({ message: "Dossier not found" });
    }

    return res.status(200).json(dossier);
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching dossier',
      error: error.message
    });
  }
};



// Update dossier
const updateDossier = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientId, medecinId, consultations, prescriptions, notes } = req.body;

    const updatedDossier = await Dossier.findByIdAndUpdate(
      id,
      { patientId, medecinId, consultations, prescriptions, notes },
      { new: true }
    );

    if (!updatedDossier) {
      return res.status(404).json({ message: "Dossier not found" });
    }

    return res.status(200).json({
      message: 'Dossier updated successfully',
      updatedDossier
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Error updating dossier',
      error: error.message
    });
  }
};



// Delete dossier
const deleteDossier = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Dossier.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Dossier not found" });
    }

    return res.status(200).json({
      message: 'Dossier deleted successfully'
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting dossier',
      error: error.message
    });
  }
};

// Get dossiers du médecin connecté
const getMyDossiers = async (req, res) => {
  try {
    // Vérifier que c'est un médecin
    if (req.user.role !== 'Medecin') {
      return res.status(403).json({ message: "Accès refusé. Cette route est réservée aux médecins." });
    }

    const dossiers = await Dossier.find({ medecinId: req.user._id })
      .populate('patientId', 'fullName email date_of_birth sexe')
      .populate('medecinId', 'fullName email');
    
    return res.status(200).json(dossiers);
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching dossiers',
      error: error.message
    });
  }
};



module.exports = {
  createNewDossier,
  getAllDossiers,
  getDossierById,
  updateDossier,
  deleteDossier,
  getMyDossiers
};
