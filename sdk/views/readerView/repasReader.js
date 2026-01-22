const { ActionGridView } = require('@numerum-tech/cmsdk');

// Données des plats
const repasData = {
  '1': {
    nom: 'Chez Nana',
    plats: [
      { id: 'riz-arachide', nom: 'Riz sauce arachide' },
      { id: 'fufu-graine', nom: 'Fufu sauce graine' },
      { id: 'pate-tomate', nom: 'Pâte + sauce tomate' },
      { id: 'poulet-braise', nom: 'Poulet braisé' }
    ]
  },
  '2': {
    nom: 'Chez Bordille',
    plats: [
      { id: 'attieke-poisson', nom: 'Attiéké poisson' },
      { id: 'garba', nom: 'Garba (attiéké + thon)' },
      { id: 'alloco', nom: 'Alloco plantain' },
      { id: 'brochettes', nom: 'Brochettes mixtes' },
      { id: 'poisson-grille', nom: 'Poisson grillé' }
    ]
  },
  '3': {
    nom: 'Chez Manon',
    plats: [
      { id: 'kedjenou', nom: 'Kedjenou de poulet' },
      { id: 'poisson-braise', nom: 'Poisson braisé' },
      { id: 'riz-gras', nom: 'Riz gras' },
      { id: 'sauce-claire', nom: 'Sauce claire + igname' },
      { id: 'couscous', nom: 'Couscous de manioc' }
    ]
  }
};

// Factory ActionGridView
const createRepasReader = (restaurantId) => {
  const data = repasData[restaurantId];
  if (!data) return null;

  const grid = new ActionGridView(
    `repas-grid-${restaurantId}`,
    `Repas - ${data.nom}`
  )
    .setColumns(3)
    .setSpacing(16);

  data.plats.forEach(plat => {
    grid.addAction(
      plat.id,
      plat.nom,
      'plat-icon.pngg',
      {
        type: 'GET',
        href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/plats/${plat.id}/details` 
      }
    );
  });

  return grid;
};

module.exports = { createRepasReader };