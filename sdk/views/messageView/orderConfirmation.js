const { MessageView } = require('@numerum-tech/cmsdk');

/**
 * Crée une vue de confirmation de commande
 * @param {string} customerName - Nom du client
 * @param {string} customerPhone - Numéro de téléphone du client
 * @param {string} orderNumber - Numéro de commande
 */
const createOrderConfirmationView = (customerName, customerPhone, orderNumber, tableInfo) => {
    const homeUrl = 'https://resto-back-xazy.onrender.com/mobile';

    // Si tableInfo est un objet, on extrait le nom ET le numero, sinon on gère le cas indéfini
    let tableDisplay = '';
    if (tableInfo) {
        if (typeof tableInfo === 'object') {
            if (tableInfo.nom_table && tableInfo.numero_table) {
                tableDisplay = `(Table ${tableInfo.numero_table} - ${tableInfo.nom_table})`;
            } else if (tableInfo.numero_table) {
                tableDisplay = `(Table ${tableInfo.numero_table})`;
            } else if (tableInfo.nom_table) {
                tableDisplay = `(Table ${tableInfo.nom_table})`;
            }
        } else {
            tableDisplay = `(Table ${tableInfo})`;
        }
    }

    return new MessageView(`order-success-${Date.now()}`, 'Commande Réussie !')
        .setIntro('Paiement confirmé !')
        .setBody(`Merci ${customerName || 'cher client'} ${tableDisplay}!\n\nVotre commande N° ${orderNumber} a été confirmée avec succès.\n\nNous vous contacterons au ${customerPhone || 'votre numéro'} pour la livraison.\n\nBon appétit ! 🍽️`)
        .setSeverity('success')
        .setPrimaryAction('Retour à l\'accueil', 'GET', homeUrl)
        .setDismissible(true);
};

module.exports = { createOrderConfirmationView };
