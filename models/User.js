const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['Restaurateur', 'Admin'],
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true }); 

const User = mongoose.model('User', userSchema);

module.exports = User;