const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async(req, res) => {
    try {
        const { name, adress, phone, email, role, password } = req.body;

        // Vérifier si l'utilisateur existe
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({
                message: 'Email déjà utilisé'
            });
        }   

        // Chiffré le mot de passe
        const hashedPass = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            adress,
            phone,
            email,
            role,
            password: hashedPass
        });

        return res.status(201).json({
            message: 'Utilisateur créé avec succès',
            user
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Erreur Serveur !",
            error: error.message
        });
    }
};

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'Utilisateur non trouvé'
            });
        }

        // Comparer le mot de passe
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            return res.status(400).json({
                message: 'Mot de passe incorrect !'
            });
        }

        // Générer un token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: "2d" }  
        );

        return res.status(200).json({
            message: 'Connexion réussie !', token
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Erreur serveur'
        });
    }
};