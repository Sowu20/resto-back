const Restaurent = require('../../models/Restaurent');
const User = require('../../models/User');
const cloudinary = require('../../config/cloudinary');

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

        // Eviter qu'un utilisateur crée un restaurent
        if (req.user.role !== 'Restaurateur') {
            return res.status(403).json({
                message: 'Seul un restaurateur peut créer un restaurent'
            });
        }

        // Eviter la création de plusieurs restaurents
        if (req.user.restaurentId) {
            return res.status(400).json({
                message: 'Vous avez déjà créé un restaurent !'
            });
        }

        if (!latitude || !longitude) {
            return res.status(400).json({
                message: 'Les champs latitude et longitude sont obligatoires !'
            });
        }

        let imageUrl = "";
        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "restaurent" },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
                stream.end(req.file.bluffer);
            });
            imageUrl = result.secure_url;
        }

        const resto = await Restaurent.create({
            nom,
            adresse,
            telephone,
            email,
            disponibilite,
            image: imageUrl,
            location: {
                type: 'Point',
                coordonnes: [longitude, latitude]
            },
            user: req.user.id
        });
        // Attribuer le restaurent au restaurateur
        await User.findByIdAndUpdate(req.user.id, {
            restaurentId: resto._id
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
};

exports.updateResto = async(req, res) => {
    try {
        const resto = await Restaurent.findByIdAndUpdate(
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
};

exports.getRestaurentsLoc = async(req, res) => {
    try {
        const { latitude, longitude, distance = 3000 } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({
                message: 'La latitude et la longitude sont requises'
            });
        }

        const restaurents = await Restaurent.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordonnes: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: parseInt(distance)
                }
            }
        });

        return res.json({
            total: restaurents.length,
            restaurents
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.getRestaurentStats = async(req, res) => {
    try {
        const total = await Restaurent.countDocuments();
        const ouverts = await Restaurent.countDocuments({
            disponibilite: 'ouvert'
        });
        const ferme = await Restaurent.countDocuments({
            disponibilite: 'ferme'
        });

        res.status(200).json({
            total,
            ouverts,
            ferme
        });
    } catch (error) {
        return res(500).json({
            message: error.message
        });
    }
};

exports.getRestaurents = async(req, res) => {
    try {
        const restaurents = await Restaurent.find()
            .populate('user', 'name email phone')
            .sort({ createdAt: -1 });

        res.json(200).json({
            restaurents
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.getStatusRestaurents = async (req, res) => {
    try {
        let { status } = req.query;

        const allowedStatus = ['Ouvert', 'Fermé'];

        const filter = {};

        if (status && allowedStatus.includes(status.toLowerCase())) {
            filter.status = status.toLowerCase();
        }

        const restaurents = await Restaurent.find(filter)
            .populate('user', 'name email');

        res.status(200).json(restaurents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchRestaurent = async (req, res) => {
    try {
        const { restaurent } = req.query;

        const restaurents = await Restaurent.find({
            $or: [
                { name: { $regex: restaurent, $options: 'i' } },
                { email: { $regex: restaurent, $options: 'i' } },
                { address: { $regex: restaurent, $options: 'i' } }
            ]
        });

        res.status(200).json(restaurents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};