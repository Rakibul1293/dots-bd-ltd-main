require('dotenv').config();
const express = require("express");
const router = express.Router();

const UserInfoController = require('../controllers/userInfoController.js');
//const userInfoMiddleware = require('../middleware/userInfoMiddleware.tsx');

router.get("/", UserInfoController.userInfo_get_all);
router.post("/userInfo", UserInfoController.userInfo_create);
router.patch("/userInfo/:id", UserInfoController.update_userInfo_create);
router.delete("/userInfoDelete/:id", UserInfoController.delete_userInfo_create);

module.exports = router;
