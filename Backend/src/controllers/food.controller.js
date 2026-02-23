const foodModel = require('../models/food.model');
const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');
const storageService = require('../services/storage.service');
const likeModel = require("../models/likes.model")
const saveModel = require("../models/save.model")
const { v4: uuid } = require("uuid")


async function createFood(req, res) {
    try {
        // Check if foodPartner exists
        if (!req.foodPartner || !req.foodPartner._id) {
            return res.status(403).json({
                message: "Only food partners can create food reels"
            });
        }

        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner._id
        });

        res.status(201).json({
            message: "food created successfully",
            food: foodItem
        });

    } catch (error) {
        console.error('Error in createFood:', error);
        res.status(500).json({
            message: "Error creating food",
            error: error.message
        });
    }
}

async function getFoodItems(req, res) {
    try {
        const user = req.user;

        const foodItems = await foodModel.find({})
            .populate('foodPartner', 'businessName contactName email')
            .sort({ createdAt: -1 });

        let likedFoodIds = new Set();
        let savedFoodIds = new Set();
        let followingPartnerIds = new Set();

        if (user) {
            const foodIds = foodItems.map(item => item._id);

            const likedItems = await likeModel.find({
                user: user._id,
                food: { $in: foodIds }
            }).select('food');

            likedFoodIds = new Set(likedItems.map(item => item.food.toString()));

            const savedItems = await saveModel.find({
                user: user._id,
                food: { $in: foodIds }
            }).select('food');

            savedFoodIds = new Set(savedItems.map(item => item.food.toString()));

            // Get following partners
            if (user.following) {
                followingPartnerIds = new Set(user.following.map(id => id.toString()));
            }
        }

        const foodItemsWithStatus = foodItems.map(item => {
            const itemObj = item.toObject();
            itemObj.isLiked = likedFoodIds.has(item._id.toString());
            itemObj.isSaved = savedFoodIds.has(item._id.toString());

            // Following status for the partner
            const partnerId = itemObj.foodPartner?._id?.toString() || itemObj.foodPartner?.toString();
            itemObj.isFollowing = followingPartnerIds.has(partnerId);

            itemObj.likeCount = Math.max(0, itemObj.likeCount || 0);
            itemObj.savesCount = Math.max(0, itemObj.savesCount || 0);

            const partnerName = itemObj.foodPartner?.businessName
                || itemObj.foodPartner?.contactName
                || 'Anonymous Chef';

            itemObj.user = {
                name: partnerName,
                avatar: null
            };
            itemObj.author = partnerName;

            return itemObj;
        });

        res.status(200).json({
            message: "Food items fetched successfully",
            foodItems: foodItemsWithStatus,
            isUser: !!user,
            isFoodPartner: !!req.foodPartner,
            currentPartnerId: req.foodPartner?._id
        });

    } catch (error) {
        console.error('Error in getFoodItems:', error);
        res.status(500).json({
            message: "Error fetching food items",
            error: error.message
        });
    }
}

async function likeFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: "Only users can like food" });
    }

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        const updatedFood = await foodModel.findByIdAndUpdate(
            foodId,
            { $inc: { likeCount: -1 } },
            { new: true }
        )

        // Ensure count doesn't go below 0
        const finalLikeCount = Math.max(0, updatedFood.likeCount || 0);
        if (finalLikeCount !== updatedFood.likeCount) {
            await foodModel.findByIdAndUpdate(foodId, { likeCount: finalLikeCount });
        }

        return res.status(200).json({
            message: "Food unliked successfully",
            like: false,
            likeCount: finalLikeCount
        })
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    })

    const updatedFood = await foodModel.findByIdAndUpdate(
        foodId,
        { $inc: { likeCount: 1 } },
        { new: true }
    )

    res.status(201).json({
        message: "Food liked successfully",
        like: true,
        likeCount: updatedFood.likeCount || 0
    })

}

