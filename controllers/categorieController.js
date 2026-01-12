const Categorie = require('../models/CategorieRepas');

exports.createCategorie = async(req, res) => {
    try {
        const categorie = await Categorie.create(req.body);
        return res.status(201).json({
            message: 'Catégorie enregistré avec succès !',
            categorie
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

exports.listCategorie = async(req, res) => {
    const categories = await Categorie
        .find()
        .populate('resturent', 'nom')
        .populate('menu', 'name')
        .populate('commande', 'customer_name');
    res.json(categories);
};

exports.detailCategorie = async(req, res) => {
    try {
        const categorie = await Categorie.findById(req.params.id)
            .populate('resturent', 'nom')
            .populate('menu', 'name')
            .populate('commande', 'customer_name');
        if (!categorie) {
            return res.status(404).json({
                message: 'Categorie introuvable'
            });
        }
        res.json(categorie);
    } catch (error) {
        return res.status(400).json({
            message: 'ID invalide !'
        });
    }
};

exports.updateCategorie = async(req, res) => {
    try {
        const categorie = await Categorie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!categorie) {
            return res.status(404).json({
                message: 'Catégorie introuvable !'
            });
        };
        return res.status(201).json({
            message: 'Catégorie modifié avec succès',
            categorie
        });
    } catch (error) {
        return res.status(404).json({
            message: 'ID invalide'
        });
    }
};

exports.deleteCategorie = async(req, res) => {
    try {
        await Categorie.findByIdAndDelete(req.params.id);
        return res.status(202).json({
            message: 'Menu supprimé avec succès !'
        });
    } catch (error) {
        return res.status(400).json({
            message: 'ID invalide'
        });
    }
};