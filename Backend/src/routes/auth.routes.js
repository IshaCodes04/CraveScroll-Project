const express = require("express");
const authController = require("../controllers/auth.controller");


const router = express.Router();

const passport = require('passport');
const jwt = require("jsonwebtoken");

// User auth API'S

router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.get('/user/logout', authController.logoutUser);

// Consolidated Google Auth Routes
router.get('/google', (req, res, next) => {
    const { role } = req.query; // 'user' or 'food-partner'
    console.log(`Google Auth requested for role: ${role || 'user'}`);
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account consent',
        state: role || 'user' // Pass role in state
    })(req, res, next);
});

router.get('/google/callback', (req, res, next) => {
    const role = req.query.state; // Retrieve role from state returned by Google

    passport.authenticate('google', async (err, user, info) => {
        if (err || !user) {
            const redirectPath = role === 'food-partner' ? '/food-partner/login' : '/user/login';
            const FRONTEND = process.env.FRONTEND_URL || "https://cravescroll-76hd.onrender.com";
            return res.redirect(`${FRONTEND}${redirectPath}?error=auth_failed`);
        }

        if (role === 'food-partner') {
            const foodPartnerModel = require("../models/foodpartner.model");
            let partner = await foodPartnerModel.findOne({ email: user.email });

            if (!partner) {
                // Register as NEW pending partner
                partner = new foodPartnerModel({
                    businessName: user.fullName,
                    contactName: user.fullName,
                    email: user.email,
                    password: "GOOGLE_AUTH_USER",
                    phone: "PLEASE_UPDATE",
                    address: "PLEASE_UPDATE",
                    status: 'pending'
                });
                await partner.save();
                const FRONTEND = process.env.FRONTEND_URL || "https://cravescroll-76hd.onrender.com";
                return res.redirect(`${FRONTEND}/food-partner/login?status=pending_created`);
            }

            if (partner.status !== 'approved') {
                const FRONTEND = process.env.FRONTEND_URL || "https://cravescroll-76hd.onrender.com";
                return res.redirect(`${FRONTEND}/food-partner/login?status=${partner.status}`);
            }

            // Approved Partner Login
            const token = jwt.sign({ id: partner._id }, process.env.JWT_SECRET);
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000
            });
            const FRONTEND_FP = process.env.FRONTEND_URL || "https://cravescroll-76hd.onrender.com";
            return res.redirect(`${FRONTEND_FP}/publishedReels`);
        } else {
            // General User Login/Register (already handled by passport config, just need token)
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000
            });
            const FRONTEND_USER = process.env.FRONTEND_URL || "https://cravescroll-76hd.onrender.com";
            return res.redirect(`${FRONTEND_USER}/home`);
        }
    })(req, res, next);
});

// Food Partner auth API'S

router.post('/food-partner/register', authController.registerFoodPartner);
router.post('/food-partner/login', authController.loginFoodPartner);
router.get('/food-partner/logout', authController.logoutFoodPartner);

// Admin auth API'S

router.post('/admin/register', authController.registerAdmin);
router.post('/admin/login', authController.loginAdmin);
router.get('/admin/logout', authController.logoutAdmin);


module.exports = router;