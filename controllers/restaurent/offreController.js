const Offre = require('../../models/Offre_Speciale');

exports.createOffre = async(req, res) => {
    try {
        const offre = await Offre.create(req.body);
        return res.status(201).json({
            message: 'Offre créé avec duccès',
            offre
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.listOffre = async(req, res) => {
    const offres = await Offre.find()
        .populate('restaurent')
        .populate('repas');
    res.json(offres);
};

exports.detailOffre = async(req, res) => {
    try {
        const offre = await Offre.findById(req.params.id)
            .populate('restaurent')
            .populate('repas');
        if (!offre) {
            return res.status(404).json({
                message: 'Offre introuvable'
            });
        };
        res.json(offre);
    } catch (error) {
        return res.status(500).json({
            message: error.message
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
        return res.status(500).json({
            message: error.message
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
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.getOffreByRestaurent = async(req, res) => {
    try {
        const offres = await Offre.find({
            restaurent: req.params.restaurentId
        }).populate('repas');

        return res.status(200).json({
            offres
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getOffreByRepas = async(req, res) => {
    try {
        const offres = await Offre.find({
            repas: req.params.repasId
        });

        return res.status(200).json({
            offres
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}