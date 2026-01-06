const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    numero_table: {
        type: Number,
        required: true
    },
    qrCode: {
        type: String,
        required: true,
        unique: true
    },
    statut: {
        type: String,
        enum: ['libre', 'occupe'],
        default: 'libre'
    },
    restaurent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurent',
        required: true
    }
}, { timestamps: true });

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;