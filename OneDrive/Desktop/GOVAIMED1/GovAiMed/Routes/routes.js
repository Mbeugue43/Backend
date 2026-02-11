const router = require('express').Router();

const UserController = require('../Controllers/UserController');
const ConsultationController = require('../Controllers/ConsultationController');
const ServiceController = require('../Controllers/ServiceController');
const RendezVousController = require('../Controllers/RendezVousController');
const DossierController = require('../Controllers/DossierController');
const OrdonnanceController = require('../Controllers/OrdonnanceController');
const JournalController = require('../Controllers/JournalController');
const authController = require('../Controllers/Auth');

const { authorize } = require('../Middlewares/Authorization');
const {
  authorizeRoles,
  authorizeMedecin,
  authorizeMedecinOrAdmin,
  authorizeAdminOrSuperAdmin,
  authorizePatient
} = require('../Middlewares/RoleAuthorization');


  // AUTH

router.post('/auth/register', authController.registerUser);
router.post('/auth/login', authController.loginUser);


  // JOURNAL 

router.post('/journal', authorize, authorizeAdminOrSuperAdmin, JournalController.createNewJournalEntry);
router.get('/journal', authorize, authorizeAdminOrSuperAdmin, JournalController.getAllJournalEntries);
router.get('/journal/:id', authorize, authorizeAdminOrSuperAdmin, JournalController.getJournalEntryById);
router.put('/journal/:id', authorize, authorizeAdminOrSuperAdmin, JournalController.updateJournalEntry);
router.delete('/journal/:id', authorize, authorizeAdminOrSuperAdmin, JournalController.deleteJournalEntry);


   //ORDONNANCES 

router.post('/ordonnance', authorize, authorizeMedecinOrAdmin, OrdonnanceController.createNewOrdonnance);
router.get('/ordonnances', authorize, authorizeMedecinOrAdmin, OrdonnanceController.getAllOrdonnances);
router.get('/ordonnance/:id', authorize, authorizeMedecinOrAdmin, OrdonnanceController.getOrdonnanceById);
router.put('/ordonnance/:id', authorize, authorizeMedecinOrAdmin, OrdonnanceController.updateOrdonnance);
router.delete('/ordonnance/:id', authorize, authorizeMedecinOrAdmin, OrdonnanceController.deleteOrdonnance);




  // DOSSIERS MÉDICAUX
// Créer un dossier (médecin connecté)
router.post(
  "/dossiers",
  authorize,
  authorizeMedecin,
  DossierController.createDossier
);



// Dossiers du médecin connecté
router.get(
  "/medecin/dossiers",
  authorize,
  authorizeMedecin,
  DossierController.getMyDossiers
);

// Dossiers du patient connecté
router.get(
  "/patient/dossiers",
  authorize,
  authorizePatient,
  DossierController.getMyPatientDossiers
);

// Changer statut
router.put(
  "/medecin/dossiers/:id/statut",
  authorize,
  authorizeMedecin,
  DossierController.toggleDossierStatutByMedecin
);

// Tous les dossiers (Admin)
router.get(
  "/dossiers",
  authorize,
  authorizeAdminOrSuperAdmin,
  DossierController.getAllDossiers
);

// Dossier par ID
router.get(
  "/dossiers/:id",
  authorize,
  DossierController.getDossierById
);


   // RENDEZ-VOUS

router.post(
  '/rendezvous',
  authorize,
  authorizeRoles(['Patient', 'Assistant', 'Medecin', 'Admin', 'SuperAdmin']),
  RendezVousController.createNewRendezVous
);

router.get(
  '/rendezvous',
  authorize,
  authorizeRoles(['Assistant', 'Medecin', 'Admin', 'SuperAdmin', 'MediateurNumerique']),
  RendezVousController.getAllRendezVous
);

router.get(
  '/rendezvous/:id',
  authorize,
  authorizeRoles(['Patient', 'Assistant', 'Medecin', 'Admin', 'SuperAdmin']),
  RendezVousController.getRendezVousById
);

router.put(
  '/rendezvous/:id',
  authorize,
  authorizeRoles(['Assistant', 'Medecin', 'Admin', 'SuperAdmin']),
  RendezVousController.updateRendezVous
);

router.delete(
  '/rendezvous/:id',
  authorize,
  authorizeRoles(['Assistant', 'Medecin', 'Admin', 'SuperAdmin']),
  RendezVousController.deleteRendezVous
);


   // CONSULTATIONS

router.post('/consultation', authorize, authorizeMedecinOrAdmin, ConsultationController.createNewConsultation);
router.get('/consultations', authorize, authorizeMedecinOrAdmin, ConsultationController.getAllConsultations);
router.get('/consultations/:id', authorize, authorizeMedecinOrAdmin, ConsultationController.getConsultationById);
router.put('/consultations/:id', authorize, authorizeMedecinOrAdmin, ConsultationController.updateConsultation);
router.delete('/consultations/:id', authorize, authorizeMedecinOrAdmin, ConsultationController.deleteConsultation);


   // USERS (Admin / SuperAdmin)

router.post('/users', authorize, authorizeAdminOrSuperAdmin, UserController.createNewUser);
router.get('/users', authorize, authorizeAdminOrSuperAdmin, UserController.getAllUsers);
router.get('/patients', authorize, authorizeMedecinOrAdmin, UserController.getAllPatients);
router.get('/users/:id', authorize, authorizeAdminOrSuperAdmin, UserController.getUserById);
router.put('/users/:id', authorize, authorizeAdminOrSuperAdmin, UserController.updateUser);
router.delete('/users/:id', authorize, authorizeAdminOrSuperAdmin, UserController.deleteUser);


  // SERVICES

router.post('/services', authorize, authorizeAdminOrSuperAdmin, ServiceController.createNewService);
router.get(
  '/services',
  authorize,
  authorizeRoles(['Medecin', 'Assistant', 'Admin', 'SuperAdmin', 'MediateurNumerique']),
  ServiceController.getAllServices
);
router.get(
  '/services/:id',
  authorize,
  authorizeRoles(['Medecin', 'Assistant', 'Admin', 'SuperAdmin']),
  ServiceController.getServiceById
);
router.put('/services/:id', authorize, authorizeAdminOrSuperAdmin, ServiceController.updateService);
router.delete('/services/:id', authorize, authorizeAdminOrSuperAdmin, ServiceController.deleteService);

module.exports = router;