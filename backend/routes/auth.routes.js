const express = require("express");
const router = express.Router();
const {login ,confirmUser} = require("../controllers/user.controller.js");




//login
router.post("/login",login);

//confirm
router.get('/confirm', confirmUser);


module.exports = router;
