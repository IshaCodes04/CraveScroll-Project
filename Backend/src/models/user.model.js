const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows null for users who don't use Google login
  },
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'foodpartner'
  }]
},
  {
    timestamps: true
  }
)

const userModel = mongoose.model("user", userSchema);


module.exports = userModel;
