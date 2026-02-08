const mongoose = require('mongoose');
const Dossier = require('../Models/DossierModel'); // ✅ modèle

// =================== CREATE ===================
const createNewDossier = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Non authentifié" });

    if (req.user.role !== 'Medecin' && req.user.role !== 'Admin') {
      return res.status(403).json({ message: "Seuls les médecins et admins peuvent créer un dossier" });
    }

    const { patientId, medecinId, resumeMedical, groupeSanguin, antecedents, allergies, contactUrgence, statut } = req.body;

    if (!patientId) return res.status(400).json({ message: "L'ID du patient est requis" });

    let medecinResponsable = medecinId;
    if (req.user.role === 'Medecin') medecinResponsable = req.user._id.toString();
    if (req.user.role === 'Admin' && !medecinId) return res.status(400).json({ message: "Un médecin responsable doit être spécifié" });

    if (!mongoose.Types.ObjectId.isValid(patientId) || !mongoose.Types.ObjectId.isValid(medecinResponsable)) {
      return res.status(400).json({ message: "ID patient ou médecin invalide" });
    }

    // Vérifie s'il existe déjà un dossier actif pour ce patient et ce médecin
    const existingDossier = await Dossier.findOne({ patientId, medecinId: medecinResponsable });
    if (existingDossier && existingDossier.statut === 'ACTIF') {
      return res.status(400).json({ message: "Un dossier actif existe déjà pour ce patient avec ce médecin" });
    }

    const dossierData = {
      patientId,
      medecinId: medecinResponsable,
      resumeMedical: resumeMedical || undefined,
      groupeSanguin: groupeSanguin || undefined,
      antecedents: Array.isArray(antecedents) ? antecedents : [],
      allergies: Array.isArray(allergies) ? allergies : [],
      statut: statut || 'ACTIF'
    };

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
    return res.status(500).json({
      message: "Erreur création dossier",
      error: error.message
    });
  }
};

// =================== GET ALL DOSSIERS ===================
const getAllDossiers = async (req, res) => {
  try {
    const dossiers = await Dossier.find()
      .populate('patientId', 'fullName email date_of_birth sexe')
      .populate('medecinId', 'fullName email');
    return res.status(200).json(dossiers);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur fetching dossiers', error: error.message });
  }
};

// =================== GET DOSSIER BY ID ===================
const getDossierById = async (req, res) => {
  try {
    const { id } = req.params;
    const dossier = await Dossier.findById(id)
      .populate('patientId', 'fullName email date_of_birth sexe')
      .populate('medecinId', 'fullName email');

    if (!dossier) return res.status(404).json({ message: "Dossier non trouvé" });

    // ✅ Vérification accès médecin
    if (req.user.role === 'Medecin' && dossier.medecinId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Accès refusé à ce dossier" });
    }

    return res.status(200).json(dossier);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur fetching dossier', error: error.message });
  }
};

// =================== UPDATE DOSSIER ===================
const updateDossier = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDossier = await Dossier.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedDossier) return res.status(404).json({ message: "Dossier non trouvé" });

    return res.status(200).json({ message: 'Dossier mis à jour', updatedDossier });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur update dossier', error: error.message });
  }
};

// =================== DELETE DOSSIER ===================
const deleteDossier = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Dossier.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Dossier non trouvé" });
    return res.status(200).json({ message: 'Dossier supprimé' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur delete dossier', error: error.message });
  }
};

// =================== GET DOSSIERS DU MÉDECIN ===================
const getMyDossiers = async (req, res) => {
  try {
    if (req.user.role !== 'Medecin') {
      return res.status(403).json({ message: "Accès réservé aux médecins" });
    }

    const dossiers = await Dossier.find({ medecinId: req.user._id })
      .populate('patientId', 'fullName email date_of_birth sexe')
      .populate('medecinId', 'fullName email');

    return res.status(200).json(dossiers);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur fetching mes dossiers', error: error.message });
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