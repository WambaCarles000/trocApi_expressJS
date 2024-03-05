const express = require("express");
const router = express.Router();
const { createUser, getUser, editUser, deleteUser, getAllUsers,getUserProp} = require("../controllers/user.controller.js");


const authenticateToken = require('../middlewares/authenticateToken.js');

//create
router.post("/",authenticateToken,createUser);

// Update

router.put("/:id",editUser);


//Read all users
router.get("/",getAllUsers);


//Read one user
router.get("/:id",getUser);

// Deleted

router.delete("/:id",deleteUser);

//users's props


router.get("/propositions/:id",getUserProp);

module.exports = router;
