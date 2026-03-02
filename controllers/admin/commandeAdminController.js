const Commande = require('../../models/Commande');
const mongoose = require('mongoose');

exports.createCommande = async(req, res) => {
    try {
        const {
            customer_name,
            customer_phone,
            items,
            payment_method,
            source,
            restaurent,
            table
        } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "La commande doit contenir au moins un repas"
            });
        }

        let total_amount = 0;
        const itemsTotal = [];

        for (let item of items) {
            const repasData = await Repas.findById(item.repas);
            if (!repasData) {
                return res.status(404).json({
                    message: 'Repas introuvable'
                });
            }
            if (!repasData.isAvaible) {
                return res.status(400).json({
                    message: `Ce repas n'est pas disponible pour le moment`
                });
            }

            const total = repasData.price * item.quantite;
            total_amount += total;
            itemsTotal.push({
                repas: repasData._id,
                name: repasData.name,
                price: repasData.price,
                quantite: Number(item.quantite) || 0,
                total
            });
        }

        // Générer numéro commande
        const order_number = "CMD-" + Date.now();

        let tableValue = null;
        if (source === "sur_place") {
            tableValue = table || null;
        }

        const commande = await Commande.create({
            order_number,
            customer_name,
            customer_phone,
            items: itemsTotal,
            total_amount,
            payment_method,
            source,
            restaurent,
            table: tableValue,
            status: "en_attente",
            payment_status: "en_attente"
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
    try {
        const {
            search, status, restaurentId, payment_status, limit = 10, page = 1
        } = req.query;
        let query = {}

        if (restaurentId && restaurentId !== 'Tous les restaurents') {
            query.restaurent = restaurentId;
        }

        if (search) {
            query.$or = [
                { customer_name: { $regex: search, $option: 'i' } },
                { order_number: { $regex: search, $option: 'i' } }
            ];
        }

        if (status && status !== 'Tous les status') {
            query.status = status;
        }

        if (payment_status && payment_status !== 'Tous les payements') {
            query.payment_status = payment_status;
        }

        const commandes = await Commande.find(query)
            .populate('restaurent', 'name image')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((page - 1) * limit);

        const total = await Commande.countDocuments(query);
        res.json({
            total,
            commandes
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

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
        await Commande.findByIdAndDelete(req.params.id);
        return res.status(201).json({
            message: 'Commande supprimée avec succès'
        });
    } catch (error) {
        return res.status(400).json({
            message: 'ID invalide'
        });
    }
};

exports.getAdminStats = async (req, res) => {
    try {
        const { restaurentId } = req.query;
        let matchStage = {};

        if (restaurentId && restaurentId !== 'Tous les restaurants') {
            matchStage.restaurent = new mongoose.Types.ObjectId(restaurentId);
        }

        const stats = await Commande.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    en_attente: { $sum: { $cond: [{ $eq: ["$status", "en_attente"] }, 1, 0] } },
                    livres: { $sum: { $cond: [{ $eq: ["$status", "livres"] }, 1, 0] } },
                    annules: { $sum: { $cond: [{ $eq: ["$status", "annules"] }, 1, 0] } }
                }
            }
        ]);

        res.json(stats[0] || { total: 0, en_attente: 0, livrees: 0, annulees: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};