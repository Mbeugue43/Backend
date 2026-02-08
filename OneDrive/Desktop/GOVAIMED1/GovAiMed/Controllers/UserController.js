const mongoose = require('mongoose');
const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');

// Controller function to create a new user
const createNewUser = async (req, res) => {
    try {
        const { fullName, email, motDePasse, password, role, dateNaissance, date_of_birth, sexe, statut } = req.body;
        
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Un utilisateur avec cet email existe déjà" });
        }

        // Hasher le mot de passe (utiliser motDePasse ou password)
        const passwordToHash = motDePasse || password;
        if (!passwordToHash) {
            return res.status(400).json({ message: "Le mot de passe est requis" });
        }
        
        const hashedPassword = await bcrypt.hash(passwordToHash, 10);

        // Préparer les données utilisateur
        const userData = {
            fullName,
            email,
            password: hashedPassword, // Le modèle attend 'password'
            role: role || 'Patient',
            date_of_birth: dateNaissance || date_of_birth || undefined,
            sexe: sexe || undefined,
            statut: statut || 'ACTIF'
        };

        const newUser = await User.create(userData);
        
        // Ne pas renvoyer le mot de passe dans la réponse
        const userResponse = {
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            role: newUser.role,
            statut: newUser.statut,
            date_of_birth: newUser.date_of_birth,
            sexe: newUser.sexe
        };

        return res.status(201).json({ message: "Utilisateur créé avec succès", newUser: userResponse });
    } catch (error) {
        console.log("error in user creation", error);
        return res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// // Controller function to get all users
 const getAllUsers = async (req, res) => {
    console.log("getting all users", req.user);
    try {
        const users = await User.find();
       return res.status(200).json(users);
    } catch (error) {
       return  res.status(500).json({ message: 'Error fetching users', error });
     }
 };


// //show user by id
 const getUserById = async (req, res) => {
     const {id} = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
 };


//  update user

 const updateUser = async (req, res) => {
 try {
         const {id} = req.params;
     const { fullName, email, motDePasse,role,patient, medecin,pharmacien,assistant,admin}=  req.body
      const updatedUser = await User.findByIdAndUpdate(id, {
        fullName,
        email,
        motDePasse,
        role,
        patient,
        medecin,
        pharmacien,
        assistant,
        admin
    }, {new: true});

  return res.status(200).json({ message: "Successfully User updated",updatedUser});
 } catch (error) {
     return res.status(500).json({ message: 'Error updating user', error: error.message });
 }
 };


 //delete user
 const deleteUser = async (req, res) => {
 try {
     const {id} = req.params;
     await User.findByIdAndDelete(id);
     return res.status(200).json({ message: "Successfully User deleted"});
 } catch (error) {
     return res.status(500).json({ message: 'Error deleting user', error: error.message });
 }
 };

// Get all patients (accessible par médecins et admins)
const getAllPatients = async (req, res) => {
  try {
    // Vérifier que c'est un médecin ou un admin
    if (req.user.role !== 'Medecin' && req.user.role !== 'Admin') {
      return res.status(403).json({ message: "Accès refusé. Cette route est réservée aux médecins et administrateurs." });
    }

    const patients = await User.find({ role: 'Patient' })
      .select('-password'); // Ne pas renvoyer les mots de passe
    
    return res.status(200).json(patients);
  } catch (error) {
    return res.status(500).json({ 
      message: 'Error fetching patients', 
      error: error.message 
    });
  }
};

 module.exports = {
     createNewUser,
     getAllUsers,
     getUserById,
     updateUser,
     deleteUser,
     getAllPatients
 };  
