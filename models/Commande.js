const mongoose = require('mongoose');

const cmdeSchema = new mongoose.Schema({
    order_number: {
        type: String,
        unique: true
    },
    customer_name: {
        type: String
    },
    customer_phone: {
        type: String
    },
    items: [
        {
            repas: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Repas',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                require: true
            },
            quantite: {
                type: Number,
                required: true
            },
            total: {
                type: Number,
                required: true
            }
        }
    ],
    status: {
        type: String,
        enum: ['en_attente', 'livres', 'annules']
    },
    payment_status: {
        type: String,
        enum: ['en_attente', 'en_traitement', 'paye', 'non_paye']
    },
    payment_method: {
        type: String,
        enum: ['espece', 'virement', 'tmoney', 'flooz']
    },
    source: {
        type: String
    },
    total_amount: {
        type: Number,
    },
    restaurent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurent',
        required: true
    },
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
        required: true
    }
}, { timestamps: true });

const Commande = mongoose.model('Commande', cmdeSchema);

module.exports = Commande;