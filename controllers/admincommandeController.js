const Commande = require('../models/Commande');

exports.CommandesStats = async(req, res) => {
    try {
        const filter = {};

        const [total, en_attente, livres, non_paye] = await Promise.all([
            Commande.countDocuments(),
            Commande.countDocuments({ status: 'en_attente' }),
            Commande.countDocuments({ status: 'livres' }),
            Commande.countDocuments({ payment_status: 'non_paye' })
        ]);

        res.status(200).json({
            total,
            en_attente,
            livres,
            non_paye
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erreur lors du chargement des statistiques",
            error: error.message
        })
    }
};

exports.StatOrders = async(req, res) => {
    try {
        const filter = {};
        if (req.user.role === 'admin' && req.query.restaurent) {
            filter.restaurent = req.user.restaurent;
        };

        const orders = await Commande.find(filter);
        const totalOrders = orders.length;
        const livres = orders.filter(c => c.status === 'livres');
        const totalRevenue = livres.reduce((acc, c) => acc + c.total_amount, 0);
        const averageOrderValue  = livres.length
            ? chiffre_affaire / livres.length
            : 0;
        const totalCustomers  = new Set(
            orders.map(c => c.customer_phone)
        ).size;

        return res.status(200).json({
            total_commandes: totalOrders,
            totalRevenue,
            averageOrderValue,
            totalCustomers
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.listCommande = async (req, res) => {
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

        if (status) {
            filter.status = status
        };
        if (payment_status) {
            filter.payment_status = payment_status
        };
        if (payment_method) {
            filter.payment_method = payment_method
        };
        if (restaurent) {
            filter.restaurent = restaurent
        };

        if (period === '30days') {
            filter.createdAt = {
                $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            };
        }

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

exports.RevenuChart = async(req, res) => {
    try {
        const filter = { 
            status: 'livres'
        };

        if (req.query.restaurent) {
            filter.restaurent = req.user.restaurent;
        };

        const data = await Commande.aggregate([
        { $match: filter },
        {
                $group: {
                    _id: { $dayOfMonth: "$createdAt" },
                    total: { $sum: "$total_amount" }
                }   
        },
        { $sort: { _id: 1 } } 
        ]);

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.RecentOrders = async(req, res) => {
    try {
        const filter = {};

        const commandes = await Commande.find(filter)
            .populate('restaurent', 'name')
            .sort({ createdAt: -1 })
            .limit(5);

        return res.status(200).json(commandes);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.topSellingMeals = async (req, res) => {
    try {

        const filter = { status: 'livres' };

        if (req.user.role === 'admin' && req.query.restaurent) {
            filter.restaurent = req.query.restaurent;
        }

        const data = await Commande.aggregate([
            { $match: filter },
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.nom_repas",
                    total_vendus: { $sum: "$items.quantite" }
                }
            },
            { $sort: { total_vendus: -1 } },
            { $limit: 5 }
        ]);

        res.json(data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};