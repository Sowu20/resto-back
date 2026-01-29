const mongoose = require('mongoose');

const restaurentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    address: {
        type: String,  
        required: true
    },
    phone: {
        type: Number
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Ouvert', 'Fermé'],
        default: 'Ouvert'
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordonnes: {
            type: [Number]
        }
    },
    password: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

restaurentSchema.index({ location: '2dsphere' });

const Restaurent = mongoose.model('Restaurent', restaurentSchema);

module.exports = Restaurent;