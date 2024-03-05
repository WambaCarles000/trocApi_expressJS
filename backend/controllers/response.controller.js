const express = require("express");
const router = express.Router();
const {Response,User,Category} = require('../models/models');
const jwt = require('jsonwebtoken');

// Create a response
module.exports.create_Response = async (req, res) => {

// Récupérez l'ID de l'utilisateur à partir du token
const storedToken = req.headers.authorization;
const decodedToken = jwt.decode(storedToken);
const userId = decodedToken.id;

    try {
        const { intitule, description, propositionId, categoryId } = req.body;

        const newResponse = await Response.create({
            intitule,
            description,
            user: userId,
            proposition: propositionId,
            category: categoryId,
        });

        res.status(201).json({ message: 'Response created successfully', data: newResponse });
    } catch (error) {
        console.error('Error creating response:', error);
        res.status(500).json({ message: 'Failed to create response' });
    }
};

// Read all responses
module.exports.getAllResponses = async (req, res) => {
    try {
        const responses = await Response.find().populate('user proposition category');
        res.status(200).json({ data: responses });
    } catch (error) {
        console.error('Error fetching responses:', error);
        res.status(500).json({ message: 'Failed to fetch responses' });
    }
};

// Read a specific response by ID
module.exports.getResponse = async (req, res) => {
    try {
        const response = await Response.findById(req.params.responseId).populate('user proposition category');
        if (!response) {
            return res.status(404).json({ message: 'Response not found' });
        }
        res.status(200).json({ data: response });
    } catch (error) {
        console.error('Error fetching response by ID:', error);
        res.status(500).json({ message: 'Failed to fetch response by ID' });
    }
};



// Delete a response by ID
module.exports.deleteResponse = async (req, res) => {
    try {
        const deletedResponse = await Response.findByIdAndDelete(req.params.responseId);

        if (!deletedResponse) {
            return res.status(404).json({ message: 'Response not found' });
        }

        res.status(200).json({ message: 'Response deleted successfully', data: deletedResponse });
    } catch (error) {
        console.error('Error deleting response:', error);
        res.status(500).json({ message: 'Failed to delete response' });
    }
};





// Update a response by ID
module.exports.editResponse = async (req, res) => {
    try {
        const updatedResponse = await Response.findByIdAndUpdate(
            req.params.responseId,
            req.body,
            { new: true, runValidators: true }
        ).populate('user proposition category');

        res.status(200).json({ message: 'Response updated successfully', data: updatedResponse });
    } catch (error) {
        console.error('Error updating response:', error);
        res.status(500).json({ message: 'Failed to update response' });
    }
};



