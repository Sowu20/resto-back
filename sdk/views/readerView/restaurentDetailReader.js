const { CardView } = require('@numerum-tech/cmsdk');
const { getOptimizedImageUrl } = require('../../utils/imageUtils');

/**
 * Créer la vue détaillée d'un restaurant de manière dynamique.
 * @param {Object} restaurant - Le document restaurant provenant de la base de données.
 * @returns {CardView|null} La vue formatée pour le SDK ou null si pas de données.
 */
const createRestaurantDetailReader = (restaurant) => {
    if (!restaurant) {
        return null;
    }

    const restaurantId = restaurant._id.toString();
    const name = restaurant.name || 'Restaurant sans nom';
    const address = restaurant.address || 'Adresse non spécifiée';

    const reader = new CardView(restaurantId, name)
        .setSubtitle(address)
        .setDescription(restaurant.description || 'Découvrez notre cuisine authentique et savoureuse dans une ambiance chaleureuse.')
        .addStat('Adresse', address)
        .addStat('Téléphone', restaurant.phone ? restaurant.phone.toString() : 'Non spécifié')
        .addStat('Statut', restaurant.status || 'Voir sur place')
        .setImage(getOptimizedImageUrl(restaurant.image, { width: 400 }))
        .addAction('Voir les menus', 'GET', {
            href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/menu`
        })
        .addAction('Voir les repas', 'GET', {
            href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/repas`
        });

    return reader;
};

module.exports = { createRestaurantDetailReader };
