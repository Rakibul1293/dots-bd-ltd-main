const express = require("express");
const router = express.Router();

const UserController = require('../controllers/userController.js');

router.post("/signup", UserController.user_signup);
router.post("/signin", UserController.user_login);

module.exports = router;
