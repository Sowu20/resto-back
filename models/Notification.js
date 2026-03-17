const mongoose = require('mongoose');

const notifSchema = new mongoose.Schema({
    titre: {
        type: String
    },
    contenu: {
        type: String
    },
    type: {
        type: String,
        enum: ['commande', 'statut', 'promotion', 'systeme'],
        default: 'systeme'
    },
    lue: {
        type: Boolean
    },
    status: {
        type: String,
        enum: ['envoye', 'en_attente', 'echec'],
        default: 'en_attente'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notifSchema);

module.exports = Notification;