const { CardView } = require('@numerum-tech/cmsdk');

/**
 * Crée une vue récapitulative de la commande
 * @param {string} customerName - Nom du client
 * @param {string} customerPhone - Numéro de téléphone
 * @param {string} mealName - Nom du plat
 * @param {string} price - Prix du plat
 * @param {string} restaurantId
 * @param {string} mealId
 */
const createOrderSummaryView = (customerName, customerPhone, mealName, price, restaurantId, mealId) => {
    return new CardView(`order-summary-${Date.now()}`, 'Récapitulatif de commande')
        .setSubtitle('Commande confirmée !')
        .addSection('Informations Client', `👤 Nom : ${customerName}\n📞 Téléphone : ${customerPhone}`)
        .addSection('Détails du plat', `🍽️ Plat : ${mealName}\n💰 Prix : ${price}`)
        .addAction('Retour à la page d\'accueil', 'GET', `/mobile`);
};

module.exports = { createOrderSummaryView };
