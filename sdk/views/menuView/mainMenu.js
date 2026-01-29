const { ActionListView } = require('@numerum-tech/cmsdk');

const mainMenu = new ActionListView('main-menu', 'Acceuil')
    .addAction('restaurents', 'Restaurents', 'Consulter la liste des restaurents disponible', '/restaurents')
    .addAction('scan-qr', 'Scanner QR', 'Scanner un code QR', '/scan-qr');

module.exports = { mainMenu };