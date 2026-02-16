const Commande = require('../../models/Commande');
const mongoose = require('mongoose');

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