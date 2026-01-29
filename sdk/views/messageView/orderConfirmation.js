const { MessageView } = require('@numerum-tech/cmsdk');

/**
 * Crée une vue de confirmation de commande
 * @param {string} customerName - Nom du client
 * @param {string} customerPhone - Numéro de téléphone du client
 */
const createOrderConfirmationView = (customerName, customerPhone) => {
    //l'URL de redirection
    const homeUrl = 'https://resto-back-xazy.onrender.com/mobile';
    return new MessageView(`order-success-${Date.now()}`, 'Commande Réussie !')
        .setIntro('Succès !')
        .setBody(`Merci ${customerName || 'cher client'} ! Votre commande a été reçue. Nous vous contacterons au ${customerPhone || 'votre numéro'} si besoin.`)
        .setSeverity('success')
        .setPrimaryAction('OK, merci', 'GET', homeUrl)
        .setDismissible(true);
};

module.exports = { createOrderConfirmationView };
