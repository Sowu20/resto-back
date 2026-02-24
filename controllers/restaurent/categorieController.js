const Categorie = require('../../models/CategorieRepas');

exports.createCategorie = async(req, res) => {
    try {
        const { restaurentId } = req.params;
        const { name, description, isActive } = req.body;
        const categorie = await Categorie.create({
            name,
            description,
            isActive,
            restaurent: restaurentId
        });
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
    try {
        const categories = await Categorie
        .find({
            restaurent: req.params.restaurentId
        }).sort({ createdAt: -1 })
        .populate('restaurent', 'nom');

        res.json(categories);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.detailCategorie = async(req, res) => {
    try {
        const categorie = await Categorie.findById(req.params.id)
            .populate('resturent', 'nom');
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
        const { id, restaurentId } = req.params;
        const categorie = await Categorie.findOneAndUpdate(
            {
                _id: id,
                restaurent: restaurentId  
            },
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
        const { id, restaurentId } = req.params;
        await Categorie.findOneAndDelete({
            _id: id,
            restaurent: restaurentId
        });
        return res.status(202).json({
            message: 'Menu supprimé avec succès !'
        });
    } catch (error) {
        return res.status(400).json({
            message: 'ID invalide'
        });
    }
};

exports.getCategorieMenu = async(req, res) => {
    try {
        const { restaurentId, menuId } = req.params;
        const categories = await Categorie.find({
            menu: menuId,
            restaurent: restaurentId
        });

        return res.status(200).json(
            categories
        );
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}