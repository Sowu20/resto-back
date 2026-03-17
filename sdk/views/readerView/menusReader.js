const { ActionGridView } = require('@numerum-tech/cmsdk');
const { getOptimizedImageUrl } = require('../../utils/imageUtils');


// Fonction pour créer la grille d'actions des menus
const createMenusGrid = (restaurantId, tableId, menus = [], baseUrl = 'https://resto-back-xazy.onrender.com') => {
  if (!menus || menus.length === 0) {
    return null;  // Aucun menu trouvé
  }

  const tablePath = tableId ? `/table/${tableId}` : '';

  const grid = new ActionGridView(
    `menu-grid-${restaurantId}`,
    'Nos Menus'
  )
    .setIntro('Sélectionnez un menu pour voir les détails')
    .setColumns(2)
    .setSpacing(16);

  // Ajouter chaque menu comme une action
  menus.forEach(menu => {
    grid.addAction(
      menu._id.toString(),
      menu.name,
      menu.description || 'Découvrez notre sélection',
      menu.image ? getOptimizedImageUrl(menu.image, { width: 300 }, baseUrl) : undefined,
      {
        type: 'GET',
        href: `${baseUrl}/mobile/restaurents/${restaurantId}${tablePath}/menu/${menu._id}`
      }
    );
  });

  return grid.toJSON();
};

module.exports = { createMenusGrid };