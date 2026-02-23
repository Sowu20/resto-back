const cloudinary = require('../config/cloudinary');
const Restaurent = require('../models/Restaurent');
const Menu = require('../models/Menu');
const Repas = require('../models/Repas');

exports.uploadImage = async (req, res) => {
  try {
    const { type, id } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Aucune image fournie" });
    }

    // Upload vers Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: type }, // Dossier correspondant au type
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const imageUrl = result.secure_url;

    let doc;

    switch (type) {
      case "repas":
        doc = await Repas.findByIdAndUpdate(
          id,
          { image: imageUrl },
          { new: true }
        );
        break;
      case "restaurent":
        doc = await Restaurent.findByIdAndUpdate(
          id,
          { image: imageUrl },
          { new: true }
        );
        break;
      case "menu":
        doc = await Menu.findByIdAndUpdate(
          id,
          { image: imageUrl },
          { new: true }
        );
        break;
      default:
        return res.status(400).json({ message: "Type invalide" });
    }

    if (!doc) {
      return res.status(404).json({ message: `${type} non trouvé` });
    }

    return res.status(200).json({
      message: `Image uploadée pour ${type}`,
      data: doc
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};