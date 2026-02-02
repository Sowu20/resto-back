module.exports = (req, res, next) => {
  const restaurantId = req.params.restaurentId;

  if (req.user.role !== 'Admin') {
    return next();
  }

  if (req.user.role !== 'restaurant') {
    return res.status(403).json({ 
      message: "Accès interdit" 
    });
  }

  if (restaurantId !== req.user.restaurentId) {
    return res.status(403).json({
      message: "Ce restaurant ne vous appartient pas"
    });
  }

  next();
};