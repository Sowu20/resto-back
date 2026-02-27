const Commande = require('../../models/Commande');
const Restaurent = require('../../models/Restaurent');

exports.StatsOrders = async(req, res) => {
    try {
        const filter = req.query.restaurentId ? {
            restaurent: req.query.restaurentId
        } : {};

        const stats = await Promise.all([
            Commande.countDocuments(filter),
            Commande.aggregate([
                { $match: { ...filter, status: 'livres' } },
                { 
                    $group: { 
                        _id: null, 
                        total: { $sum: "$total_amount" },
                        countLivres: { $sum: 1 } 
                    } 
                }
            ]),
            Commande.distinct('customer_phone', filter) 
        ]);

        const totalRev = stats[1][0]?.total || 0;
        const totalLivres = stats[1][0]?.countLivres || 0;
        const panierMoyen = totalLivres > 0 ? (totalRev / totalLivres) : 0;

        return res.status(200).json({
            totalOrders: stats[0],
            totalRevenu: totalRev,
            averageOrderValue: Math.round(panierMoyen),
            totalCustomers: stats[2].length
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.RevenueChart = async (req, res) => {
    const filter = req.query.restaurentId ? {
        restaurent: req.query.restaurentId
    } : {};
    const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
    
    try {
        const history = await Commande.aggregate([
            { $match: 
                {
                    ...filter, 
                    createdAt: { $gte: sevenDaysAgo }, 
                    status: 'livres' } 
                },
            { $group: { 
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, 
                amount: { $sum: "$total_amount" } 
            }},
            { $sort: { "_id": 1 } }
        ]);
        res.json(history);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.StatsStaus = async (req, res) => {
    const filter = req.query.restaurentId ? {
        restaurent: req.query.restaurentId
    } : {};

    try {
        const statusStats = await Commande.aggregate([
            { $match: filter },
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        res.json(statusStats);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.TopSellers = async (req, res) => {
    const filter = req.query.restaurentId ? {
        restaurent: req.query.restaurentId
    } : {};

    try {
        const topSellers = await Commande.aggregate([
            { $match: filter },
            { $unwind: "$items" },
            { $group: { 
                _id: "$items.nom_repas", 
                totalQty: { $sum: "$items.quantite" } 
            }},
            { $sort: { totalQty: -1 } },
            { $limit: 5 }
        ]);
        res.json(topSellers);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.RecentOrders = async (req, res) => {
    const filter = req.query.restaurentId ? {
        restaurent: req.query.restaurentId
    } : {};

    try {
        const orders = await Commande.find(filter)
            .select('order_number customer_name total_amount status createdAt')
            .sort({ createdAt: -1 })
            .limit(8);
        res.json(orders);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.listRestaurents = async(req, res) => {
    const restaurents = await Restaurent.find()
        .select('name _id');
    res.json(restaurents);
};