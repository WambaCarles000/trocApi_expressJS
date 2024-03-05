const express = require("express");
const router = express.Router();
const { create_Response, getResponse, editResponse, deleteResponse, getAllResponses} = require("../controllers/response.controller.js");


// const authenticateToken = require('../middlewares/authenticateToken.js');

//create
router.post("/",create_Response);

// Update

router.put("/:id",editResponse);







//Read all respones
router.get("/",getAllResponses);


//Read one user
router.get("/:id",getResponse);

// Deleted

router.delete("/:id",deleteResponse);



module.exports = router;
