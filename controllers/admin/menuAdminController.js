const cloudinary = require('../../config/cloudinary');
const Menu = require('../../models/Menu');

exports.createMenu = async(req, res) => {
    try {
        const {
            name,
            description,
            startTime,
            endTime,
            validDays,
            isActive,
            isDefault
        } = req.body;

        let imageUrl = "";
        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "menu" },
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

        const menu = await Menu.create({
            name,
            description,
            startTime,
            endTime,
            validDays,
            isActive,
            isDefault,
            image: imageUrl
        });
        return res.status(201).json({
            message: 'Menu enregistré avec succès !',
            menu
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

exports.listMenu = async(req, res) => {
    const menu = await Menu.find();
    res.json(menu);
};

exports.detailMenu = async(req, res) => {
    try {
        const menu = await Menu.findById(req.params.id).populate('restaurent');
        if (!menu) {
            return res.status(404).json({
                message: 'Menu introuvable'
            });
        }
        res.json(menu);
    } catch (error) {
        return res.sttus(400).json({
            message: 'ID invalide !'
        });
    }
};

exports.updateMenu = async(req, res) => {
    try {
        const menu = await Menu.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!menu) {
            return res.status(404).json({
                message: 'Menu introuvable !'
            });
        };
        return res.status(201).json({
            message: 'Menu modifié avec succès',
            menu
        });
    } catch (error) {
        return res.status(404).json({
            message: 'ID invalide'
        });
    }
};

exports.deleteMenu = async(req, res) => {
    try {
        await Menu.findByIdAndDelete(req.params.id);
        return res.status(202).json({
            message: 'Menu supprimé avec succès !'
        });
    } catch (error) {
        return res.status(400).json({
            message: 'ID invalide'
        });
    }
};