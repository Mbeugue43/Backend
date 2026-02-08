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
  authorizeAdminOrSuperAdmin
} = require('../Middlewares/RoleAuthorization');

// ==================== AUTH ROUTES ====================
router.post("/auth/register", authController.registerUser);  
router.post("/auth/login", authController.loginUser);      

// ==================== JOURNAL ====================
router.post('/journal', authorize, authorizeAdminOrSuperAdmin, JournalController.createNewJournalEntry);
router.get('/journal', authorize, authorizeAdminOrSuperAdmin, JournalController.getAllJournalEntries);
router.get('/journal/:id', authorize, authorizeAdminOrSuperAdmin, JournalController.getJournalEntryById);
router.put('/journal/:id', authorize, authorizeAdminOrSuperAdmin, JournalController.updateJournalEntry);
router.delete('/journal/:id', authorize, authorizeAdminOrSuperAdmin, JournalController.deleteJournalEntry);

// ==================== ORDONNANCE ====================
router.post('/ordonnance', authorize, authorizeMedecinOrAdmin, OrdonnanceController.createNewOrdonnance);
router.get('/ordonnances', authorize, authorizeMedecinOrAdmin, OrdonnanceController.getAllOrdonnances);
router.get('/ordonnance/:id', authorize, authorizeMedecinOrAdmin, OrdonnanceController.getOrdonnanceById);
router.put('/ordonnance/:id', authorize, authorizeMedecinOrAdmin, OrdonnanceController.updateOrdonnance);
router.delete('/ordonnance/:id', authorize, authorizeMedecinOrAdmin, OrdonnanceController.deleteOrdonnance);

// ==================== DOSSIER MÉDICAL ====================
router.post('/dossier', authorize, authorizeMedecinOrAdmin, DossierController.createNewDossier);
router.get('/dossiers', authorize, authorizeAdminOrSuperAdmin, DossierController.getAllDossiers);
router.get('/mes-dossiers', authorize, authorizeMedecin, DossierController.getMyDossiers); // Médecins uniquement
router.get('/dossier/:id', authorize, authorizeAdminOrSuperAdmin, DossierController.getDossierById);
router.put('/dossier/:id', authorize, authorizeAdminOrSuperAdmin, DossierController.updateDossier);
router.delete('/dossier/:id', authorize, authorizeAdminOrSuperAdmin, DossierController.deleteDossier);

// ==================== RENDEZ-VOUS ====================
router.post('/rendezvous', authorize, authorizeRoles(['Patient','Assistant','Medecin','Admin','SuperAdmin']), RendezVousController.createNewRendezVous);
router.get('/rendezvous', authorize, authorizeRoles(['Patient','Assistant','Medecin','Admin','SuperAdmin','MediateurNumerique']), RendezVousController.getAllRendezVous);
router.get('/rendezvous/:id', authorize, authorizeRoles(['Patient','Assistant','Medecin','Admin','SuperAdmin']), RendezVousController.getRendezVousById);
router.put('/rendezvous/:id', authorize, authorizeRoles(['Assistant','Medecin','Admin','SuperAdmin']), RendezVousController.updateRendezVous);
router.delete('/rendezvous/:id', authorize, authorizeRoles(['Assistant','Medecin','Admin','SuperAdmin']), RendezVousController.deleteRendezVous);

// ==================== CONSULTATION ====================
router.post('/consultation', authorize, authorizeMedecinOrAdmin, ConsultationController.createNewConsultation);
router.get('/consultations', authorize, authorizeMedecinOrAdmin, ConsultationController.getAllConsultations);
router.get('/consultation/:id', authorize, authorizeMedecinOrAdmin, ConsultationController.getConsultationById);
router.put('/consultation/:id', authorize, authorizeMedecinOrAdmin, ConsultationController.updateConsultation);
router.delete('/consultation/:id', authorize, authorizeMedecinOrAdmin, ConsultationController.deleteConsultation);

// ==================== USERS ====================
router.post('/user', authorize, authorizeAdminOrSuperAdmin, UserController.createNewUser);
router.get('/users', authorize, authorizeAdminOrSuperAdmin, UserController.getAllUsers);
router.get('/patients', authorize, authorizeMedecinOrAdmin, UserController.getAllPatients);
router.get('/user/:id', authorize, authorizeAdminOrSuperAdmin, UserController.getUserById);
router.put('/user/:id', authorize, authorizeAdminOrSuperAdmin, UserController.updateUser);
router.delete('/user/:id', authorize, authorizeAdminOrSuperAdmin, UserController.deleteUser);

// ==================== SERVICE ====================
router.post('/service', authorize, authorizeAdminOrSuperAdmin, ServiceController.createNewService);
router.get('/services', authorize, authorizeRoles(['Medecin','Assistant','Admin','SuperAdmin','MediateurNumerique']), ServiceController.getAllServices);
router.get('/service/:id', authorize, authorizeRoles(['Medecin','Assistant','Admin','SuperAdmin']), ServiceController.getServiceById);
router.put('/service/:id', authorize, authorizeAdminOrSuperAdmin, ServiceController.updateService);
router.delete('/service/:id', authorize, authorizeAdminOrSuperAdmin, ServiceController.deleteService);


module.exports = router;