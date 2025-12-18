const mongoose = require('mongoose');

const notifSchema = new mongoose.Schema({
    titre: {
        trype: String
    },
    contenu: {
        type: String
    },
    lue: {
        type: Boolean
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Notification = mongoose.model('Notification', notifSchema);

module.exports = Notification;