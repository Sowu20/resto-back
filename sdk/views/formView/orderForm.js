const { FormView } = require('@numerum-tech/cmsdk');

/**
 * Crée un formulaire de commande pour un repas spécifique
 * @param {string} mealName - Nom du plat
 * @param {string} price - Prix du plat
 * @param {string} restaurantId - ID du restaurant (pour l'API de soumission)
 * @param {string} mealId - ID du plat (pour l'API de soumission)
 */
const createOrderForm = (mealName, price, restaurantId, mealId) => {
    // Le formId = URL complète de soumission (POST endpoint)
    const submitUrl = `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/repas/${mealId}/order`;

    // Titre affiché en haut du formulaire
    const title = `Commande de : ${mealName} à ${price}`;

    const form = new FormView(submitUrl, title)
        .setIntro(`Veuillez compléter vos informations pour commander "${mealName}" (${price}).`)
        // Champs du formulaire
        .addTextField('customer_name', 'Votre nom complet', true)
        .addPhoneField('customer_phone', 'Votre numéro de téléphone', true)
        .addSelectField('payment_method', 'Moyen de paiement', true, [
            { label: 'Tmoney', value: 'tmoney' },
            { label: 'Flooz', value: 'flooz' },
            { label: 'Espèces', value: 'espece' }
        ])
        // setNext() indique à l'app mobile d'afficher la réponse du POST comme nouvelle vue
        // Sans cela, l'app mobile reste bloquée sur le formulaire après soumission
        .setNext(submitUrl)
        .submitButton('Voir le résumé', 'POST');

    return form;
};

module.exports = { createOrderForm };
