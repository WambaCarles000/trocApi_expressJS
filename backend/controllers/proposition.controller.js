const mongoose = require("mongoose");
const { Proposition } = require('../models/models');

const jwt = require('jsonwebtoken');

// Création d'une proposition
module.exports.createProposition = async (req,res) => {

// Récupérez l'ID de l'utilisateur à partir du token
const storedToken = req.headers.authorization;
const decodedToken = jwt.decode(storedToken);
const userId = decodedToken.id;
// if (!userId) {
    // return res.status(400).json({ error: req.body. });
// }

    try {
        const newProposition = await Proposition.create({

            intitule: req.body.intitule,
            description: req.body.description,
            contrePartie: req.body.contrePartie,
            user: userId, // Remplacez par l'ID réel de l'utilisateur
            category: req.body.categoryId, // Remplacez par l'ID réel de la catégorie
        
        });
        

        const savedProposition = await newProposition.save();
        console.log("Proposition créée avec succès:", savedProposition);
    } catch (error) {
        console.error("Erreur lors de la création de la proposition:", error);
    }
};

// Lecture de toutes les propositions
module.exports.getAllPropositions = async () => {
    try {
        const propositions = await Proposition.find().populate('user category');
        console.log("Liste de propositions:", propositions);
    } catch (error) {
        console.error("Erreur lors de la lecture des propositions:", error);
    }
};

// Lecture d'une proposition par ID
module.exports.getProposition = async (propositionId) => {
    try {
        const proposition = await Proposition.findById(propositionId).populate('user category');
        console.log("Proposition par ID:", proposition);
    } catch (error) {
        console.error("Erreur lors de la lecture de la proposition par ID:", error);
    }
};

// Mise à jour d'une proposition par ID
module.exports.editProposition = async (propositionId, updateData) => {
    try {
        const updatedProposition = await Proposition.findByIdAndUpdate(
            propositionId,
            updateData,
            { new: true, runValidators: true }
        ).populate('user category');

        console.log("Proposition mise à jour avec succès:", updatedProposition);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la proposition:", error);
    }
};

// Suppression d'une proposition par ID
module.exports.deleteProposition = async (propositionId) => {
    try {
        const deletedProposition = await Proposition.findByIdAndDelete(propositionId);
        console.log("Proposition supprimée avec succès:", deletedProposition);
    } catch (error) {
        console.error("Erreur lors de la suppression de la proposition:", error);
    }
};
