const express = require("express");
const router = express.Router();
const { createImage, getImage, editImage, deleteImage, getAllImages} = require("../controllers/image.controller.js");


const authenticateToken = require('../middlewares/authenticateToken.js');

//create
router.post("/",createImage);

// Update

router.put("/:id",editImage);


//Read all i
router.get("/",getAllImages);


//Read one 
router.get("/:id",getImage);

// Deleted

router.delete("/:id",deleteImage);



module.exports = router;
