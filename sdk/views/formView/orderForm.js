const { FormView } = require('@numerum-tech/cmsdk');

/**
 * Crée un formulaire de commande pour un repas spécifique
 * @param {string} mealName - Nom du plat
 * @param {string} price - Prix du plat
 * @param {string} restaurantId - ID du restaurant (pour l'API de soumission)
 * @param {string} mealId - ID du plat (pour l'API de soumission)
 */
const createOrderForm = (mealName, price, restaurantId, mealId) => {
    // formId simplifié pour plus de fiabilité
    const formId = `https://resto-back-xazy.onrender.com/mobile/repas/order/preview`;

    const title = `Commande de : ${mealName} à (${price}`;

    const form = new FormView(formId, title)
        .setIntro(`Veuillez compléter vos informations pour commander "${mealName}" (${price}).`)
        .addTextField('customer_name', 'Votre nom complet', true)
        .addPhoneField('customer_phone', 'Votre numéro de téléphone', true)
        .addSelectField('payment_method', 'Moyen de paiement', true, [
            { label: 'Tmoney', value: 'tmoney' },
            { label: 'Flooz', value: 'flooz' },
            { label: 'Espèces', value: 'espece' }
        ])
        // Champs cachés pour transmettre les IDs au contrôleur
        .addHiddenField('restaurantId', 'restaurantId', restaurantId)
        .addHiddenField('mealId', 'mealId', mealId)
        // Pas de setNext ici : l'app mobile doit afficher directement la réponse JSON du POST
        .submitButton('Voir le résumé', 'POST');

    return form;
};

module.exports = { createOrderForm };
