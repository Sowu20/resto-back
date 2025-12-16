const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    categorie: {
        type: String,
        enum: ['entrée', 'plats', 'déssert'],
        required: true
    },
    description: {
        type: String
    },
    restaurent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurent',
        required: true
    },
}, { timestamps: true });

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;