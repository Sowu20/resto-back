const { ActionGridView } = require('@numerum-tech/cmsdk');
const { getOptimizedImageUrl } = require('../../utils/imageUtils');

/**
 * Génère la vue de la liste des restaurants de manière dynamique.
 * @param {Array} restaurants - Liste des restaurants provenant de la base de données.
 * @returns {ActionGridView} La vue formatée pour le SDK.
 */
const createRestaurantsList = (restaurants, baseUrl = 'https://resto-back-xazy.onrender.com') => {
    const list = new ActionGridView('restaurent-list', 'Nos restaurants')
        .setColumns(3)
        .setSpacing(18);

    if (restaurants && restaurants.length > 0) {
        restaurants.forEach(resto => {
            list.addAction(
                resto._id.toString(),
                resto.name,
                resto.address || 'Découvrez nos saveurs',
                getOptimizedImageUrl(resto.image, { width: 300 }, baseUrl)
            );
        });
    }

    return list;
};

module.exports = { createRestaurantsList };
