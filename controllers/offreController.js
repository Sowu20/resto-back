const Offre = require('../models/Offre_Speciale');

exports.createOffre = async(req, res) => {
    try {
        const offre = await Offre.create(req.body);
        return res.status(201).json({
            message: 'Offre créé avec duccès',
            offre
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
};

exports.listOffre = async(req, res) => {
    const offres = await Offre.find().populate('restaurent', 'repas');
    res.json(offres);
};

exports.detailOffre = async(req, res) => {
    try {
        const offre = await Offre.findById(req.params.id).populate('restaurent', 'repas');
        if (!offre) {
            return res.status(404).json({
                message: 'Offre introuvable'
            });
        };
        res.json(offre);
    } catch (error) {
        return res.status(400).json({
            message: 'ID invalide'
        });
    }
};

exports.updateOffre = async(req, res) => {
    try {
        const offre = await Offre.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!offre) {
            return res.status(404).json({
                message: 'Offre introuvable'
            });
        };
        return res.status(202).json({
            message: 'Offre modifié !',
            offre
        });
    } catch (error) {
        return res.status(400).json({
            message: 'ID invalide'
        });
    }
};

exports.deleteOffre = async(req, res) => {
    try {
        await Offre.findByIdAndDelete(req.params.id);
        res.json({
            message: 'Offre supprimée avec succès'
        });
    } catch (error) {
        return res.status(400).json({
            message: 'ID invalide'
        });
    }
};