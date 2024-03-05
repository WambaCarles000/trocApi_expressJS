// addressRoutes.js


const {Address} = require('../models/models');
const jwt = require('jsonwebtoken');
// Create an address
module.exports.createAddress = async (req, res) => {
   
   // Récupérez l'ID de l'utilisateur à partir du token
const storedToken = req.headers.authorization;
const decodedToken = jwt.decode(storedToken);
const userId = decodedToken.id;
   
    try {

        
        const { ville, region, pays, rue } = req.body;

        const newAddress = await Address.create({
            ville,
            region,
            pays,
            rue,
            user: userId,
        });

        res.status(201).json({ message: 'Address created successfully', data: newAddress });
    } catch (error) {
        console.error('Error while creating address:', error);
        res.status(500).json({ message: 'Failed to create address' });
    }
};

// Read all addresses
module.exports.getAllAddresses = async (req, res) => {
    try {
        const addresses = await Address.find().populate('user');
        res.status(200).json({ data: addresses });
    } catch (error) {
        console.error('Error fetching addresses:', error);
        res.status(500).json({ message: 'Failed to fetch addresses' });
    }
};

// Read a specific address by ID
module.exports.getAddress = async (req, res) => {
    try {
        const address = await Address.findById(req.params.addressId).populate('user');
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.status(200).json({ data: address });
    } catch (error) {
        console.error('Error fetching address by ID:', error);
        res.status(500).json({ message: 'Failed to fetch address by ID' });
    }
};

// Update an address by ID
module.exports.editAddress = async (req, res) => {
    try {
        const updatedAddress = await Address.findByIdAndUpdate(
            req.params.addressId,
            req.body,
            { new: true, runValidators: true }
        ).populate('user');

        res.status(200).json({ message: 'Address updated successfully', data: updatedAddress });
    } catch (error) {
        console.error('Error updating address:', error);
        res.status(500).json({ message: 'Failed to update address' });
    }
};

// Delete an address by ID
module.exports.deleteAddress = async (req, res) => {
    try {
        const deletedAddress = await Address.findByIdAndDelete(req.params.addressId);

        if (!deletedAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.status(200).json({ message: 'Address deleted successfully', data: deletedAddress });
    } catch (error) {
        console.error('Error deleting address:', error);
        res.status(500).json({ message: 'Failed to delete address' });
    }
};


