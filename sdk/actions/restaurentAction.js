const { ActionListView } = require('@numerum-tech/cmsdk');

const restaurectAction = new ActionListView('restaurent-menu', 'Menu du restaurent')
    .addAction('menus', 'Voir les meus', 'Consulter les menus du restaurent disponible')
    .addAction('repas', 'Voir les repas', 'Consulter les repas disponible');

module.exports = { restaurectAction };