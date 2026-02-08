const mongoose = require('mongoose');


// Sous-schéma pour les médicaments dans une ordonnance
const medicamentSchema = new mongoose.Schema({
    nomMedicament: {
        type: String,
        required: true
    },
    dosage: {   
        type: String,
  
    },
    frequence: {
        type: String,

    },
    duree: {
        type: String,
    }
}, { _id: false });

// Schéma principal pour l'ordonnance
const ordonnanceSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
  
    },
    medecinId: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'User',
       
    },
    dateOrdonnance: {
        type: Date,
        default: Date.now   
    },
    medicaments: {
        type: [medicamentSchema],
        
    },
    instructionsSupplementaires: {
        type: String
    }
});
module.exports = mongoose.model('Ordonnance', ordonnanceSchema);
