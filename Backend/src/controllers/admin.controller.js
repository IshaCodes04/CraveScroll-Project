const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');

async function getAdminStats(req, res) {
    try {
        const [totalUsers, totalPartners, totalReels, pendingReqs] = await Promise.all([
            userModel.countDocuments(),
            foodPartnerModel.countDocuments({ status: 'approved' }),
            foodModel.countDocuments(),
            foodPartnerModel.countDocuments({ status: 'pending' })
        ]);

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                foodPartners: totalPartners,
                activeReels: totalReels,
                pendingReqs
            }
        });
    } catch (error) {
        console.error('Error in getAdminStats:', error);
        res.status(500).json({ success: false, message: "Error fetching admin stats", error: error.message });
    }
}

module.exports = {
    getAdminStats
};
