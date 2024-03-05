const express = require("express");
const router = express.Router();
const { createAddress, getAddress, editAddress, deleteAddress, getAllAddresses} = require("../controllers/address.controller.js");


const authenticateToken = require('../middlewares/authenticateToken.js');

//create
router.post("/",createAddress);

// Update

router.put("/:id",editAddress);


//Read all 
router.get("/",getAllAddresses);


//Read one user
router.get("/:id",getAddress);

// Deleted

router.delete("/:id",deleteAddress);



module.exports = router;
