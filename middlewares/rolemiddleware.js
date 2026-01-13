module.exports = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Rôle non défini" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Accès interdit : rôle ${req.user.role}`
      });
    }

    next();
  };
};