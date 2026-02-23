const mongoose = require("mongoose")

const foodPartnerSchema = new mongoose.Schema({

  businessName: {
    type: String,
    required: true
  },

  contactName: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]

})

const foodPartnerModel = mongoose.models.foodpartner || mongoose.model("foodpartner", foodPartnerSchema)



module.exports = foodPartnerModel;