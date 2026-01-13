const foodModel = require('../models/food.model');
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
        }

        const foodItemsWithStatus = foodItems.map(item => {
            const itemObj = item.toObject();
            itemObj.isLiked = likedFoodIds.has(item._id.toString());
            itemObj.isSaved = savedFoodIds.has(item._id.toString());
            itemObj.likeCount = Math.max(0, itemObj.likeCount || 0);
            itemObj.savesCount = Math.max(0, itemObj.savesCount || 0);

            // SIMPLE FIX - Check if foodPartner exists
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
            isUser: !!user
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

    // Add isLiked status to each saved food
    const savedFoodsWithStatus = savedFoods.map(item => {
        const itemObj = item.toObject();
        if (itemObj.food && itemObj.food._id) {
            itemObj.food.isLiked = likedFoodIds.has(itemObj.food._id.toString());
            itemObj.food.isSaved = true; // All items are saved
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


module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSaveFood
}