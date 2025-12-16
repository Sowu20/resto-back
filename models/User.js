const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        unique: true
    },
    prenom: {
        type: String,
        required: true,
        unique: true   
    },
    adresse: {
        type: String,
        required: true
    },
    telephone: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enume: ['admin', 'restaurateur', 'client'],
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        reqquire: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;