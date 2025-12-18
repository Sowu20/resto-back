const jwt = require("jsonwebtoken");
const User = require('../models/User');

require('dotenv').config();

const secret_key = process.env.SECRET_KEY;

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token manquant !" });
    }

    const decoded = jwt.verify(token , secret_key);
    req.userId = decoded.id;

    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalide !" });
  }
};