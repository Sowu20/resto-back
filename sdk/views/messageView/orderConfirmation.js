const { MessageView } = require('@numerum-tech/cmsdk');

/**
 * Crée une vue de confirmation de commande
 * @param {string} customerName - Nom du client
 * @param {string} customerPhone - Numéro de téléphone du client
 * @param {string} orderNumber - Numéro de commande
 */
const createOrderConfirmationView = (customerName, customerPhone, orderNumber) => {
    const homeUrl = 'https://resto-back-xazy.onrender.com/mobile';
    return new MessageView(`order-success-${Date.now()}`, 'Commande Réussie !')
        .setIntro('Paiement confirmé !')
        .setBody(`Merci ${customerName || 'cher client'} !\n\nVotre commande N° ${orderNumber} a été confirmée avec succès.\n\nNous vous contacterons au ${customerPhone || 'votre numéro'} pour la livraison.\n\nBon appétit ! 🍽️`)
        .setSeverity('success')
        .setPrimaryAction('Retour à l\'accueil', 'GET', homeUrl)
        .setDismissible(true);
};

module.exports = { createOrderConfirmationView };
