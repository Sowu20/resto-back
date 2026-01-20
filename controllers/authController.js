const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Restaurent = require('../models/Restaurent');

const secret_key ='0a01fcf7e3084f800565d0bd2d9a69de63b043d3c91274306a40b3df8c03ed05';

exports.register = async(req, res) => {
    try {
        const { name, address, phone, email, role, password } = req.body;

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
            address,
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

exports.registerRestaurent = async(req, res) => {
    try {
        const { name, address, phone, email, password } = req.body;

        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({
                message: "Email déjà utilisé"
            });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            address: address,
            phone,
            email,
            role: 'Restaurateur',
            password: hashedPass
        });

        const restaurent = await Restaurent.create({
            name: name,
            address,
            phone,
            email,
            user: user._id
        });

        return res.status(201).json({
            message: "Restaurent créé avec succès",
            restaurent,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erreur serveur"
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

        const restaurent = await Restaurent.findOne({ user: user._id });

        // Comparer le mot de passe
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            return res.status(400).json({
                message: 'Mot de passe incorrect !'
            });
        }

        // Générer un token
        const token = jwt.sign(
            { 
                id: user._id, 
                role: user.role,
                restaurentId: restaurent ? restaurent._id: null
            },
            secret_key || 'default_secret',
            { expiresIn: "2d" }  
        );

        return res.status(200).json({
            message: 'Connexion réussie !', 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Erreur serveur'
        });
    }
};