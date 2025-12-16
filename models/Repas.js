const mongoose = require('mongoose');

const repasSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    disponibilite: {
        type: String,
        enum: ['disponible', 'non disponible'],
        required: true
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
    },
    restaurent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurent',
        required: true
    }
});

const Repas = mongoose('repsSchema', repasSchema);

module.exports = Repas;