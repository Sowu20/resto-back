const { ReaderView } = require('@numerum-tech/cmsdk');

/**
 * Crée une vue récapitulative de la commande (ReaderView)
 * @param {string} customerName - Nom du client
 * @param {string} customerPhone - Numéro de téléphone
 * @param {string} mealName - Nom du plat
 * @param {string} price - Prix du plat
 * @param {string} restaurantId
 * @param {string} mealId
 */
const createOrderSummaryView = (customerName, customerPhone, mealName, price, restaurantId, mealId) => {
    return new ReaderView(`order-summary-view`, 'Récapitulatif de votre commande')
        .setIntro('✅ Commande confirmée !')
        .addParagraph('Informations Client')
        .addParagraph('Nom : ' + (customerName || 'Non spécifié'))
        .addParagraph('Téléphone : ' + (customerPhone || 'Non spécifié'))
        .addParagraph('Détails du plat')
        .addParagraph('Plat : ' + (mealName || 'Non spécifié'))
        .addParagraph('Prix : ' + (price || 'Non spécifié'))
        .addParagraph('Merci de votre commande. Le restaurant a été notifié et vous contactera si nécessaire.');
};

module.exports = { createOrderSummaryView };
