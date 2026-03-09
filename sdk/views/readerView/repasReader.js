const { ActionGridView, CardView } = require('@numerum-tech/cmsdk');
const { getOptimizedImageUrl } = require('../../utils/imageUtils');


const createRepasReader = (restaurantId, repas = []) => {
  if (!repas || repas.length === 0) {
    return null;
  }

  const grid = new ActionGridView(`repas-grid-${restaurantId}`, 'Nos Repas')
    .setIntro('Sélectionnez un plat')
    .setColumns(3)
    .setSpacing(16);

  // Ajouter chaque plat comme une action
  repas.forEach(plat => {
    grid.addAction(
      plat._id.toString(),
      plat.name,
      plat.description || 'Délicieux plat',
      plat.image ? getOptimizedImageUrl(plat.image, { width: 300 }) : undefined,
      {
        type: 'GET',
        href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/repas/${plat._id}`
      }
    );
  });

  return grid.toJSON();
};

const createRepasDetailReader = (restaurantId, repas) => {
  if (!repas) return null;

  const card = new CardView(`repas-detail-${repas._id}`, repas.name)
    .setSubtitle('Détails du repas')
    .setDescription(repas.description || 'Succulent plat préparé avec soin.')
    .addStat('Prix', `${repas.price} FCFA`);

  // Ajouter l'image seulement si elle existe
  if (repas.image) {
    card.setImage(getOptimizedImageUrl(repas.image, { width: 600 }));
  }

  card.addAction('Commander', 'GET', {
    href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/repas/${repas._id}/order`,
  });

  return card;
};

module.exports = { createRepasReader, createRepasDetailReader };