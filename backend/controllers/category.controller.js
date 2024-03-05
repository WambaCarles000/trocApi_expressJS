const express = require("express");
const router = express.Router();
const { Category } = require('../models/models');
const jwt = require('jsonwebtoken');

// Create a category
module.exports.createCategory = async (req, res) => {
    try {
        const { label, description } = req.body;

        const newCategory = await  Category.create({
            label : label,
            description :description
        });

        res.status(201).json({ message: 'Category created successfully', data: newCategory });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Failed to create category' });
    }
};

// Read all categories
module.exports.getAllCategories =async (req, res) => {
    try {
        const categories = await Category.find().populate('propositions responses');
        res.status(200).json({ data: categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Failed to fetch categories' });
    }
};

// Read a specific category by ID
module.exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId).populate('propositions responses');
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ data: category });
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        res.status(500).json({ message: 'Failed to fetch category by ID' });
    }
};

// Update a category by ID
module.exports.editCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.categoryId,
            req.body,
            { new: true, runValidators: true }
        ).populate('propositions responses');

        res.status(200).json({ message: 'Category updated successfully', data: updatedCategory });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Failed to update category' });
    }
};

// Delete a category by ID
module.exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.categoryId);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully', data: deletedCategory });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Failed to delete category' });
    }
};

