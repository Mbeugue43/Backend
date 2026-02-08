const mongoose = require('mongoose');

const Journal = require('../Models/JournalModel');

//create a new journal entry
const createNewJournalEntry = async (req, res) => {
    try {
        const journalData = req.body;
        const newJournalEntry = await Journal.create(journalData);
        return res.status(201).json(newJournalEntry);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating journal entry', error: error.message });
    }
};

//get all journal entries
const getAllJournalEntries = async (req, res) => {
    try {
        const journalEntries = await Journal.find().populate('userId', 'fullName email');
        return res.status(200).json(journalEntries);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching journal entries', error: error.message });
    }
};
//get journal entry by id
const getJournalEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        const journalEntry = await Journal.findById(id).populate('userId', 'fullName email');
        return res.status(200).json(journalEntry);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching journal entry', error: error.message });
    }   
};

//update journal entry  
const updateJournalEntry = async (req, res) => {
    try {
        const { id } = req.params;  
        const journalData = req.body;
        const updatedJournalEntry = await Journal.findByIdAndUpdate(id, journalData, { new: true });
        return res.status(200).json({ message: 'Journal entry updated successfully', updatedJournalEntry });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating journal entry', error: error.message });
    }
};

//delete journal entry
const deleteJournalEntry = async (req, res) => {
    try {
        const { id } = req.params;
        await Journal.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Journal entry deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting journal entry', error: error.message });
    }
};
module.exports = {
    createNewJournalEntry,
    getAllJournalEntries,
    getJournalEntryById,
    updateJournalEntry,
    deleteJournalEntry
};
