// middleware/auth.js
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Token manquant dans le header Authorization");
      return res.status(401).json({ message: "Token manquant" });
    }

    const token = authHeader.split(" ")[1];
    const secret_key = '0a01fcf7e3084f800565d0bd2d9a69de63b043d3c91274306a40b3df8c03ed05';

    // Décodage du token
    let decoded;
    try {
      decoded = jwt.verify(token, secret_key);
    } catch (err) {
      console.log("Erreur de vérification du token :", err.message);
      return res.status(403).json({ message: "Token invalide !" });
    }

    console.log("Token décodé :", decoded);

    if (!decoded.role) {
      console.log("Le token ne contient pas de rôle !");
      return res.status(403).json({ message: "Rôle non défini dans le token" });
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
      restaurentId: decoded.restaurentId
    };

    next();

  } catch (err) {
    console.log("Erreur middleware auth :", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};