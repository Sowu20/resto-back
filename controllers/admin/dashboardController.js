const Commande = require('../../models/Commande');

const Filter = (req) => {
    const filter = {};
    if (req.user.role === 'Admin' && req.query.restaurent) {
        filter.restaurent = req.query.restaurent;
    } else if (req.user.role !== 'Admin') {
        filter.restaurent = req.user.restaurent;
    }
    return filter;
};

exports.CommandesStats = async(req, res) => {
    try {
        const filter = Filter(req);

        const [total, en_attente, livres, non_paye] = await Promise.all([
            Commande.countDocuments(filter),
            Commande.countDocuments({ ...filter, status: 'en_attente' }),
            Commande.countDocuments({ ...filter, status: 'livres' }),
            Commande.countDocuments({ ...filter, payment_status: 'non_paye' })
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

exports.StatOrders = async (req, res) => {
    try {
        const filter = {};
        
        if (req.user.role === 'Admin') {
            if (req.query.restaurent) {
                filter.restaurent = req.query.restaurent;
            }
        } else {
            filter.restaurent = req.user.restaurent;
        }

        // filter.status = 'livres';

        const stats = await Commande.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },
                    totalRevenue: { $sum: "$total_amount" },
                    customers: { $addToSet: "$customer_phone" }
                }
            }
        ]);

        if (stats.length === 0) {
            return res.status(200).json({
                totalOrders: 0,
                totalRevenue: 0,
                averageOrderValue: 0,
                totalCustomers: 0
            });
        }

        const data = stats[0];

        return res.status(200).json({
            totalOrders: data.totalOrders,
            totalRevenue: data.totalRevenue,
            averageOrderValue: data.totalOrders > 0 ? data.totalRevenue / data.totalOrders : 0,
            totalCustomers: data.customers.length
        });

    } catch (error) {
        return res.status(500).json({
            message: "Erreur lors du calcul des statistiques de commandes",
            error: error.message
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

        const filter = Filter();

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

        if (req.user.role === 'Admin' && restaurent) {
            filter.restaurent = restaurent;
        }

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
        const filter = Filter(req);
        filter.status = 'livres';
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
        const filter = Filter(req);
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