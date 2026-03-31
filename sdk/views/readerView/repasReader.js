const { ActionGridView, CardView } = require('@numerum-tech/cmsdk');
const { getOptimizedImageUrl } = require('../../utils/imageUtils');


const createRepasReader = (restaurantId, tableId, repas = [], baseUrl = 'https://resto-back-xazy.onrender.com', categoryId) => {
  if (!repas || repas.length === 0) {
    return null;
  }

  const tablePath = tableId ? `/table/${tableId}` : '';

  const grid = new ActionGridView(`repas-grid-${restaurantId}`, 'Nos Repas')
    .setIntro('Sélectionnez un plat')
    .setColumns(3)
    .setSpacing(16);

  const categoryPath = categoryId ? `/categories/${categoryId}` : '';
  // Ajouter chaque plat comme une action
  repas.forEach(plat => {
    grid.addAction(
      plat._id.toString(),
      plat.name,
      plat.description || 'Délicieux plat',
      plat.image ? getOptimizedImageUrl(plat.image, { width: 300 }, baseUrl) : undefined,
      {
        type: 'GET',
        href: `${baseUrl}/mobile/restaurents/${restaurantId}${tablePath}${categoryPath}/repas/${plat._id}/details`
      }
    );
  });

  return grid.toJSON();
};

const createRepasDetailReader = (restaurantId, tableId, repas, baseUrl = 'https://resto-back-xazy.onrender.com', categoryId) => {
  if (!repas) return null;

  const tablePath = tableId ? `/table/${tableId}` : '';

  const card = new CardView(`repas-detail-${repas._id}`, repas.name)
    .setSubtitle('Détails du repas')
    .setDescription(repas.description || 'Succulent plat préparé avec soin.')
    .addStat('Prix', `${repas.price} FCFA`);

  // Ajouter l'image seulement si elle existe
  if (repas.image) {
    card.setImage(getOptimizedImageUrl(repas.image, { width: 600 }, baseUrl));
  }

  const categoryPath = categoryId ? `/categories/${categoryId}` : '';

  card.addAction('Commander', 'GET', {
    href: `${baseUrl}/mobile/restaurents/${restaurantId}${tablePath}${categoryPath}/repas/${repas._id}/order`,
  });

  return card;
};

module.exports = { createRepasReader, createRepasDetailReader };