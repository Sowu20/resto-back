const { ReaderView } = require('@numerum-tech/cmsdk');

// Données des menus pour chaque restaurant
const menusData = {
  '1': {
    nom: 'Chez Nana',
    menus: [
      'Menu Petit-déjeuner - 2000 FCFA',
      'Menu Déjeuner - 3500 FCFA',
      'Menu Dîner - 5000 FCFA'
    ]
  },
  '2': {
    nom: 'Chez Bordille',
    menus: [
      'Menu Brunch - 2500 FCFA',
      'Menu Midi - 4000 FCFA',
      'Menu Soir - 6000 FCFA',
      'Menu Famille (4 pers) - 15000 FCFA'
    ]
  },
  '3': {
    nom: 'Chez Manon',
    menus: [
      'Menu Express - 1500 FCFA',
      'Menu Déjeuner - 3000 FCFA',
      'Menu Gastronomique - 8000 FCFA'
    ]
  }
};

// Fonction pour créer la vue des menus selon l'ID du restaurant
const createMenusReader = (restaurantId) => {
  const data = menusData[restaurantId];

  if (!data) {
    return null;  // Restaurant non trouvé
  }

  return new ReaderView(
    `menus-restaurant-${restaurantId}`,
    `Menus - ${data.nom}`
  )
    .setIntro('Liste des menus disponibles')
    .addListField(data.menus)
    .setPrev(`https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}`);
};

module.exports = { createMenusReader };