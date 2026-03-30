const { CardView } = require('@numerum-tech/cmsdk');
const { getOptimizedImageUrl } = require('../../utils/imageUtils');

/**
 * Crée une vue récapitulative de la commande (CardView)
 * @param {string} mealId - ID du repas
 * @param {string} orderId - ID de la commande générée
 * @param {Object|string} tableInfo - Informations sur la table
 * @param {string} mealImage - URL de l'image du plat
 * @param {string} baseUrl - URL de base de l'API
 */
const createOrderSummaryView = (customerName, customerPhone, mealName, price, restaurantId, mealId, orderId, tableInfo, mealImage, baseUrl = 'https://resto-back-xazy.onrender.com', categoryId) => {
    // Si tableInfo est un objet, on extrait le nom ET le numero, sinon on l'utilise tel quel
    let tableDisplay = tableInfo;
    if (typeof tableInfo === 'object') {
        if (tableInfo.nom_table && tableInfo.numero_table) {
            tableDisplay = `Table ${tableInfo.numero_table} - ${tableInfo.nom_table}`;
        } else if (tableInfo.numero_table) {
            tableDisplay = `Table ${tableInfo.numero_table}`;
        } else if (tableInfo.nom_table) {
            tableDisplay = tableInfo.nom_table;
        }
    }

    const tableId = typeof tableInfo === 'object' ? tableInfo._id?.toString() : tableInfo;
    const tablePath = (tableId && tableId !== 'undefined') ? `/table/${tableId}` : '';
    const safeOrderId = orderId || `temp-${Date.now()}`;

    const card = new CardView(`summary-${safeOrderId}`, 'Résumé de votre commande')
        .setSubtitle(mealName || 'Plat')
        .setDescription('Vérifiez les détails de votre commande avant de procéder au paiement.');

    if (mealImage) {
        card.setImage(getOptimizedImageUrl(mealImage, { width: 600 }, baseUrl));
    }

    const categoryPath = categoryId ? `/categories/${categoryId}` : '';

    return card
        .addStat('Client', customerName || 'Anonyme')
        .addStat('Téléphone', customerPhone || '-')
        .addStat('Table', tableDisplay || 'Hors table')
        .addStat('Plat', mealName || 'Plat')
        .addStat('Prix', price || '0 FCFA')
        .addAction('Procéder au paiement', 'GET', {
            href: `${baseUrl}/mobile/restaurents/${restaurantId}${tablePath}${categoryPath}/order/${safeOrderId}/payment`
        })
        .addAction('Annuler', 'GET', {
            href: `${baseUrl}/mobile/restaurents/${restaurantId}${tablePath}${categoryPath}/repas`
        });
};

module.exports = { createOrderSummaryView };
