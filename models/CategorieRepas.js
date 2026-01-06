const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    isActive: {
        type: Boolean
    },
    resturent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurent',
        required: true
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
    },
    commande: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Commande',
        required: true
    }
});

const categorieRepas = mongoose.model('Categorie', catSchema);

module.exports = categorieRepas;