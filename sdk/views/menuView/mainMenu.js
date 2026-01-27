const { ActionListView } = require('@numerum-tech/cmsdk');

const mainMenu = new ActionListView('main-menu', 'Acceuil')
    .addAction('restaurents', 'Restaurents', 'Consulter la liste des restaurents disponible', '/mobile/restaurents');

module.exports = { mainMenu };