const express = require("express");
const router = express.Router();
const { createCategory, getCategory, editCategory, deleteCategory, getAllCategories} = require("../controllers/category.controller.js");


const authenticateToken = require('../middlewares/authenticateToken.js');

//create
router.post("/",createCategory);

// Update

router.put("/:id",editCategory);


//Read all 
router.get("/",getAllCategories);


//Read one 
router.get("/:id",getCategory);

// Deleted

router.delete("/:id",deleteCategory);



module.exports = router;
