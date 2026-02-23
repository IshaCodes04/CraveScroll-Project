const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');

async function getFoodPartnerById(req, res) {

    try {
        const foodPartnerId = req.params.id;

        const foodPartner = await foodPartnerModel.findById(foodPartnerId)
        const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId })

        if (!foodPartner) {
            return res.status(404).json({ message: "Food partner not found" });
        }

        const user = req.user;
        let isFollowing = false;
        if (user && user.following) {
            isFollowing = user.following.includes(foodPartnerId);
        }

        res.status(200).json({
            message: "Food partner retrieved successfully",
            foodPartner: {
                ...foodPartner.toObject(),
                foodItems: foodItemsByFoodPartner,
                isFollowing,
                followersCount: foodPartner.followers?.length || 0
            }
        });
    } catch (error) {
        console.error('Error in getFoodPartnerById:', error);
        res.status(500).json({
            message: "Error fetching food partner",
            error: error.message
        });
    }
}

async function getPendingPartners(req, res) {
    try {
        const pendingPartners = await foodPartnerModel.find({ status: 'pending' }).select('-password');
        res.status(200).json({
            message: "Pending partners fetched successfully",
            pendingPartners
        });
    } catch (error) {
        console.error('Error fetching pending partners:', error);
        res.status(500).json({ message: "Error fetching pending partners", error: error.message });
    }
}

async function approvePartner(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body; // Expecting 'approved' or 'rejected'

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: "Invalid status. Use 'approved' or 'rejected'." });
        }

        const updatedPartner = await foodPartnerModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).select('-password');

        if (!updatedPartner) {
            return res.status(404).json({ message: "Food partner not found" });
        }

        res.status(200).json({
            message: `Partner status updated to ${status}`,
            partner: updatedPartner
        });
    } catch (error) {
        console.error('Error approving partner:', error);
        res.status(500).json({ message: "Error updating partner status", error: error.message });
    }
}

module.exports = {
    getFoodPartnerById,
    getPendingPartners,
    approvePartner
};