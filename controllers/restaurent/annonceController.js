const Annonce = require('../../models/Annonce');

exports.createAnnonce = async(req, res) => {
    try {
        const annonce = await Annonce.create(req.body);
        return res.status(201).json({
            message: 'Annonçe créé avec duccès',
            annonce
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.listAnnonce = async(req, res) => {
    const annonces = await Annonce.find();
    res.json(annonces);
};

exports.detailAnnonce = async(req, res) => {
    try {
        const annonce = await Annonce.findById(req.params.id);
        if (!annonce) {
            return res.status(404).json({
                message: 'Annonce introuvable'
            });
        };
        res.json(annonce);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.updateAnnonce = async(req, res) => {
    try {
        const annonce = await Annonce.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!annonce) {
            return res.status(404).json({
                message: 'Annonçe introuvable'
            });
        };
        return res.status(202).json({
            message: 'Annonçe modifié !',
            annonce
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteAnnonce = async(req, res) => {
    try {
        await Annonce.findByIdAndDelete(req.params.id);
        res.json({
            message: 'Annonçe supprimée avec succès'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};