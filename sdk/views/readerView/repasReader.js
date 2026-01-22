// const { ReaderView } = require('@numerum-tech/cmsdk');

// // Données des plats pour chaque restaurant
// const repasData = {
//   '1': {
//     nom: 'Chez Nana',
//     plats: [
//       'Riz sauce arachide',
//       'Fufu sauce graine',
//       'Pâte + sauce tomate',
//       'Poulet braisé'
//     ]
//   },
//   '2': {
//     nom: 'Chez Bordille',
//     plats: [
//       'Attiéké poisson',
//       'Garba (attiéké + thon)',
//       'Alloco plantain',
//       'Brochettes mixtes',
//       'Poisson grillé'
//     ]
//   },
//   '3': {
//     nom: 'Chez Manon',
//     plats: [
//       'Kedjenou de poulet',
//       'Poisson braisé',
//       'Riz gras',
//       'Sauce claire + igname',
//       'Couscous de manioc'
//     ]
//   }
// };

// // Fonction pour créer la vue des plats selon l'ID du restaurant
// const createRepasReader = (restaurantId) => {
//   const data = repasData[restaurantId];

//   if (!data) {
//     return null;  // Restaurant non trouvé
//   }

//   return new ReaderView(
//     `repas-restaurant-${restaurantId}`,
//     `Repas - ${data.nom}`
//   )
//     .setIntro('Plats disponibles')
//     .addListField(data.plats)
//     .setPrev(`https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}`);
// };

// module.exports = { createRepasReader };

const { ActionGridView } = require('@numerum-tech/cmsdk');

// Données des plats
const repasData = {
  '1': {
    nom: 'Chez Nana',
    plats: [
      { id: 'riz-arachide', label: 'Riz sauce arachide' },
      { id: 'fufu-graine', label: 'Fufu sauce graine' },
      { id: 'pate-tomate', label: 'Pâte + sauce tomate' },
      { id: 'poulet-braise', label: 'Poulet braisé' }
    ]
  },
  '2': {
    nom: 'Chez Bordille',
    plats: [
      { id: 'attieke-poisson', label: 'Attiéké poisson' },
      { id: 'garba', label: 'Garba (attiéké + thon)' },
      { id: 'alloco', label: 'Alloco plantain' },
      { id: 'brochettes', label: 'Brochettes mixtes' },
      { id: 'poisson-grille', label: 'Poisson grillé' }
    ]
  },
  '3': {
    nom: 'Chez Manon',
    plats: [
      { id: 'kedjenou', label: 'Kedjenou de poulet' },
      { id: 'poisson-braise', label: 'Poisson braisé' },
      { id: 'riz-gras', label: 'Riz gras' },
      { id: 'sauce-claire', label: 'Sauce claire + igname' },
      { id: 'couscous', label: 'Couscous de manioc' }
    ]
  }
};

// Factory ActionGridView
const createRepasGridView = (restaurantId) => {
  const data = repasData[restaurantId];
  if (!data) return null;

  const grid = new ActionGridView(
    `repas-grid-${restaurantId}`,
    `Repas - ${data.nom}`
  )
    .setColumns(2)    // 📱 mobile friendly
    .setSpacing(16);

  data.plats.forEach(plat => {
    grid.addAction(
      plat.id,
      plat.label,
      'Voir le détail',
      'plat-icon.jgp',
      {
        href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/repas/${plat.id}`
      }
    );
  });

  return grid;
};

module.exports = { createRepasGridView };