const { default: mongoose } = require('mongoose');
const Commande = require('../../models/Commande');
const Repas = require('../../models/Repas');
const User = require('../../models/User');
const sendNotification = require('../../utils/sendNotification');
const Table = require('../../models/Table');

exports.faireCommande = async(req, res) => {
    try {
        const { restaurentId } = req.params;
        const {
            customer_name,
            customer_phone,
            items,
            payment_method,
            source,
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
            if (!table) {
                return res.status(400).json({
                    message: "La table est obligatoire pour une commande sur place"
                });
            };
            const tableData = await Table.findById(table);
            if (!tableData) {
                return res.status(404).json({
                    message: "Table introuvable"
                });  
            };

            tableValue = tableData._id;
        }

        const commande = await Commande.create({
            order_number,
            customer_name,
            customer_phone,
            items: itemsTotal,
            total_amount,
            payment_method,
            source,
            table: tableValue,
            status: "en_attente",
            payment_status: "en_attente",
            restaurent: restaurentId
        });

        // Notification au restaurateur
        await sendNotification({
            userId: restaurentId,
            titre: 'Nouvelle commande',
            contenu: `Vous avez reçu une nouvelle commande (${order_number}) de ${customer_name} !`,
            type: 'commande'
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
        const { restaurentId } = req.params;
        const { search, status, payment_status, limit = 10 } = req.query;

        let query = { restaurent: restaurentId };
        if (search) {
            query.$or = [
                { customer_name: { $regex: search, $options: 'i' } },
                { order_number: { $regex: search, $options: 'i' } }
            ];
        };

        if (status && status !== 'Tous les status') {
            query.status = status;
        };
        if (payment_status) {
            query.payment_status = payment_status;
        };

        const commandes = await Commande.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit));

        res.json(commandes);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.detailCommande = async(req, res) => {
    try {
        const { id, restaurentId } = req.params;
        const commande = await Commande.findById({
            _id: id,
            restaurent: restaurentId
        });
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
        const { id, restaurentId } = req.params;
        const commande = await Commande.findOneAndUpdate(
            {
                _id: id,
                restaurent: restaurentId
            },
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
        const { id, restaurentId } = req.params;
        await Commande.findByIdAndDelete({
            _id: id,
            restaurent: restaurentId
        });
        return res.status(201).json({
            message: 'Commande supprimée avec succès'
        });
    } catch (error) {
        return res.status(400).json({
            message: 'ID invalide'
        });
    }
};

exports.getStats = async (req, res) => {
    try {
        const { restaurentId } = req.params;
        const rId = new mongoose.Types.ObjectId(restaurentId);

        const stats = await Commande.aggregate([
            { $match: { restaurent: rId, customer_phone: { $ne: null } } },
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    en_attente: { $sum: { $cond: [{ $eq: ["$status", "en_attente"] }, 1, 0] } },
                    livres: { $sum: { $cond: [{ $eq: ["$status", "livres"] }, 1, 0] } },
                    annules: { $sum: { $cond: [{ $eq: ["$status", "annules"] }, 1, 0] } },
                    totalCustomers: { $addToSet: "$customer_phone" }
                }
            },
            {
                $project: {
                    _id: 0,
                    total: 1,
                    en_attente: 1,
                    livres: 1,
                    annules: 1,
                    totalCustomers: { $size: "$totalCustomers" }
                }
            }
        ]);

        const result = stats[0] || { total: 0, en_attente: 0, livre: 0, annule: 0, totalCustomers: 0 };
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRevenus = async(req, res) => {
    try {
        const { restaurentId } = req.params;
        const rId = new mongoose.Types.ObjectId(restaurentId);

        const revenus = await Commande.aggregate([
        {
            $match: {
                restaurent: rId,
                payment_status: 'paye'
            }
        },
        {
            $group: {
            _id: {
                $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
            },
            total: { $sum: '$total_amount' }
            }
        },
        { $sort: { _id: 1 } }
        ]);

        res.json(revenus);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.getStatusCommande = async (req, res) => {
    try {
        const { restaurentId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(restaurentId)) {
            return res.status(400).json({
                message: 'ID du restaurent invalide'
            });
        }

        const stats = await Commande.aggregate([
            {
                $match: {
                    restaurent: new mongoose.Types.ObjectId(restaurentId)
                }
            },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    status: '$_id',
                    count: 1
                }
            }
        ]);

        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getMeilleuresVentes = async (req, res) => {
  try {
    const { restaurentId } = req.params;
    const rId = new mongoose.Types.ObjectId(restaurentId);

    const ventes = await Commande.aggregate([
        { $match: { 
                restaurent: rId,
                payment_status: "paye" 
            } 
        },
        { $unwind: '$items' },
        {
            $group: {
                _id: '$items.repas',
                nom: { $first: '$items.name' },
                quantite_vendue: { $sum: '$items.quantite' },
                totalRevenue: { $sum: "$items.total" }
            }
        },
        { $sort: { quantite_vendue: -1 } },
        { $limit: 5 }
    ]);

    res.json(ventes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCommandesRecentes = async (req, res) => {
  try {
    const { restaurentId } = req.params;

    const commandes = await Commande.find({ restaurent: restaurentId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('order_number customer_name total_amount status createdAt');

    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};