async function saveFood(req, res) {

    const { foodId } = req.body;
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: "Only users can save food" });
    }

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        const updatedFood = await foodModel.findByIdAndUpdate(
            foodId,
            { $inc: { savesCount: -1 } },
            { new: true }
        )

        // Ensure count doesn't go below 0
        const finalSavesCount = Math.max(0, updatedFood.savesCount || 0);
        if (finalSavesCount !== updatedFood.savesCount) {
            await foodModel.findByIdAndUpdate(foodId, { savesCount: finalSavesCount });
        }

        return res.status(200).json({
            message: "Food unsaved successfully",
            save: false,
            savesCount: finalSavesCount
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    const updatedFood = await foodModel.findByIdAndUpdate(
        foodId,
        { $inc: { savesCount: 1 } },
        { new: true }
    )

    res.status(201).json({
        message: "Food saved successfully",
        save: true,
        savesCount: updatedFood.savesCount || 0
    })

}

async function getSaveFood(req, res) {

    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: "Only users can view saved food" });
    }

    const savedFoods = await saveModel.find({ user: user._id })
        .populate({
            path: 'food',
            populate: {
                path: 'foodPartner'
            }
        });

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    // Get all food IDs
    const foodIds = savedFoods.map(item => item.food?._id).filter(Boolean);

    // Check which items are liked by the user
    const likedItems = await likeModel.find({
        user: user._id,
        food: { $in: foodIds }
    }).select('food');

    const likedFoodIds = new Set(likedItems.map(item => item.food.toString()));

    // Get following partners
    const followingPartnerIds = new Set(user.following ? user.following.map(id => id.toString()) : []);

    // Add status flags to each saved food
    const savedFoodsWithStatus = savedFoods.map(item => {
        const itemObj = item.toObject();
        if (itemObj.food && itemObj.food._id) {
            itemObj.food.isLiked = likedFoodIds.has(itemObj.food._id.toString());
            itemObj.food.isSaved = true; // All items are saved

            // Following status
            const partnerId = itemObj.food?.foodPartner?._id?.toString() || itemObj.food?.foodPartner?.toString();
            itemObj.food.isFollowing = followingPartnerIds.has(partnerId);

            // Ensure counts are non-negative
            itemObj.food.likeCount = Math.max(0, itemObj.food.likeCount || 0);
            itemObj.food.savesCount = Math.max(0, itemObj.food.savesCount || 0);
        }
        return itemObj;
    });

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods: savedFoodsWithStatus
    });

}


async function getPublishedReels(req, res) {
    try {
        if (!req.foodPartner || !req.foodPartner._id) {
            return res.status(403).json({
                message: "Only food partners can view their published reels"
            });
        }

        const foodItems = await foodModel.find({ foodPartner: req.foodPartner._id })
            .populate('foodPartner', 'businessName contactName email')
            .sort({ createdAt: -1 });

        const foodItemsWithStatus = foodItems.map(item => {
            const itemObj = item.toObject();
            const partnerName = itemObj.foodPartner?.businessName
                || itemObj.foodPartner?.contactName
                || 'Anonymous Chef';

            itemObj.user = {
                name: partnerName,
                avatar: null
            };
            itemObj.author = partnerName;
            itemObj.likeCount = Math.max(0, itemObj.likeCount || 0);
            itemObj.savesCount = Math.max(0, itemObj.savesCount || 0);

            return itemObj;
        });

        res.status(200).json({
            message: "Published reels fetched successfully",
            foodItems: foodItemsWithStatus,
            currentPartnerId: req.foodPartner?._id
        });

    } catch (error) {
        console.error('Error in getPublishedReels:', error);
        res.status(500).json({
            message: "Error fetching published reels",
            error: error.message
        });
    }
}


async function followFoodPartner(req, res) {
    const { partnerId } = req.body;
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: "Only users can follow food partners" });
    }

    try {
        const partner = await foodPartnerModel.findById(partnerId);
        if (!partner) {
            return res.status(404).json({ message: "Food Partner not found" });
        }

        const isFollowing = user.following.includes(partnerId);

        if (isFollowing) {
            // Unfollow
            user.following = user.following.filter(id => id.toString() !== partnerId);
            partner.followers = partner.followers.filter(id => id.toString() !== user._id.toString());

            await user.save();
            await partner.save();

            return res.status(200).json({
                message: "Unfollowed successfully",
                isFollowing: false,
                followersCount: partner.followers.length
            });
        } else {
            // Follow
            user.following.push(partnerId);
            partner.followers.push(user._id);

            await user.save();
            await partner.save();

            return res.status(200).json({
                message: "Followed successfully",
                isFollowing: true,
                followersCount: partner.followers.length
            });
        }
    } catch (error) {
        console.error('Error in followFoodPartner:', error);
        res.status(500).json({ message: "Error in follow action", error: error.message });
    }
}

async function deleteFood(req, res) {
    try {
        const { id } = req.params;
        const foodPartner = req.foodPartner;

        if (!foodPartner) {
            return res.status(403).json({ message: "Only food partners can delete reels" });
        }

        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ message: "Food reel not found" });
        }

        if (food.foodPartner.toString() !== foodPartner._id.toString()) {
            return res.status(403).json({ message: "You can only delete your own reels" });
        }

        await foodModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Food reel deleted successfully" });
    } catch (error) {
        console.error('Error in deleteFood:', error);
        res.status(500).json({ message: "Error deleting food reel", error: error.message });
    }
}

module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    followFoodPartner,
    saveFood,
    getSaveFood,
    getPublishedReels,
    deleteFood
}