const User = require('../models/User');

exports.listUser = async(req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
};

exports.detailUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({
                message: 'Utilisateur introuvable'
            });
        }
        res.json(user);
    } catch (error) {
        return res.status(400).json({
            message: "ID de l'utilisateur invalide"
        });
    }
}

exports.updateUser = async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!user) {
            return res.status(404).json({
                message: 'Utilisateur introuvable !'
            });
        }
        return res.status(201).json({
            message: 'Utilisateur modifié avec succès',
            user
        });
    } catch (error) {
        return res.status(400).json({
            message: "ID de l'utilisateur invalide !"
        });
    }
};

exports.deleteUser = async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(201).json({
            message: 'Utilisateur supprimé avec succès :'
        });
    } catch (error) {
        return res.status(400).json({
            message: "ID de l'utilisateur invalide !"
        });
    }
};