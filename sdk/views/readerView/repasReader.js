const { ActionGridView, CardView } = require('@numerum-tech/cmsdk');

const platsData = {
  '1': {
    nom: 'Chez Nana',
    plats: [
      { id: 'riz', nom: 'Riz sauce arachide', image: 'https://resto-back-xazy.onrender.com/assets/riz1.jgp', description: 'Un délicieux riz accompagné d\'une sauce onctueuse à l\'arachide.', price: '2000 FCFA' },
      { id: 'fufu', nom: 'Fufu sauce graine', image: 'https://resto-back-xazy.onrender.com/assets/fufu.jpg', description: 'Boule de fufu moelleuse avec une sauce graine riche en saveurs.', price: '2500 FCFA' },
      { id: 'pate', nom: 'Pâte + sauce tomate', image: 'https://resto-back-xazy.onrender.com/assets/pate.jpg', description: 'Pâte traditionnelle servie avec une sauce tomate épicée.', price: '1500 FCFA' },
      { id: 'poulet', nom: 'Poulet braisé', image: 'https://resto-back-xazy.onrender.com/assets/poulet.jpg', description: 'Quart de poulet mariné et braisé au charbon.', price: '3000 FCFA' }
    ]
  },
  '2': {
    nom: 'Chez Bordille',
    plats: [
      { id: 'attieke', nom: 'Attiéké poisson', image: 'https://resto-back-xazy.onrender.com/assets/attieke.jpg', description: 'Semoule de manioc avec poisson frit et légumes.', price: '2500 FCFA' },
      { id: 'garba', nom: 'Garba (attiéké + thon)', image: 'https://resto-back-xazy.onrender.com/assets/garba.jpg', description: 'Le classique ivoirien : attiéké et thon frit.', price: '1500 FCFA' },
      { id: 'alloco', nom: 'Alloco plantin', image: 'https://resto-back-xazy.onrender.com/assets/alloco.jpg', description: 'Bananes plantains frites, dorées et sucrées.', price: '1000 FCFA' },
      { id: 'poisson', nom: 'Poisson grillé', image: 'https://resto-back-xazy.onrender.com/assets/poisson.jpg', description: 'Poisson frais grillé aux épices locales.', price: '4000 FCFA' }
    ]
  },
  '3': {
    nom: 'Chez Manon',
    plats: [
      { id: 'riz-2', nom: 'Riz gras', image: 'https://resto-back-xazy.onrender.com/assets/riz2.jpg', description: 'Riz cuit dans un bouillon de viande et légumes.', price: '2000 FCFA' },
      { id: 'sauce', nom: 'Sauce claire + igname', image: 'https://resto-back-xazy.onrender.com/assets/sauce.jpg', description: 'Sauce légère aux épices avec morceaux d\'igname.', price: '2500 FCFA' },
      { id: 'couscous', nom: 'Couscous de manioc', image: 'https://resto-back-xazy.onrender.com/assets/couscous.jpg', description: 'Couscous fin à base de manioc.', price: '1500 FCFA' }
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

  // Ajouter chaque plat comme une action
  data.plats.forEach(plats => {
    grid.addAction(
      plats.id,
      plats.nom,
      plats.description || 'Description du plat',
      plats.image,
      {
        type: 'GET',
        // Utilisation de chemin relatif pour la compatibilité localhost/prod
        href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/repas/plats/${plats.id}`
      }
    );
  });

  return grid.toJSON();
};

const createRepasDetailReader = (restaurantId, repasId) => {
  const data = platsData[restaurantId];
  if (!data) return null;

  // Trouver le plat spécifique dans la liste
  const plat = data.plats.find(p => p.id === repasId);
  if (!plat) return null;

  // Créer la CardView (comme pour le détail restaurant)
  return new CardView(`repas-detail-${repasId}`, plat.nom)
    .setSubtitle('Détails du repas')
    .setImage(plat.image)
    .setDescription(plat.description || 'Succulent plat préparé avec soin.')
    .addStat('Prix', plat.price || 'Prix sur demande')
    .addAction('🛒 Commander', 'POST', {
      href: `/api/cart/add-item?dish=${encodeURIComponent(plat.nom)}&menuId=repas-indiv`,
      confirmMessage: `Voulez-vous commander "${plat.nom}" pour ${plat.price} ?`
    });
};

module.exports = { createRepasReader, createRepasDetailReader };