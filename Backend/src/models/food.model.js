const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  foodPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodpartner"
  },
  LikeCount: {
    type: Number,
    default: 0
  },
  likeCount: {
    type: Number,
    default: 0
  },
  savesCount: {
    type: Number,
    default: 0
  }


}, {
  timestamps: true // Adds createdAt and updatedAt fields
})

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);


module.exports = foodModel;