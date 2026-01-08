const Table = require('../models/Table');
const Menu = require('../models/Menu');
const Repas = require('../models/Repas');
const crypto = require('crypto');

exports.createTable = async(req, res) => {
    try {
        const { numero_table, restaurent } = req.body;
        const qrCode = crypto.randomBytes(16).toString('hex');

        const table = await Table.create({
            numero_table,
            restaurent,
            qrCode
        });

        return res.status(201).json({
            message: "Table créé avec succès !",
            table
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

exports.listTable = async(req, res) => {
    const tables = await Table.find().populate('restaurent', 'nom');
    res.json(tables);
};

exports.detailTable = async(req, res) => {
    try {
        const table = await Table.findById(req.params.id).populate('restaurent', 'nom');
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
        const table = await Table.findByIdAndUpdate(
            req.params.id,
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
        await Table.findByIdAndDelete(req.params.id);
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