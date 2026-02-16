const { default: mongoose } = require('mongoose');
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
            source: 'qr_code',
            payment_status: 'en_attente',
            table: tableId,
            restaurent: restaurentId
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

exports.getStats = async (req, res) => {
    try {
        const { restaurentId } = req.params;
        const rId = new mongoose.Types.ObjectId(restaurentId);

        const stats = await Commande.aggregate([
            { $match: { restaurent: rId } },
            {
                $group: {
                    total: { $sum: 1 },
                    en_attente: { $sum: { $cond: [{ $eq: ["$status", "en_attente"] }, 1, 0] } },
                    livres: { $sum: { $cond: [{ $eq: ["$status", "livres"] }, 1, 0] } },
                    annules: { $sum: { $cond: [{ $eq: ["$status", "annules"] }, 1, 0] } }
                }
            }
        ]);

        const result = stats[0] || { total: 0, en_attente: 0, livre: 0, annule: 0 };
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRevenus = async(req, res) => {
    try {
        const { restaurentId } = req.params;

        const revenus = await Commande.aggregate([
        {
            $match: {
                restaurent: restaurentId,
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

    const ventes = await Commande.aggregate([
      { $match: { restaurent: restaurentId } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.repas',
          nom: { $first: '$items.nom_repas' },
          quantite_vendue: { $sum: '$items.quantite' }
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