const foodPartnerModel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const adminModel = require("../models/admin.model");


async function authFoodPartnerMiddleware(req, res, next) {

  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({
      message: "Please Login First"
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const foodPartner = await foodPartnerModel.findById(decoded.id);

    req.foodPartner = foodPartner

    next()

  } catch (err) {

    return res.status(401).json({
      message: "Invalid Token"

    })
  }

}

async function authUserMiddleware(req, res, next) {

  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({
      message: "Please Login First"
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id);

    if (user) {
      req.user = user;
    } else {
      const foodPartner = await foodPartnerModel.findById(decoded.id);
      if (foodPartner) {
        req.foodPartner = foodPartner;
      }
    }

    next()

  } catch (err) {

    return res.status(401).json({
      message: "Invalid Token"

    })
  }
}


async function authAdminMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Please Login First" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await adminModel.findById(decoded.id);
    if (!admin) return res.status(403).json({ message: "Access Denied" });
    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}

module.exports = {
  authFoodPartnerMiddleware,
  authUserMiddleware,
  authAdminMiddleware
}