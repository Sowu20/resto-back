const mongoose = require('mongoose');

const cmdeSchema = new mongoose.Schema({
    quantite: {
        type: Number
    },
    statut: {
        type: String,
        enum: ['en_attente', 'en_cours', 'termine']
    },
    total_commande: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurent',
        required: true
    },
    repas: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Repas',
        required: true
    }
});

const Commande = mongoose.model('Commande', cmdeSchema);

module.exports = Commande;