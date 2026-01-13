const jwt = require("jsonwebtoken");
const User = require('../models/User');

require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token manquant" });
    }

    const secret_key ='0a01fcf7e3084f800565d0bd2d9a69de63b043d3c91274306a40b3df8c03ed05';

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, secret_key);
    
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