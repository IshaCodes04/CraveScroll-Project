const express = require('express');
const foodPartnerController = require("../controllers/food-partner.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();


/* /api/food-partner/:id */
router.get("/:id",
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodPartnerById)

/* Admin Routes */
router.get("/admin/pending",
    authMiddleware.authAdminMiddleware,
    foodPartnerController.getPendingPartners)

router.put("/admin/approve/:id",
    authMiddleware.authAdminMiddleware,
    foodPartnerController.approvePartner)

module.exports = router;