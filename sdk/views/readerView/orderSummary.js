const { CardView } = require('@numerum-tech/cmsdk');

/**
 * Crée une vue récapitulative de la commande (CardView)
 * @param {string} customerName - Nom du client
 * @param {string} customerPhone - Numéro de téléphone
 * @param {string} mealName - Nom du plat
 * @param {string} price - Prix du plat
 * @param {string} restaurantId
 * @param {string} mealId
 * @param {string} orderId - ID de la commande créée
 */
const createOrderSummaryView = (customerName, customerPhone, mealName, price, restaurantId, mealId, orderId) => {
    return new CardView('order-summary', 'Résumé de votre commande')
        .setSubtitle('Vérifiez les détails avant de payer')
        .addStat('👤 Client', customerName)
        .addStat('📞 Téléphone', customerPhone)
        .addStat('🍽️ Plat', mealName)
        .addStat('💰 Prix', price)
        .addAction('💳 Procéder au paiement', 'GET', {
            href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/orders/${orderId}/payment`
        })
        .addAction('❌ Annuler', 'GET', {
            href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/repas`
        });
};

module.exports = { createOrderSummaryView };
