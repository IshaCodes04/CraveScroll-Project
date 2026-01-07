const express = require("express");
const authController  = require("../controllers/auth.controller");


const router = express.Router();

// User auth API'S

router.post('/user/register', authController.registerUser);
router.post('/user/login' , authController.loginUser);
router.get('/user/logout', authController.logoutUser);

// Food Partner auth API'S

router.post('/food-partner/register' , authController.registerFoodPartner);
router.post('/food-partner/login' , authController.loginFoodPartner);
router.get('/food-partner/logout' , authController.logoutFoodPartner);

// Admin auth API'S

router.post('/admin/register' , authController.registerAdmin);
router.post('/admin/login' , authController.loginAdmin);
router.get('/admin/logout' , authController.logoutAdmin);


module.exports = router;