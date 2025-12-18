const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
    titre_promo: {
        type: String
    },
    date_debut: {
        type: Date
    },
    date_fin: {
        type: Date
    },
    description: {
        type: String
    },
    pourcentage_reduction: {
        type: Number
    },
    restaurent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurent',
        required: true
    }
});

const Promotion = mongoose.model('Promotion', promoSchema);

module.exports = Promotion;