const Commande = require('../models/Commande');

exports.getCommandesStats = async(req, res) => {
    try {
        const [total, en_attente, livres, annules] = await Promise.all([
            Commande.countDocuments(),
            Commande.countDocuments({ status: 'en_attente' }),
            Commande.countDocuments({ status: 'termine' }),
            Commande.countDocuments({ payment_status: 'nom_paye' })
        ]);

        res.status(200).json({
            total,
            en_attente,
            livres,
            annules
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erreur lors du chargement des statistiques",
            error: error.message
        })
    }
}; 

exports.getlistCommande = async (req, res) => {
    try {
        const {
            status,
            payment_status,
            payment_method,
            restaurent,
            search,
            period,
            page = 1,
            limit = 10
        } = req.query;

        const filter = {};

        if (status) filter.status = status;
        if (payment_status) filter.payment_status = payment_status;
        if (payment_method) filter.payment_method = payment_method;
        if (restaurent) filter.restaurent = restaurent;

        // Période (30 derniers jours)
        if (period === '30days') {
            filter.createdAt = {
                $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            };
        }

        // Recherche
        if (search) {
            filter.$or = [
                { order_number: { $regex: search, $options: 'i' } },
                { customer_name: { $regex: search, $options: 'i' } },
                { customer_phone: { $regex: search, $options: 'i' } }
            ];
        }

        const commandes = await Commande.find(filter)
            .populate('restaurent', 'name')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Commande.countDocuments(filter);

        res.status(200).json({
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            commandes
        });

    } catch (error) {
        return res.status(500).json({
            message: "Erreur lors de l'affiche de la liste des commandes",
            error: error.message
        });
    }
};