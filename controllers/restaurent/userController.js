const User = require('../../models/User');
const bcrypt = require('bcryptjs');

exports.listUser = async(req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
};

exports.detailUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({
                message: 'Utilisateur introuvable'
            });
        }
        res.json(user);
    } catch (error) {
        return res.status(400).json({
            message: "ID de l'utilisateur invalide"
        });
    }
}

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = { ...req.body };

    if (data.role && req.user.role !== 'Admin') {
      return res.status(403).json({
        message: "Vous n'êtes pas autorisé à modifier le rôle"
      });
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      data,
      { new: true }
    ).select('-password'); 
    if (!user) {
      return res.status(404).json({
        message: 'Utilisateur introuvable !'
      });
    }

    return res.status(200).json({
      message: 'Utilisateur modifié avec succès',
      user
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "ID de l'utilisateur invalide !"
    });
  }
};

exports.deleteUser = async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(201).json({
            message: 'Utilisateur supprimé avec succès :'
        });
    } catch (error) {
        return res.status(400).json({
            message: "ID de l'utilisateur invalide !"
        });
    }
};

exports.changePassword = async(req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: 'Veuillez remplir tous les champs avant de continuer !'
      });
    }

    if (newPassword != confirmPassword) {
      return res.status(400).json({
        message: 'Les nouveaux mots de passe ne correspondent pas !'
      });
    }

    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Mot de passe actuel incorrect !'
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({
      message: 'Mot de passe modifié avec succès'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};