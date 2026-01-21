const { ReaderView } = require('@numerum-tech/cmsdk');

// Données statiques des 3 restaurants
const restaurantsData = {
    '1': {
        id: 'restaurent-1',
        nom: 'Chez Nana',
        intro: 'Restaurant africain traditionnel',
        adresse: 'Lomé-Togo',
        telephone: '9034569890',
        horaire: '8h'
    },
    '2': {
        id: 'restaurent-2',
        nom: 'Chez Bordille',
        intro: 'Spécialités locales et grillades',
        adresse: 'Abidjan-Plateau',
        telephone: '9034569891',
        horaire: '9h'
    },
    '3': {
        id: 'restaurent-3',
        nom: 'Chez Manon',
        intro: 'Cuisine raffinée et poissons frais',
        adresse: 'Abidjan-Marcory',
        telephone: '9034569892',
        horaire: '10h'
    }
};

// Fonction pour créer la vue selon l'ID
const createRestaurantDetailReader = (restaurantId) => {
    const data = restaurantsData[restaurantId];

    if (!data) {
        return null;  // Restaurant non trouvé
    }

    return new ReaderView(data.id, data.nom)
        .setIntro(data.intro)
        .addParagraph(`Adresse: ${data.adresse}`)
        .addParagraph(`Numéro de téléphone: ${data.telephone}`)
        .addParagraph(`Heure d'ouverture: ${data.horaire}`)
        .addLink(`https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/menu`, 'Voir les menus')
        .addLink(`https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/repas`, 'Voir les repas');
};

module.exports = { createRestaurantDetailReader };