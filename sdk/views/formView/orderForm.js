const { FormView } = require('@numerum-tech/cmsdk');

/**
 * Crée un formulaire de commande pour un repas spécifique
 * @param {string} mealName - Nom du plat
 * @param {string} price - Prix du plat
 * @param {string} restaurantId - ID du restaurant (pour l'API de soumission)
 * @param {string} mealId - ID du plat (pour l'API de soumission)
 */
const createOrderForm = (mealName, price, restaurantId, mealId) => {
    // ID unique pour le formulaire
    const formId = `order-form-${restaurantId}-${mealId}`;

    // Titre affiché en haut du formulaire
    const title = `Commande : ${mealName}`;

    const form = new FormView(formId, title)
        .setIntro(`Veuillez compléter vos informations pour commander "${mealName}" (${price}).`)
        // Champs du formulaire
        .addTextField('customer_name', 'Nom complet', true)
        .addPhoneField('customer_phone', 'Numéro de téléphone', true)
        .addSelectField('payement_method', 'Moyen de paiement', true, [
            { label: 'Tmoney', value: 'tmoney' },
            { label: 'Flooz', value: 'flooz' },
            { label: 'Espèces', value: 'espece' }
        ])
        // Champ caché pour le statut (peut être géré côté serveur, mais ajouté ici pour l'exemple)
        // Note: FormView ne supporte pas toujours "hidden", on peut le passer en paramètre d'URL ou le gérer au submitController

        // Bouton de soumission
        .submitButton('Confirmer la commande', 'POST', `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/repas/${mealId}/order`);

    return form;
};

module.exports = { createOrderForm };
