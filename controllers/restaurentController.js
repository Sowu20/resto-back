const Restaurent = require('../models/Restaurent');

exports.createResto = async(req, res) => {
    try {
        const {
            nom,
            adresse,
            telephone,
            email,
            disponibilite,
            latitude,
            longitude
        } = req.body;

        if (!latitude || !longitude) {
            return res.status(400).json({
                message: 'Les champs latitude et longitude sont obligatoires !'
            });
        }

        const resto = await Restaurent.create({
            nom,
            adresse,
            telephone,
            email,
            disponibilite,
            location: {
                type: 'Point',
                coordonnes: [longitude, latitude]
            },
            user: req.userId
        });
        return res.status(201).json({
            message: 'Restaurent enregistré avec succès',
            resto
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

exports.listResto = async(req, res) => {
    const resto = await Restaurent.find().populate('user');
    res.json(resto);
}

exports.detailResto = async(req, res) => {
    try {
        const resto = await Restaurent.findById(req.params.id).populate('user');
        if (!resto) {
            return res.status(404).json({
                message: 'Restaurent introuvable !'
            });
        }
        res.json(resto);
    } catch (error) {
        return res.status(400).json({
            message: "ID de l'utilisateur invalide !"
        });
    }
}

exports.updateResto = async(req, res) => {
    try {
        const resto = await Restaurent.findByIdAndDelete(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!resto) {
            return res.status(404).json({
                message: 'Restaurent introuvable !'
            });
        }
        return res.status(202).json({
            message: 'Restaurent modifié avec succès',
            resto
        });
    } catch (error) {
        return res.status(400).json({
            message: "ID de l'utilisateur invalide !"
        });   
    }
};

exports.deleteResto = async(req, res) => {
    try {
        await Restaurent.findByIdAndDelete(req.params.id);
        return res.status(201).json({
            message: 'Restaurent supprimé avec succès :'
        });
    } catch (error) {
        return res.status(400).json({
            message: "ID de l'utilisateur invalide !"
        });
    }
}