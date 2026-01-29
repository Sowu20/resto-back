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
    return new ReaderView(`order-summary-${Date.now()}`, 'Récapitulatif de commande')
        .setIntro('✅ Commande confirmée !')
        .addSubTitle('Informations Client')
        .addListField([
            `Nom : ${customerName}`,
            `Téléphone : ${customerPhone}`
        ])
        .addSeparator()
        .addSubTitle('Détails du plat')
        .addListField([
            `Plat : ${mealName}`,
            `Prix : ${price}`
        ])
        .addParagraph('Merci de votre commande. Le restaurant a été notifié et vous contactera si nécessaire.')
        // Utilisation de setNext pour le bouton "Continuer" qui retourne à l'accueil
        .setNext('/mobile');
};

module.exports = { createOrderSummaryView };
