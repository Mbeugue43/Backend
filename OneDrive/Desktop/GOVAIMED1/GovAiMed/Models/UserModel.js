const mongoose = require('mongoose');

// la creation et la structure des sous-schemas pour les different profils des utilisateurs

//admin profile 
const adminSchema = new mongoose.Schema({
    adminCode : {
        type : String,
        required : true,
        unique : true,
    },
    permissions:{
        type :[String],
        default:[]
    }
});

//moderatorSchema
const moderatorSchema= new mongoose.Schema({
    moderatedSections : {
        type :{String},
        default :[]
    }

})


//patient profile
const patientSchema = new mongoose.Schema({
    patientProfile: {
        dateNaissance: {
            type: Date
        },
        sexe: {
            type: String,
            enum: ['M', 'F']
        },
        contact: {
            type: String
        }
    },
});

//medecin profile
const medecinSchema = new mongoose.Schema({

    medecinProfile: {
        specialite: {
            type: String
        },
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service'
        }
    },
});

//pharmacien profile
const pharmacienSchema = new mongoose.Schema({
     // pharmacie
    pharmacienProfile: {
        nomPharmacie: {
            type: String
        },
        adressePharmacie: {
            type: String
        }
    },
});

//assistant profile
const assistantSchema = new mongoose.Schema({
    assistantProfile: {
        poste: {
            type: String,        },
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service'
        }
    }
});





//schema principal utilisateur
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        max: 50,
        min: 3
    },
    date_of_birth: {
        type: Date,
    // rendu optionnel pour permettre une inscription simple depuis le frontend
    required: false
    },
    sexe: {
        type: String,
        enum: ['M', 'F'],
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: [
            'Patient', 
            'Medecin', 
            'Pharmacien', 
            'Assistant', 
            'AideSoignant',
            'Stagiaire',
            'MediateurNumerique',
            'Admin', 
            'SuperAdmin',
            'Moderateur'
        ],
        default : 'Patient'
    },

    statut: {
        type: String,
        enum: ['ACTIF', 'INACTIF'],
        default: 'ACTIF'
    },
    ref: {
        type: String
    },
    adminDetails:{
        type : adminSchema,
        required : function(){return this.role === 'Admin';}
    },
    moderatorDetails : {
        type : moderatorSchema,
        // required : function(){return this.role === 'Moderateur';}
    }



},
{ timestamps: true });
   


module.exports = mongoose.model('User', userSchema);