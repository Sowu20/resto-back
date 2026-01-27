const { CardView } = require('@numerum-tech/cmsdk');

// Données statiques des 3 restaurants
const restaurantsData = {
    '1': {
        id: 'restaurent-1',
        nom: 'Chez Nana',
        intro: 'Restaurant africain traditionnel',
        adresse: 'Lomé-Togo',
        telephone: '9034569890',
        horaire: '8h',
        image: 'https://resto-back-xazy.onrender.com/assets/resto1.jpg'
    },
    '2': {
        id: 'restaurent-2',
        nom: 'Chez Bordille',
        intro: 'Spécialités locales et grillades',
        adresse: 'Abidjan-Plateau',
        telephone: '9034569891',
        horaire: '9h',
        image: 'https://resto-back-xazy.onrender.com/assets/resto2.jpg'
    },
    '3': {
        id: 'restaurent-3',
        nom: 'Chez Manon',
        intro: 'Cuisine raffinée et poissons frais',
        adresse: 'Abidjan-Marcory',
        telephone: '9034569892',
        horaire: '10h',
        image: 'https://resto-back-xazy.onrender.com/assets/resto3.jpg'
    }
};

// Fonction pour créer la vue selon l'ID
const createRestaurantDetailReader = (restaurantId) => {
    const data = restaurantsData[restaurantId];

    if (!data) {
        return null;  // Restaurant non trouvé
    }

    return new CardView(data.id, data.nom)
        .setSubtitle(data.intro)
        .setDescription('Découvrez notre cuisine authentique et savoureuse dans une ambiance chaleureuse.')
        .addStat('📍 Adresse', data.adresse)
        .addStat('📞 Téléphone', data.telephone)
        .addStat('⏰ Horaires', `Ouvert à ${data.horaire}`)
        .setImage(data.image)
        .addAction('Voir les menus', 'GET', {
            href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/menu`
        })
        .addAction('Voir les repas', 'GET', {
            href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/repas`
        });
};

module.exports = { createRestaurantDetailReader };