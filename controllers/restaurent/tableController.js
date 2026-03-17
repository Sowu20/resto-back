const Table = require('../../models/Table');
const Menu = require('../../models/Menu');
const Repas = require('../../models/Repas');
const crypto = require('crypto');

exports.createTable = async(req, res) => {
    try {
        const { restaurentId } = req.params;
        const { numero_table, nom_table, capacite } = req.body;
        
        const qrCode = crypto.randomBytes(16).toString('hex'); 

        const table = await Table.create({
            numero_table,
            nom_table,
            capacite,
            restaurent: restaurentId,
            qrCode
        });

        const backendUrl = `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurentId}?table=${table._id}`;
        const qrLink = `https://demo.city-mate.com/services/696e5f99ed00d4dfdc05a4a8/play?url=${encodeURIComponent(backendUrl)}&title=zamora`;

        table.qrLink = qrLink;
        await table.save();
        return res.status(201).json({
            message: "Table créé avec succès !",
            table,
            qrLink
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

exports.listTable = async(req, res) => {
    const { restaurentId } = req.params;
    const tables = await Table.find({
        restaurent: restaurentId
    })
        .sort({ numero_table: 1 });
    res.json(tables);
};

exports.detailTable = async(req, res) => {
    try {
        const { id, restaurentId } = req.params;
        const table = await Table.findOne({
            _id: id,
            restaurentId
        });
        if (!table) {
            return res.status(404).json({
                message: 'Table introuvable'
            });
        };
        res.json(table);
    } catch (error) {
        return res.status(400).json({
            message: "ID de la table invalide !"
        });
    }
};

exports.updateTable = async(req, res) => {
    try {
        const { id, restaurentId } = req.params;

        // Empêcher la modification du qrCode
        delete req.body.qrCode;

        const table = await Table.findOneAndUpdate(
            {
                _id: id,
                restaurent: restaurentId    
            },
            req.body,
            { new: true }
        )
        if (!table) {
            return res.status(404).json({
                message: 'Table introuvable !'
            });
        }
        return res.status(201).json({
            message: 'Table modifié avec succès',
            table
        });
    } catch (error) {
        return res.status(400).json({
            message: "ID de la table invalide !"
        });
    }
};

exports.deleteTable = async(req, res) => {
    try {
        const { restaurentId } = req.params;
        await Table.findOneAndDelete({
            restaurent: restaurentId
        });
        return res.status(201).json({
            message: 'Table supprimé avec succès'
        });
    } catch (error) {
        return res.status(400).json({
            message: "ID de la table invalide !"
        });
    }
}

exports.scanQrCode = async (req, res) => {
    try {
        const table = await Table.findOne({ qrCode: req.params.qrCode }).populate('restaurent', 'nom');
        if (!table) {
            return res.status(404).json({
                message: 'QR Code invalide'
            });
        }
        res.json({
            // tableId: table._id,
            numero_table: table.numero_table,
            restaurentId: table.restaurent._id,
            restaurent: table.restaurent.nom,
            statut: table.statut
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.getMenuandMeal = async(req, res) => {
    try {
        const { qrCode, restaurentId } = req.params;

        const table = await Table.findOne({ qrCode })
        if(!table) {
            return res.status(404).json({
                message: 'QR Code invalide'
            });
        }

        if (table.restaurent.toString() !== restaurentId) {
            return res.status(403).json({
                message: 'Cette table ne correspond pas à ce restaurent'
            });
        }

        const menus = await Menu.find({
            restaurent: table.restaurent,
            isActive: true
        })
        .select('_id name description validDays');

        const menusWithRepas = await Promise.all(
            menus.map(async (menu) => {
                const repas = await Repas.find({
                    menu: menu._id,
                    isAvaible: true
                })
                .select('_id name description price categorie')
                .populate('categorie', 'name');

                return {
                    menu,
                    repas
                };
            })
        );

        res.json({
            tableId: table._id,
            numero_table: table.numero_table,
            // restaurentId,
            menus: menusWithRepas
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.statsTable = async(req, res) => {
    try {
        const { restaurentId } = req.params;
        const total = await Table.countDocuments({ 
            restaurent: restaurentId 
        });

        const libres = await Table.countDocuments({
            restaurent: restaurentId,
            statut: 'libre'
        });

        const occupes = await Table.countDocuments({
            restaurent: restaurentId,
            statut: 'occupe'
        });

        const reserve = await Table.countDocuments({
            restaurent: restaurentId,
            statut: 'reserve'
        });

        res.status(200).json({
            total,
            libres,
            occupes,
            reserve
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.searchTable = async(req, res) => {
    try {
        const { restaurentId } = req.params;
        const { q } = req.query;

        const tables = await Table.find({
            restaurent: restaurentId,
            $or: [
                { numero_table: Number(q) || 0 },
                { nom_table: { $regex: q, $options: 'i' } }
            ]
        });

        res.status(200).json(tables);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}