const express = require("express");
const router = express.Router();
const { createProposition, getProposition, editProposition, deleteProposition, getAllPropositions} = require("../controllers/proposition.controller.js");


const authenticateToken = require('../middlewares/authenticateToken.js');

//create
router.post("/",authenticateToken,createProposition);

// Update

router.put("/:id",editProposition);


//Read all propositions
router.get("/",getAllPropositions);


//Read one 
router.get("/:id",getProposition);

// Deleted

router.delete("/:id",deleteProposition);



module.exports = router;
