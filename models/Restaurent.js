const mongoose = require('mongoose');

const restaurentSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    }, 
    adresse: {
        type: String,  
        required: true
    },
    telephone: {
        type: Number
    },
    email: {
        type: String,
        required: true
    },
    disponibilite: {
        type: String,
        enum: ['ouvert', 'ferme']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Restaurent = mongoose.model('Restaurent', restaurentSchema);

module.exports = Restaurent;