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

exports.getStats = async(req, res) => {
    try {
        const { restaurentId } = req.params;

        const totalCommande = await Commande.countDocuments({
            restaurent: restaurentId
        });

        const totalVente = await Commande.aggregate([
            { $match: { restaurent: restaurentId, payment_status: 'paye' } },
            { $group: { _id: null, total: { $sum: '$total_amount' } } }
        ])

        const commandeMoyenne = await Commande.aggregate([
            { $match: { restaurent: restaurentId, payment_status: 'paye' } },
            { $group: { _id: null, avg: { $avg: '$total_amount' } } }
        ]);

        const clients = await Commande.distinct('customer_phone', {
            restaurent: restaurentId
        });

        res.json({
           total_commandes: totalCommande,
           chiffre_affaires: totalVente[0]?.total || 0,
           panier_moyenne: commandeMoyenne[0]?.avg || 0,
           clients: clients.length
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
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

exports.getStatusCommande = async(req, res) => {
    try {
        const { restaurentId } = req.params;

        const stats = await Commande.aggregate([
            { $match: { 
                restaurent: new mongoose.Types.ObjectId(restaurentId)
             } 
            },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json(stats);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

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