const mongoose = require('mongoose');

const offSpeSchema = new mongoose.Schema({
    titre_offre: {
        type: String
    },
    description: {
        type: String
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

const OffreSpeciale = mongoose.model('OffreSpeciale', offSpeSchema);

module.exports = OffreSpeciale;