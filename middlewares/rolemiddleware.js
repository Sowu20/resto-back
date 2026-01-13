module.exports = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      console.log("Accès refusé : rôle non défini dans req.user");
      return res.status(403).json({ message: "Rôle non défini" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      console.log(`Accès interdit : rôle de l'utilisateur = ${req.user.role}, rôles autorisés = ${allowedRoles}`);
      return res.status(403).json({
        message: `Accès interdit : rôle ${req.user.role}`
      });
    }

    next();
  };
};
