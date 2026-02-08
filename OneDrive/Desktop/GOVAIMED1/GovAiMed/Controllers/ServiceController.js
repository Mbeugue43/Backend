const mongoose = require('mongoose');
const Service = require('../Models/ServiceModel');

//create new service

const createNewService = async (req, res) => {
  try {
    const {
      nom,
      description,
      type,
      dureeMoyenneConsultation,
      statut
    } = req.body;

    const newService = new Service({
      nom,
      description,
      type,
      dureeMoyenneConsultation,
      statut
    });

    const savedService = await newService.save();

    return res.status(201).json({
      message: 'Service créé avec succès',
      service: savedService
    });

  } catch (error) {
    console.error('CREATE SERVICE ERROR:', error);

    return res.status(500).json({
      message: 'Erreur lors de la création du service',
      error: error.message
    });
  }
};


//get all services
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
       return res.status(200).json(services);
    } catch (error) {
       return res.status(500).json({ message: 'Error fetching services', error });
    }
};
//get service by id
const getServiceById = async (req, res) => {
    try {   
        const { id } = req.params;
        const service = await Service.findById(id); 
         return res.status(200).json(service);
    } catch (error) {
       return res.status(500).json({ message: 'Error fetching service', error });
    }
};

//update service
const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedService = await Service.findByIdAndUpdate(id, {
            name,
            description
        }, { new: true });
       return res.status(200).json({ message: 'Service updated successfully', updatedService });
    }
    catch (error) {
       return res.status(500).json({ message: 'Error updating service', error });
    }
};  


//delete service
const deleteService = async (req, res) => {
    try {   
        const { id } = req.params;
        await Service.findByIdAndDelete(id);
       return res.status(200).json({ message: 'Service deleted successfully' });
    }
    catch (error) {
       return res.status(500).json({ message: 'Error deleting service', error });
    }
};

module.exports = {
    createNewService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
};