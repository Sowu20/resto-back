const mongoose = require('mongoose');

const payementSchema = new mongoose.Schema({
    methode: {
        type: String
    },
    statut: {
        type: String,
        enum: ['en_cours', 'en_attente', 'termine']
    },
    montant: {
        type: Number
    },
    commande: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Commande',
        required: true
    }
});

const Payement = mongoose('Payement', payementSchema);

module.exports = Payement;