const mongoose = require('mongoose');
const Consultation = require('../Models/ConsultationModel');



// Create a new consultation
const createNewConsultation = async (req, res) => {
    try {
        const consultationData = req.body;
        const newConsultation = await Consultation.create(consultationData);
        return res.status(201).json(newConsultation);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating consultation', error: error.message });
    }   
};




// Get all consultations
const getAllConsultations = async (req, res) => {
    try {   
        const consultations = await Consultation.find()
            .populate('patientId', 'fullName email')
            .populate('medecinId', 'fullName email');
        return res.status(200).json(consultations);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching consultations', error: error.message });
    }   
};



// Get consultation by ID
const getConsultationById = async (req, res) => {   
    try {
        const { id } = req.params;
        const consultation = await Consultation.findById(id)    
            .populate('patientId', 'fullName email')
            .populate('medecinId', 'fullName email');
        return res.status(200).json(consultation);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching consultation', error: error.message });
    }
};




// Update consultation
const updateConsultation = async (req, res) => {    
    try {   
        const { id } = req.params;
        const consultationData = req.body;
        const updatedConsultation = await Consultation.findByIdAndUpdate(id, consultationData, { new: true });
        return res.status(200).json({ message: 'Consultation updated successfully', updatedConsultation });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating consultation', error: error.message });
    }   

};



// Delete consultation
const deleteConsultation = async (req, res) => {    
    try {
        const { id } = req.params;
        await Consultation.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Consultation deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting consultation', error: error.message });
    }   
};




module.exports = {
    createNewConsultation,
    getAllConsultations,
    getConsultationById,
    updateConsultation,
    deleteConsultation
};