const { FormView } = require('@numerum-tech/cmsdk');

/**
 * Crée un formulaire de commande pour un repas spécifique
 * @param {string} mealName - Nom du plat
 * @param {string} price - Prix du plat
 * @param {string} restaurantId - ID du restaurant (pour l'API de soumission)
 * @param {string} mealId - ID du plat (pour l'API de soumission)
 */
const createOrderForm = (mealName, price, restaurantId, mealId) => {
    // Le formId = chemin RELATIF uniquement (sans domaine)
    // Le SDK construit : {baseUrl}/{formId}
    // Route cible : POST /mobile/restaurents/:restaurantId/repas/:mealId/order
    const formId = `mobile/restaurents/${restaurantId}/repas/${mealId}/order`;

    // Titre affiché en haut du formulaire
    const title = `Commande de: ${mealName}`;

    const form = new FormView(formId, title)
        .setIntro(`Veuillez compléter vos informations pour commander "${mealName}" (${price}).`)
        // Champs du formulaire
        .addTextField('customer_name', 'Votre nom complet', true)
        .addPhoneField('customer_phone', 'Votre numéro de téléphone', true)
        .addSelectField('payment_method', 'Moyen de paiement', true, [
            { label: 'Tmoney', value: 'tmoney' },
            { label: 'Flooz', value: 'flooz' },
            { label: 'Espèces', value: 'espece' }
        ])
        // Bouton de soumission → le SDK poste vers {baseUrl}/{formId} automatiquement
        .submitButton('Voir le résumé', 'POST');

    return form;
};

module.exports = { createOrderForm };
