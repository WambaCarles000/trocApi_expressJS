// imageRoutes.js
const express = require('express');
const router = express.Router();
const Image = require('../models/models');
const jwt = require('jsonwebtoken');

// Create an image
module.exports.createImage = async (req, res) => {
    try {
        const { url, propositionId, responseId } = req.body;

        const newImage = await Image.create({
            url,
            proposition: propositionId,
            response: responseId,
        });

        res.status(201).json({ message: 'Image created successfully', data: newImage });
    } catch (error) {
        console.error('Error creating image:', error);
        res.status(500).json({ message: 'Failed to create image' });
    }
};

// Read all images
module.exports.getAllImages = async (req, res) => {
    try {
        const images = await Image.find().populate('proposition response');
        res.status(200).json({ data: images });
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Failed to fetch images' });
    }
};

// Read a specific image by ID
module.exports.getImage =  async (req, res) => {
    try {
        const image = await Image.findById(req.params.imageId).populate('proposition response');
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.status(200).json({ data: image });
    } catch (error) {
        console.error('Error fetching image by ID:', error);
        res.status(500).json({ message: 'Failed to fetch image by ID' });
    }
};

// Update an image by ID
module.exports.editImage = async (req, res) => {
    try {
        const updatedImage = await Image.findByIdAndUpdate(
            req.params.imageId,
            req.body,
            { new: true, runValidators: true }
        ).populate('proposition response');

        res.status(200).json({ message: 'Image updated successfully', data: updatedImage });
    } catch (error) {
        console.error('Error updating image:', error);
        res.status(500).json({ message: 'Failed to update image' });
    }
};

// Delete an image by ID
module.exports.deleteImage = async (req, res) => {
    try {
        const deletedImage = await Image.findByIdAndDelete(req.params.imageId);

        if (!deletedImage) {
            return res.status(404).json({ message: 'Image not found' });
        }

        res.status(200).json({ message: 'Image deleted successfully', data: deletedImage });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ message: 'Failed to delete image' });
    }
};


