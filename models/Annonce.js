const mongoose = require('mongoose');

const annonceSchema = new mongoose.Schema({
    titre: {
        type: String
    },
    description: {
        type: String
    }
}, { timestamps: true });

const Annonce = mongoose.model('Annonce', annonceSchema);

module.exports = Annonce;