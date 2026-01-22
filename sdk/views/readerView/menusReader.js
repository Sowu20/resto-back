const { ActionGridView } = require('@numerum-tech/cmsdk');

// Données des menus pour chaque restaurant
const menusData = {
  '1': {
    nom: 'Chez Nana',
    menu: [
      { id: 'petit-dej-1', nom: 'Menu Petit-déjeuner', prix: '2000 FCFA', description: 'Café, jus, croissants, fruits' },
      { id: 'dej-1', nom: 'Menu Déjeuner', prix: '3500 FCFA', description: 'Plat du jour, dessert, boisson' },
      { id: 'diner-1', nom: 'Menu Dîner', prix: '5000 FCFA', description: 'Entrée, plat, dessert, vin' }
    ]
  },
  '2': {
    nom: 'Chez Bordille',
    menu: [
      { id: 'brunch-2', nom: 'Menu Brunch', prix: '2500 FCFA', description: 'Oeufs, bacon, pancakes, café' },
      { id: 'midi-2', nom: 'Menu Midi', prix: '4000 FCFA', description: 'Salade, plat chaud, boisson' },
      { id: 'soir-2', nom: 'Menu Soir', prix: '6000 FCFA', description: 'Menu complet gastronomique' },
      { id: 'famille-2', nom: 'Menu Famille', prix: '15000 FCFA', description: 'Pour 4 personnes - variété de plats' }
    ]
  },
  '3': {
    nom: 'Chez Manon',
    menu: [
      { id: 'express-3', nom: 'Menu Express', prix: '1500 FCFA', description: 'Sandwich ou salade + boisson' },
      { id: 'dej-3', nom: 'Menu Déjeuner', prix: '3000 FCFA', description: 'Plat traditionnel + dessert' },
      { id: 'gastro-3', nom: 'Menu Gastronomique', prix: '8000 FCFA', description: 'Menu 3 services avec vin' }
    ]
  }
};

// Fonction pour créer la grille d'actions des menus
const createMenusGrid = (restaurantId) => {
  const data = menusData[restaurantId];

  if (!data) {
    return null;  // Restaurant non trouvé
  }

  const grid = new ActionGridView(
    `menu-grid-${restaurantId}`,
    `Menu - ${data.nom}`
  )
    .setIntro('Sélectionnez un menu pour voir les détails')
    .setColumns(3)
    .setSpacing(16);

  // Ajouter chaque menu comme une action
  data.menu.forEach(menu => {
    const description = `${menu.prix}\n${menu.description}`;
    grid.addAction(
      menu.id,
      menu.nom,
      description,
      'menu-icon.png',
      {
        type: 'GET',
        // Ici tu peux mettre l'URL pour voir les détails du menu spécifique
        href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/menu/${menu.id}`
      }
    );
  });

  // ✅ CORRECTION : Action de retour avec redirection
  // grid.addAction(
  //   'retour-restaurant',
  //   '↩️ Retour au restaurant',
  //   'Retourner aux détails du restaurant',
  //   'back-icon.png',
  //   {
  //     type: 'GET',
  //     href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}`
  //   }
  // );

  return grid.toJSON();
};

module.exports = { createMenusGrid };






// const { ReaderView } = require('@numerum-tech/cmsdk');

// // Données des menus pour chaque restaurant
// const menusData = {
//   '1': {
//     nom: 'Chez Nana',
//     menus: [
//       'Menu Petit-déjeuner - 2000 FCFA',
//       'Menu Déjeuner - 3500 FCFA',
//       'Menu Dîner - 5000 FCFA'
//     ]
//   },
//   '2': {
//     nom: 'Chez Bordille',
//     menus: [
//       'Menu Brunch - 2500 FCFA',
//       'Menu Midi - 4000 FCFA',
//       'Menu Soir - 6000 FCFA',
//       'Menu Famille (4 pers) - 15000 FCFA'
//     ]
//   },
//   '3': {
//     nom: 'Chez Manon',
//     menus: [
//       'Menu Express - 1500 FCFA',
//       'Menu Déjeuner - 3000 FCFA',
//       'Menu Gastronomique - 8000 FCFA'
//     ]
//   }
// };

// // Fonction pour créer la vue des menus selon l'ID du restaurant
// const createMenusReader = (restaurantId) => {
//   const data = menusData[restaurantId];

//   if (!data) {
//     return null;  // Restaurant non trouvé
//   }

//   return new ReaderView(
//     `menus-restaurant-${restaurantId}`,
//     `Menus - ${data.nom}`
//   )
//     .setIntro('Liste des menus disponibles')
//     .addListField(data.menus)
//     .setPrev(`https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}`);
// };

// module.exports = { createMenusReader };