const { ActionGridView } = require('@numerum-tech/cmsdk');

const platsData = {
  '1': {
    nom: 'Chez Nana',
    plats: [
      { id: 'riz', nom: 'Riz sauce arachide', image: 'https://resto-back-xazy.onrender.com/assets/riz1.jgp' },
      { id: 'fufu', nom: 'Fufu sauce graine', image: 'https://resto-back-xazy.onrender.com/assets/fufu.jpg' },
      { id: 'pate', nom: 'Pâte + sauce tomate', image: 'https://resto-back-xazy.onrender.com/assets/pate.jpg' },
      { id: 'poulet', nom: 'Poulet braisé', image: 'https://resto-back-xazy.onrender.com/assets/poulet.jpg' }
    ]
  },
  '2': {
    nom: 'Chez Bordille',
    plats: [
      { id: 'attieke', nom: 'Attiéké poisson', image: 'https://resto-back-xazy.onrender.com/assets/attieke.jpg' },
      { id: 'garba', nom: 'Garba (attiéké + thon)', image: 'https://resto-back-xazy.onrender.com/assets/garba.jpg'},
      { id: 'alloco', nom: 'Alloco plantin', image: 'https://resto-back-xazy.onrender.com/assets/alloco.jpg'},
      { id: 'poisson', nom: 'Poisson grillé', image: 'https://resto-back-xazy.onrender.com/assets/poisson.jpg' }
    ]
  },
  '3': {
    nom: 'Chez Manon',
    plats: [
      { id: 'riz-2', nom: 'Riz gras', image: 'https://resto-back-xazy.onrender.com/assets/riz2.jpg' },
      { id: 'sauce', nom: 'Sauce claire + igname', image: 'https://resto-back-xazy.onrender.com/assets/sauce.jpg' },
      { id: 'couscous', nom: 'Couscous de manioc', image: 'https://resto-back-xazy.onrender.com/assets/couscous.jpg' }
    ]
  }
};

const createRepasReader = (restaurantId) => {
  const data = platsData[restaurantId];

  if (!data) {
    return null;
  }

  const grid = new ActionGridView(`raps-grid-${restaurantId}`, `Repas - ${data.nom}`)
    .setIntro('Sélectionnz un plats')
    .setColumns(3)
    .setSpacing(16);

  data.plats.forEach(plats => {
    const description = 'Parcourez nos différents plats'
    grid.addAction(
      plats.id,
      plats.nom,
      description,
      plats.image,
      {
        type: 'GET',
        href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/plats/${plats.id}`
      }
    );
  });

  return grid.toJSON();
};

module.exports = { createRepasReader  }

// const { ReaderView } = require('@numerum-tech/cmsdk');

// // Données des plats pour chaque restaurant
// const platsData = {
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
// const createplatsReader = (restaurantId) => {
//   const data = platsData[restaurantId];

//   if (!data) {
//     return null;  // Restaurant non trouvé
//   }

//   return new ReaderView(
//     `plats-restaurant-${restaurantId}`,
//     `plats - ${data.nom}`
//   )
//     .setIntro('plats disponibles')
//     .addListField(data.plats)
//     .setPrev(`https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}`);
// };

// module.exports = { createplatsReader };