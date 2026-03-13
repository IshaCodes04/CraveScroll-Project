const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const foodPartnerModel = require("../models/foodpartner.model");
const adminModel = require("../models/admin.model");

async function registerUser(req, res) {
   try {
      const { fullName, email, password } = req.body
      console.log("Registering user:", { fullName, email });

      const isUserAlreadyExists = await userModel.findOne({ email })

      if (isUserAlreadyExists) {
         return res.status(400).json({ message: "User Already Exists!" })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await userModel.create({
         fullName,
         email,
         password: hashedPassword,
      })

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

      res.cookie("token", token)

      res.status(201).json({
         message: "User Registered Successfully",
         user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
         }
      })
   } catch (error) {
      console.error("Error in registerUser:", error);
      res.status(500).json({ message: "Internal Server Error during registration", error: error.message });
   }
}

async function loginUser(req, res) {
   try {
      const { email, password } = req.body;
      console.log("Logging in user:", email);

      const user = await userModel.findOne({ email })

      if (!user) {
         return res.status(400).json({ message: "Invalid email and password" })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
         return res.status(400).json({ message: "Invalid email and password" })
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

      res.cookie("token", token)

      res.status(200).json({
         message: "User Logged In Successfully",
         user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
         }
      })
   } catch (error) {
      console.error("Error in loginUser:", error);
      res.status(500).json({ message: "Internal Server Error during login", error: error.message });
   }
}

function logoutUser(req, res) {

   res.clearCookie("token")
   res.status(200).json({
      message: "User Logged Out Successfully"
   })
}

async function registerFoodPartner(req, res) {
   try {
      const { businessName, contactName, phone, email, password, address } = req.body
      console.log("Registering food partner:", { businessName, email });

      const isAccountAlreadyExists = await foodPartnerModel.findOne({ email })

      if (isAccountAlreadyExists) {
         return res.status(400).json({ message: "Food partner account already exists" })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const foodPartner = await foodPartnerModel.create({
         businessName,
         contactName,
         phone,
         email,
         password: hashedPassword,
         address
      })

      res.status(201).json({
         message: "Application Submitted Successfully. Please wait for admin approval.",
         foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            businessName: foodPartner.businessName,
            status: foodPartner.status
         }
      })
   } catch (error) {
      console.error("Error in registerFoodPartner:", error);
      res.status(500).json({ message: "Internal Server Error during registration", error: error.message });
   }
}

async function loginFoodPartner(req, res) {
   try {
      const { email, password } = req.body;
      console.log("Logging in food partner:", email);

      const foodPartner = await foodPartnerModel.findOne({ email })

      if (!foodPartner) {
         return res.status(400).json({ message: "Invalid email and password" })
      }

      const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

      if (!isPasswordValid) {
         return res.status(400).json({ message: "Invalid email and password" })
      }

      if (foodPartner.status !== 'approved') {
         return res.status(403).json({
            message: `Your account is currently ${foodPartner.status}. Please wait for admin approval.`
         })
      }

      const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET)

      res.cookie("token", token)

      res.status(200).json({
         message: "Food partner Logged In Successfully",
         foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            businessName: foodPartner.businessName.replace(/^GP-/i, ''),
            contactName: foodPartner.contactName,
            status: foodPartner.status
         }
      })
   } catch (error) {
      console.error("Error in loginFoodPartner:", error);
      res.status(500).json({ message: "Internal Server Error during login", error: error.message });
   }
}

function logoutFoodPartner(req, res) {

   res.clearCookie("token")
   res.status(200).json({
      message: "Food partner Logged Out Successfully"
   })

}

async function registerAdmin(req, res) {
   try {
      const { adminName, email, secretKey } = req.body;

      if (!adminName || !email || !secretKey) {
         return res.status(400).json({ message: "All fields are required" });
      }

      const isAdminAlreadyExists = await adminModel.findOne({ email });

      if (isAdminAlreadyExists) {
         return res.status(400).json({
            message: "Admin account already exists"
         });
      }

      // Hash the secret key for security
      const salt = await bcrypt.genSalt(10);
      const hashedSecretKey = await bcrypt.hash(secretKey, salt);

      const admin = await adminModel.create({
         adminName,
         email,
         secretKey: hashedSecretKey
      });

      const token = jwt.sign({
         id: admin._id,
      }, process.env.JWT_SECRET);

      res.cookie("token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "lax",
         maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

      res.status(201).json({
         message: "Admin Registered Successfully",
         admin: {
            _id: admin._id,
            email: admin.email,
            adminName: admin.adminName
         }
      });
   } catch (error) {
      console.error("Error in registerAdmin:", error);
      res.status(500).json({ message: "Internal Server Error during registration" });
   }
}

async function loginAdmin(req, res) {
   try {
      const { email, secretKey } = req.body;

      if (!email || !secretKey) {
         return res.status(400).json({
            message: "Email and Secret Key are required"
         });
      }

      const admin = await adminModel.findOne({ email });

      if (!admin) {
         return res.status(400).json({
            message: "Invalid email or secret key"
         });
      }

      // Check if secretKey matches using bcrypt
      const isMatch = await bcrypt.compare(secretKey, admin.secretKey);
      if (!isMatch) {
         return res.status(400).json({
            message: "Invalid email or secret key"
         });
      }

      const token = jwt.sign({
         id: admin._id,
      }, process.env.JWT_SECRET);

      res.cookie("token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "lax",
         maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

      res.status(200).json({
         message: "Admin Logged In Successfully",
         admin: {
            _id: admin._id,
            email: admin.email,
            adminName: admin.adminName
         }
      });
   } catch (error) {
      console.error("Error in loginAdmin:", error);
      res.status(500).json({ message: "Internal Server Error during login" });
   }
}

function logoutAdmin(req, res) {
   try {
      res.clearCookie("token");
      res.status(200).json({
         message: "Admin Logged Out Successfully"
      });
   } catch (error) {
      console.error("Error in logoutAdmin:", error);
      res.status(500).json({ message: "Internal Server Error during logout" });
   }
}

module.exports = {
   registerUser,
   loginUser,
   logoutUser,
   registerFoodPartner,
   loginFoodPartner,
   logoutFoodPartner,
   registerAdmin,
   loginAdmin,
   logoutAdmin
}