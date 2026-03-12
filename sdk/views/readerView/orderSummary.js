const { CardView } = require('@numerum-tech/cmsdk');

/**
 * Crée une vue récapitulative de la commande (CardView)
 * ...
 */
const createOrderSummaryView = (customerName, customerPhone, mealName, price, restaurantId, mealId, orderId) => {
    return new CardView(`summary-${orderId}`, 'Résumé de votre commande')
        .setSubtitle(mealName)
        .setDescription('Vérifiez les détails de votre commande avant de procéder au paiement.')
        .addStat('Client', customerName)
        .addStat('Téléphone', customerPhone)
        .addStat('Plat', mealName)
        .addStat('Prix', price)
        .addAction('Procéder au paiement', 'GET', {
            href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/orders/${orderId}/preview/payment`
        })
        .addAction('Annuler', 'GET', {
            href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/repas`
        });
};

module.exports = { createOrderSummaryView };
