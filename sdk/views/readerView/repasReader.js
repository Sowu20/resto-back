const { ReaderView } = require('@numerum-tech/cmsdk');

// Données des plats pour chaque restaurant
const repasData = {
  '1': {
    nom: 'Chez Nana',
    plats: [
      'Riz sauce arachide',
      'Fufu sauce graine',
      'Pâte + sauce tomate',
      'Poulet braisé'
    ]
  },
  '2': {
    nom: 'Chez Bordille',
    plats: [
      'Attiéké poisson',
      'Garba (attiéké + thon)',
      'Alloco plantain',
      'Brochettes mixtes',
      'Poisson grillé'
    ]
  },
  '3': {
    nom: 'Chez Manon',
    plats: [
      'Kedjenou de poulet',
      'Poisson braisé',
      'Riz gras',
      'Sauce claire + igname',
      'Couscous de manioc'
    ]
  }
};

// Fonction pour créer la vue des plats selon l'ID du restaurant
const createRepasReader = (restaurantId) => {
  const data = repasData[restaurantId];

  if (!data) {
    return null;  // Restaurant non trouvé
  }

  return new ReaderView(
    `repas-restaurant-${restaurantId}`,
    `Repas - ${data.nom}`
  )
    .setIntro('Plats disponibles')
    .addListField(data.plats)
    .setPrev(`https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}`);
};

module.exports = { createRepasReader };