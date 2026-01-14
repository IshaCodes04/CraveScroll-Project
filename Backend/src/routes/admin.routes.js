const express = require('express');
const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

/* /api/admin/stats */
router.get("/stats",
    authMiddleware.authAdminMiddleware,
    adminController.getAdminStats
);

module.exports = router;
