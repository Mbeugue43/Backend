const mongoose = require('mongoose');
const Ordonnance = require('../Models/OrdonnanceModel');
//create a new ordonnance
const createNewOrdonnance = async (req, res) => {
    try {
        const ordonnanceData = req.body;
        const newOrdonnance = await Ordonnance.create(ordonnanceData);
        return res.status(201).json(newOrdonnance);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating ordonnance', error: error.message });
    }   
};
//get all ordonnances
const getAllOrdonnances = async (req, res) => {
    try {
        const ordonnances = await Ordonnance.find().populate('patientId', 'fullName email').populate('medecinId', 'fullName email');
        return res.status(200).json(ordonnances);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching ordonnances', error: error.message });
    }
};

//get ordonnance by id
const getOrdonnanceById = async (req, res) => {
    try {
        const { id } = req.params;
        const ordonnance = await Ordonnance.findById(id).populate('patientId', 'fullName email').populate('medecinId', 'fullName email');
        return res.status(200).json(ordonnance);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching ordonnance', error: error.message });
    }   
};

//update ordonnance
const updateOrdonnance = async (req, res) => {
    try {   
        const { id } = req.params;
        const ordonnanceData = req.body;
        const updatedOrdonnance = await Ordonnance.findByIdAndUpdate(id, ordonnanceData, { new: true });
        return res.status(200).json({ message: 'Ordonnance updated successfully', updatedOrdonnance });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating ordonnance', error: error.message });
    }
};

//delete ordonnance
const deleteOrdonnance = async (req, res) => {
    try {
        const { id } = req.params;
        await Ordonnance.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Ordonnance deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting ordonnance', error: error.message });
    }
};      
module.exports = {
    createNewOrdonnance,
    getAllOrdonnances,
    getOrdonnanceById,
    updateOrdonnance,
    deleteOrdonnance
};
    

