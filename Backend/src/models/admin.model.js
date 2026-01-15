const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({

  adminName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  secretKey: {
    type: String,
    required: true
  }

})

const adminModel = mongoose.models.admin || mongoose.model("admin", adminSchema)



module.exports = adminModel;
