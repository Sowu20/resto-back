const Menu = require('../models/Menu');

exports.createMenu = async(req, res) => {
    try {
        const menu = await Menu.create(req.body);
        return res.status(201).json({
            message: 'Menu enregistré avec succès !',
            menu
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

exports.listMenu = async(req, res) => {
    const menu = await Menu.find();
    res.json(menu);
};

exports.detailMenu = async(req, res) => {
    try {
        const menu = await Menu.findById(req.params.id).populate('restaurent');
        if (!menu) {
            return res.status(404).json({
                message: 'Menu introuvable'
            });
        }
        res.json(menu);
    } catch (error) {
        return res.sttus(400).json({
            message: 'ID invalide !'
        });
    }
};

exports.updateMenu = async(req, res) => {
    try {
        const menu = await Menu.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!menu) {
            return res.status(404).json({
                message: 'Menu introuvable !'
            });
        };
        return res.status(201).json({
            message: 'Menu modifié avec succès',
            menu
        });
    } catch (error) {
        return res.status(404).json({
            message: 'ID invalide'
        });
    }
};

exports.deleteMenu = async(req, res) => {
    try {
        await Menu.findByIdAndDelete(req.params.id);
        return res.status(202).json({
            message: 'Menu supprimé avec succès !'
        });
    } catch (error) {
        return res.status(400).json({
            message: 'ID invalide'
        });
    }
};