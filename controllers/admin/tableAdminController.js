const Table = require('../../models/Table');
const Menu = require('../../models/Menu');
const Repas = require('../../models/Repas');
const crypto = require('crypto');

exports.createTable = async(req, res) => {
    try {
        const { numero_table, nom_table, capacite, restaurent } = req.body;
        const qrCode = crypto.randomBytes(16).toString('hex');

        const table = await Table.create({
            numero_table,
            nom_tale,
            capacite,
            restaurent,
            qrCode
        });

        const qrLink = `https://demo.city-mate.com/services/696e5f99ed00d4dfdc05a4a8/play?url=https://resto-back-xazy.onrender.com/mobile/${qrCode}/restaurents/${restaurent}/tables/${table._id}`;

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

exports.statsTable = async(req, res) => {
    try {
        const total = await Table.countDocuments();

        const libres = await Table.countDocuments({
            statut: 'libre'
        });

        const occupes = await Table.countDocuments({
            statut: 'occupe'
        });

        const reserve = await Table.countDocuments({
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
}