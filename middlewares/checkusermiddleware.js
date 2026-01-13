module.exports = (req, res, next) => {
    const userId = req.params.userId;

    if (req.user.role === 'Admin') {
        return next();
    }

    if (req.user.id !== userId){
        return res.status(403).json({
            message: 'Accès interdit à ce compte utilisateur'
        });
    }

    next();
}