// server/middleware/auth.middleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const authorizeOwner = (req, res, next) => {
  if (req.user.role !== "owner") {
    return res
      .status(403)
      .json({ message: "Access denied. Owner privileges required" });
  }
  next();
};

module.exports = { authenticate, authorizeOwner };
