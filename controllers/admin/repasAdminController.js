const cloudinary = require('../../config/cloudinary');
const Repas = require('../../models/Repas');

exports.createRepas = async(req, res) => {
    try {
        const {
            name,
            description,
            price,
            menu,
            categorie,
            isAvaible
        } = req.body;

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

        const repas = Repas.create({
            name,
            description,
            price,
            image: imageUrl,
            menu,
            categorie,
            isAvaible
        });
        return res.status(201).json({
            message: 'Repas enregistré avec succès !',
            repas
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

exports.listRepas = async(req, res) => {
    const repas = await Repas.find()
        .populate('menu', 'name')
        .populate('restaurent', 'nom')
        .populate('categorie', 'name');
    res.json(repas);
};

exports.updateRepas = async (req, res) => {
    try {
        const repas = await Repas.findByIdAndUpdate(
            req.params.id,
            req.body,
        );
        
        if (!repas) {
            return res.status(404).json({
                message: 'Repas introuvable'
            });
        }
        return res.status(200).json({
            message: 'Repas modifié avec succès',
            repas
        });

    } catch (error) {
        return res.status(400).json({
            message: 'ID invalide ou données incorrectes'
        });
    }
};

exports.deleteMenu = async(req, res) => {
    try {
        await Repas.findByIdAndDelete(req.params.id);
        return res.status(202).json({
            message: 'Repas supprimé avec succès !'
        });
    } catch (error) {
        return res.status(400).json({
            message: 'ID invalide'
        });
    }
};

exports.getRepasByCategorie = async (req, res) => {
  try {

    const repas = await Repas.find({
      categorie: req.params.categorieId,
      restaurent: req.user.restaurent
    });

    return res.status(200).json(repas);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};