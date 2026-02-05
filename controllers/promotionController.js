const Promotion = require('../models/Promotion');

exports.createPromotion = async(req, res) => {
    try {
        const promotion = await Promotion.create(req.body);

        return res.status(201).json({
            message: 'Promotion créée avec succès',
            promotion
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.listPromotion = async(req, res) => {
    try {
        const promotions = await Promotion.find()
            .populate('restaurent');

        return res.status(200).json(promotions)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.detailPromotion = async(req, res) => {
    try {
        const promotion = await Promotion.findById(req.params.id)
            .populate('restaurent');
        
        if (!promotion) {
            return res.status(404).json({
                message: 'Promotion introuvable'
            });
        };

        return res.status(200).json(promotion);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.updatePromotion = async(req, res) => {
    try {
        const promotion = await Promotion.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!promotion) {
            return res.status(404).json({
                message: "Promotion introuvable"
            });
        };

        return res.status(200).json({
            message: "Promotio modifié avec succès",
            promotion
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    };
};

exports.deletePromotion = async(req, res) => {
    try {
        await Promotion.findByIdAndDelete(req.params.id);
        res.json({
            message: 'Promotion supprimée avec succès'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.avaiblePromotion = async(req, res) => {
    try {
        const now = new Date();

        const promotions = await Promotion.find({
            date_debut: { $lte: now },
            date_fin: { $gte: now }
        }).populate('restaurent');

        return res.status(200).json(promotions);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.duePromotion = async(req, res) => {
    try {
        const now = new Date();

        const promotions = await Promotion.find({
            date_fin: { $lt: now }
        }).populate('restaurent');

        return res.status(200).json(promotions);
    } catch (error) {
        return res.staus(500).json({
            message: error.message
        });
    }
};

exports.promotionByRestaurent = async(req, res) => {
    try {
        const promotions = await Promotion.find({
            restaurent: req.params.restaurentId
        });

        return res.status(200).json(promotions);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}