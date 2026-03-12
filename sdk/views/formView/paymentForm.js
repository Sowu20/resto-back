const { CardView } = require('@numerum-tech/cmsdk');

/**
 * Crée l'interface de paiement pour une commande
 * @param {Object} order - Document de commande depuis MongoDB
 * @param {string} restaurantId - ID du restaurant pour la navigation
 */
const createPaymentView = (order, restaurantId) => {
    const paymentMethodLabel = {
        'tmoney': 'T-Money',
        'flooz': 'Flooz',
        'espece': 'Espèces'
    };

    return new CardView(`payment-${order._id}`, 'Finaliser le paiement')
        .setSubtitle(`Commande N° ${order.order_number}`)
        .setDescription('Confirmez votre paiement pour valider la commande.')
        .addStat('Montant total', `${order.total_amount} FCFA`)
        .addStat('Méthode', paymentMethodLabel[order.payment_method] || order.payment_method)
        .addStat('Client', order.customer_name)
        .addStat('Téléphone', order.customer_phone)
        .addAction('Confirmer le paiement', 'POST', {
            href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/orders/${order._id}/preview/payment/confirm-payment`
        })
        .addAction('Annuler', 'GET', {
            href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/repas`
        });
};

module.exports = { createPaymentView };
