const mongoose = require('mongoose');

const repasSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    isAvaible: {
        type: Boolean,
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
    },
    categorie: {
        type: mongoose.Schema.types.ObjectId,
        ref: 'CategorieRepas',
        required: true
    }
});

const Repas = mongoose.model('repasSchema', repasSchema);

module.exports = Repas;