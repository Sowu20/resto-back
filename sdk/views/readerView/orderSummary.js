const { ReaderView } = require('@numerum-tech/cmsdk');

/**
 * Crée une vue récapitulative de la commande (ReaderView)
 * @param {string} customerName - Nom du client
 * @param {string} customerPhone - Numéro de téléphone
 * @param {string} mealName - Nom du plat
 * @param {string} price - Prix du plat
 * @param {string} restaurantId
 * @param {string} mealId
 * @param {string} orderId - ID de la commande créée
 */
const createOrderSummaryView = (customerName, customerPhone, mealName, price, restaurantId, mealId, orderId) => {
    return new ReaderView('order-summary', 'Résumé de votre commande')
        .setIntro('Vérifiez les détails de votre commande avant de procéder au paiement.')
        .addParagraph(`👤 Client : ${customerName}`)
        .addParagraph(`📞 Téléphone : ${customerPhone}`)
        .addParagraph(`🍽️ Plat : ${mealName}`)
        .addParagraph(`💰 Prix : ${price}`)
        .addLink(
            `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/orders/${orderId}/payment`,
            '💳 Procéder au paiement'
        )
        .addLink(
            `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/repas`,
            '❌ Annuler'
        );
};

module.exports = { createOrderSummaryView };
