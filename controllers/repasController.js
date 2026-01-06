const Repas = require('../models/Repas');

exports.createRepas = async(req, res) => {
    try {
        const repas = Repas.create(req.body);
        return res.status(201).json({
            message: 'Repas enregistré avec succès !',
            repas
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

exports.listRepas = async(req, res) => {
    const repas = await Repas.find()
        .populate('menu', 'name')
        .populate('restaurent', 'nom')
        .populate('categorie', 'name');
    res.json(repas);
};

exports.detailRepas = async(req, res) => {
    try {
        const repas = await Repas.findById(req.params.id)
            .populate('menu', 'name')
            .populate('restaurent', 'nom')
            .populate('categorie', 'name');
        if (!repas) {
            return res.status(404).json({
                message: 'Repas introuvable'
            });
        }
        res.json(repas);
    } catch (error) {
        return res.status(400).json({
            message: 'ID invalide !'
        });
    }
};

exports.updateRepas = async(req, res) => {
    try {
        const repas = await Repas.findByIdAndDelete(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!repas) {
            return res.status(404).json({
                message: 'Repas introuvable !'
            });
        };
        return res.status(201).json({
            message: 'Repas modifié avec succès',
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
        await Repas.findByIdAndDelete(req.params.id);
        return res.status(202).json({
            message: 'Repas supprimé avec succès !'
        });
    } catch (error) {
        return res.status(400).json({
            message: 'ID invalide'
        });
    }
};