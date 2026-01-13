const jwt = require("jsonwebtoken");
const User = require('../models/User');

require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token manquant" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    req.user = {
      id: decoded.id,
      role: decoded.role,
      restaurentId: decoded.restaurentId
    };

    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalide !" });
  }
};