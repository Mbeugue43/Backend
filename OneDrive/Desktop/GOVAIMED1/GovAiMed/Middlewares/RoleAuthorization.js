const { authorize } = require('./Authorization');

/**
 * Middleware pour autoriser plusieurs rôles
 * @param {Array} allowedRoles - Tableau des rôles autorisés
 */
const authorizeRoles = (allowedRoles = []) => {
  return (req, res, next) => {
    // D'abord vérifier l'authentification
    authorize(req, res, () => {
      // Ensuite vérifier le rôle
      if (!req.user) {
        return res.status(401).json({ message: "Non authentifié" });
      }

      if (allowedRoles.length === 0 || allowedRoles.includes(req.user.role)) {
        return next();
      }

      return res.status(403).json({ 
        message: `Accès refusé. Rôles autorisés: ${allowedRoles.join(', ')}` 
      });
    });
  };
};

/**
 * Middleware pour autoriser uniquement les médecins
 */
const authorizeMedecin = (req, res, next) => {
  authorize(req, res, () => {
    if (!req.user) {
      return res.status(401).json({ message: "Non authentifié" });
    }
    if (req.user.role !== 'Medecin') {
      return res.status(403).json({ message: "Accès réservé aux médecins" });
    }
    next();
  });
};

/**
 * Middleware pour autoriser les médecins et les admins
 */
const authorizeMedecinOrAdmin = (req, res, next) => {
  authorize(req, res, () => {
    if (!req.user) {
      return res.status(401).json({ message: "Non authentifié" });
    }
    if (!['Medecin', 'Admin', 'SuperAdmin'].includes(req.user.role)) {
      return res.status(403).json({ message: "Accès réservé aux médecins et administrateurs" });
    }
    next();
  });
};

/**
 * Middleware pour autoriser les assistants et les admins
 */
const authorizeAssistantOrAdmin = (req, res, next) => {
  authorize(req, res, () => {
    if (!req.user) {
      return res.status(401).json({ message: "Non authentifié" });
    }
    if (!['Assistant', 'Admin', 'SuperAdmin'].includes(req.user.role)) {
      return res.status(403).json({ message: "Accès réservé aux assistants et administrateurs" });
    }
    next();
  });
};

/**
 * Middleware pour autoriser uniquement les patients
 */
const authorizePatient = (req, res, next) => {
  authorize(req, res, () => {
    if (!req.user) {
      return res.status(401).json({ message: "Non authentifié" });
    }
    if (req.user.role !== 'Patient') {
      return res.status(403).json({ message: "Accès réservé aux patients" });
    }
    next();
  });
};

/**
 * Middleware pour autoriser uniquement les super administrateurs
 */
const authorizeSuperAdmin = (req, res, next) => {
  authorize(req, res, () => {
    if (!req.user) {
      return res.status(401).json({ message: "Non authentifié" });
    }
    if (req.user.role !== 'SuperAdmin') {
      return res.status(403).json({ message: "Accès réservé aux super administrateurs" });
    }
    next();
  });
};

/**
 * Middleware pour autoriser les admins et super admins
 */
const authorizeAdminOrSuperAdmin = (req, res, next) => {
  authorize(req, res, () => {
    if (!req.user) {
      return res.status(401).json({ message: "Non authentifié" });
    }
    if (!['Admin', 'SuperAdmin'].includes(req.user.role)) {
      return res.status(403).json({ message: "Accès réservé aux administrateurs" });
    }
    next();
  });
};

/**
 * Middleware pour autoriser le personnel médical (médecins, aides-soignants, stagiaires)
 */
const authorizePersonnelMedical = (req, res, next) => {
  authorize(req, res, () => {
    if (!req.user) {
      return res.status(401).json({ message: "Non authentifié" });
    }
    const personnelRoles = ['Medecin', 'AideSoignant', 'Stagiaire', 'Admin', 'SuperAdmin'];
    if (!personnelRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès réservé au personnel médical" });
    }
    next();
  });
};

/**
 * Middleware pour autoriser le personnel administratif (assistants, médiateurs, admins)
 */
const authorizePersonnelAdmin = (req, res, next) => {
  authorize(req, res, () => {
    if (!req.user) {
      return res.status(401).json({ message: "Non authentifié" });
    }
    const adminRoles = ['Assistant', 'MediateurNumerique', 'Admin', 'SuperAdmin'];
    if (!adminRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès réservé au personnel administratif" });
    }
    next();
  });
};

module.exports = {
  authorizeRoles,
  authorizeMedecin,
  authorizeMedecinOrAdmin,
  authorizeAssistantOrAdmin,
  authorizePatient,
  authorizeSuperAdmin,
  authorizeAdminOrSuperAdmin,
  authorizePersonnelMedical,
  authorizePersonnelAdmin
};
