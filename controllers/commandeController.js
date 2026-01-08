const Commande = require('../models/Commande');

exports.createCommande = async(req, res) => {
    try {
        const commande = await Commande.create({
            ...req.body,
            user: req.userId
        });
        return res.status(201).json({
            message: 'Commande enregistré avec succès',
            commande
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

exports.listCommande = async(req, res) => {
    const commandes = await Commande.find()
    res.json(commandes);
};

exports.detailCommande = async(req, res) => {
    try {
        const commande = await Commande.findById(req.params.id).populate('restaurent');
        if (!commande) {
            return res.status(404).json({
                message: 'Commande introuvable'
            });
        }
        res.json(commande);
    } catch (error) {
        return res.status(400).json({
            message: 'ID invalide'
        });
    }
};

exports.updateCommande = async(req, res) => {
    try {
        const commande = await Commande.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!commande) {
            return res.status(404).json({
                message: 'Commande introuvable'
            });
        };
        return res.status(202).json({
            message: 'Commande modifiée avec succès',
            commande
        });
    } catch (error) {
        return res.status(400).json({
            message: 'ID invalide'
        });   
    }
};

exports.deleteCommande = async(req, res) => {
    try {
        await Commande.findById(req.params.id);
        return res.status(201).json({
            message: 'Commande supprimée avec succès'
        });
    } catch (error) {
        return res.status(400).json({
            message: 'ID invalide'
        });
    }
};

exports.faireCommande = async(req, res) => {
    try {
        const {
            customer_name,
            customer_phone,
            items,
            payment_method,
            tableId,
            restaurentId
        } = req.body;

        const commande = new Commande ({
            customer_name,
            customer_phone,
            items,
            payment_method,
            status: 'en_attente',
            sourec: 'qr_code',
            payment_status: 'en_attente',
            table: tableId,
            resturent: restaurentId
        });

        await commande.save();

        return res.status(201).json({
            message: 'Commande passée avec succès'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}