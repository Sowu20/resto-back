const { ActionGridView } = require('@numerum-tech/cmsdk');
const { getOptimizedImageUrl } = require('../../utils/imageUtils');

// Données des menus pour chaque restaurant
const menusData = {
  '1': {
    nom: 'Chez Nana',
    menu: [
      { id: 'petit-dej-1', nom: 'Menu Petit-déjeuner', prix: '2000 FCFA', description: 'Café, jus, croissants, fruits', image: 'https://resto-back-xazy.onrender.com/assets/petitdej.jpg' },
      { id: 'dej-1', nom: 'Menu Déjeuner', prix: '3500 FCFA', description: 'Plat du jour, dessert, boisson', image: 'https://resto-back-xazy.onrender.com/assets/dej1.jpg' },
      { id: 'diner-1', nom: 'Menu Dîner', prix: '5000 FCFA', description: 'Entrée, plat, dessert, vin', image: 'https://resto-back-xazy.onrender.com/assets/midi.jpg' }
    ]
  },
  '2': {
    nom: 'Chez Bordille',
    menu: [
      { id: 'brunch-2', nom: 'Menu Brunch', prix: '2500 FCFA', description: 'Oeufs, bacon, pancakes, café', image: 'https://resto-back-xazy.onrender.com/assets/brunch.jpg' },
      { id: 'midi-2', nom: 'Menu Midi', prix: '4000 FCFA', description: 'Salade, plat chaud, boisson', image: 'https://resto-back-xazy.onrender.com/assets/midi.jpg' },
      { id: 'soir-2', nom: 'Menu Soir', prix: '6000 FCFA', description: 'Menu complet gastronomique', image: 'https://resto-back-xazy.onrender.com/assets/soir.jpg' },
      { id: 'famille-2', nom: 'Menu Famille', prix: '15000 FCFA', description: 'Pour 4 personnes - variété de plats', image: 'https://resto-back-xazy.onrender.com/assets/gastro.jpg' }
    ]
  },
  '3': {
    nom: 'Chez Manon',
    menu: [
      { id: 'express-3', nom: 'Menu Express', prix: '1500 FCFA', description: 'Sandwich ou salade + boisson', image: 'https://resto-back-xazy.onrender.com/assets/express.jpg' },
      { id: 'dej-3', nom: 'Menu Déjeuner', prix: '3000 FCFA', description: 'Plat traditionnel + dessert', image: 'https://resto-back-xazy.onrender.com/assets/dej2.jpg' },
      { id: 'gastro-3', nom: 'Menu Gastronomique', prix: '8000 FCFA', description: 'Menu 3 services avec vin', image: 'https://resto-back-xazy.onrender.com/assets/gastro.jpg' }
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
      getOptimizedImageUrl(menu.image, { width: 300 }),
      {
        type: 'GET',
        // Ici tu peux mettre l'URL pour voir les détails du menu spécifique
        href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/menu/${menu.id}`
      }
    );
  });

  return grid.toJSON();
};

module.exports = { createMenusGrid };