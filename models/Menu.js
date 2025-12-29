const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    isActive: {
        type: Boolean
    },
    isDefault: {
        type: Boolean
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    validDays: {
        type: String,
        enum: ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"],
        required: true
    },
    restaurent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurent',
        required: true
    },
}, { timestamps: true });

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;