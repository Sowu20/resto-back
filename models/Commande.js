const mongoose = require('mongoose');

const cmdeSchema = new mongoose.Schema({
    
});

const Commande = mongoose.model('Commande', cmdeSchema);

module.exports = Commande;