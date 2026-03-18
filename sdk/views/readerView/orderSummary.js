const { CardView } = require('@numerum-tech/cmsdk');

/**
 * Crée une vue récapitulative de la commande (CardView)
 * ...
 */
const createOrderSummaryView = (customerName, customerPhone, mealName, price, restaurantId, mealId, orderId, tableInfo, baseUrl = 'https://resto-back-xazy.onrender.com') => {
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

    return new CardView(`summary-${safeOrderId}`, 'Résumé de votre commande')
        .setSubtitle(mealName || 'Plat')
        .setDescription('Vérifiez les détails de votre commande avant de procéder au paiement.')
        .addStat('Client', customerName || 'Anonyme')
        .addStat('Téléphone', customerPhone || '-')
        .addStat('Table', tableDisplay || 'Hors table')
        .addStat('Plat', mealName || 'Plat')
        .addStat('Prix', price || '0 FCFA')
        .addAction('Procéder au paiement', 'GET', {
            href: `${baseUrl}/mobile/restaurents/${restaurantId}${tablePath}/order/${safeOrderId}/payment`
        })
        .addAction('Annuler', 'GET', {
            href: `${baseUrl}/mobile/restaurents/${restaurantId}${tablePath}/repas`
        });
};

module.exports = { createOrderSummaryView };
