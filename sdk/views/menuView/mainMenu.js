const { ActionListView } = require('@numerum-tech/cmsdk');

const mainMenu = new ActionListView('main-menu', 'Acceuil')
    .addAction('restaurents', 'Restaurants', 'Consulter la liste des restaurants disponibles', '/restaurents')
    .addAction('scan-qr', 'Scanner QR', 'Scanner un code QR', '/scan-qr')
    .addAction('about', 'À propos', 'En savoir plus sur l\'application', '/about');

module.exports = { mainMenu };