const cloudinary = require('../../config/cloudinary');
const Repas = require('../../models/Repas');

exports.createRepas = async(req, res) => {
    try {
        const { restaurentId } = req.params;
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
                    { folder: "repas" },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
                stream.end(req.file.buffer);
            });
            imageUrl = result.secure_url;
        }

        const repas = await Repas.create({
            name,
            description,
            price,
            image: imageUrl,
            menu,
            categorie,
            isAvaible,
            restaurent: restaurentId
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
    try {
        const repas = await Repas.find({
            restaurent: req.params.restaurentId
        }).sort({ createdAt: -1 })
        .populate('menu', 'name')
        .populate('restaurent', 'nom')
        .populate('categorie', 'name');

        res.json(repas);
    } catch (error) {
        return res.status(error).json({
            message: error.message
        });
    }
};

exports.detailRepas = async(req, res) => {
    try {
        const repas = await Repas.findById(req.params.id)
            .populate('menu', 'name')
            .populate('restaurent', 'nom')
            .populate('categorie', 'name');
        if (!repas) {
            return res.status(404).json({
                message: 'Repas introuvable'
            });
        }
        res.json(repas);
    } catch (error) {
        return res.status(400).json({
            message: 'ID invalide !'
        });
    }
};

exports.updateRepas = async (req, res) => {
    try {
        const { id, restaurentId } = req.params;
        const repas = await Repas.findOneAndUpdate(
            {
                _id: id,
                restaurent: restaurentId  
            },
            req.body,
            { new: true }
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
        const { id, restaurentId } = req.params
        await Repas.findOneAndDelete({
            _id: id,
            restaurent: restaurentId
        });
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
    const { restaurentId, categorieId } = req.params;
    const repas = await Repas.find({
      categorie: categorieId,
      restaurent: restaurentId
    });

    return res.status(200).json(repas);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};