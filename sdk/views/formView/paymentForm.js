const { CardView } = require('@numerum-tech/cmsdk');
const { getOptimizedImageUrl } = require('../../utils/imageUtils');

/**
 * Crée l'interface de paiement pour une commande
 * @param {Object} order - Document de commande depuis MongoDB
 * @param {string} restaurantId - ID du restaurant pour la navigation
 */
const createPaymentView = (order, restaurantId, tableId, baseUrl = 'https://resto-back-xazy.onrender.com') => {
    const paymentMethodLabel = {
        'tmoney': 'T-Money',
        'flooz': 'Flooz',
        'espece': 'Espèces'
    };

    const card = new CardView(`payment-${order._id}`, 'Finaliser le paiement')
        .setSubtitle(`Commande N° ${order.order_number || '...'}`)
        .setDescription('Confirmez votre paiement pour valider la commande.');

    // Ajouter l'image du premier article si elle existe
    if (order.items && order.items.length > 0 && order.items[0].image) {
        card.setImage(getOptimizedImageUrl(order.items[0].image, { width: 600 }, baseUrl));
    }

    return card
        .addStat('Montant total', `${order.total_amount || 0} FCFA`)
        .addStat('Méthode', paymentMethodLabel[order.payment_method] || order.payment_method || '-')
        .addStat('Client', order.customer_name || 'Anonyme')
        .addStat('Téléphone', order.customer_phone || '-')
        .addAction('Confirmer le paiement', 'POST', {
            href: `${baseUrl}/mobile/restaurents/${restaurantId}${tableId ? `/table/${tableId}` : ''}/order/${order._id}/payment/confirm`
        })
        .addAction('Annuler', 'GET', {
            href: `${baseUrl}/mobile/restaurents/${restaurantId}${tableId ? `/table/${tableId}` : ''}/repas`
        });
};

module.exports = { createPaymentView };
