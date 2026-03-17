const { ActionListView } = require('@numerum-tech/cmsdk');

const createMainMenuView = (baseUrl = 'https://resto-back-xazy.onrender.com') => {
    return new ActionListView('main-menu', 'Acceuil')
        .addAction('restaurents', 'Restaurants', 'Consulter la liste des restaurants disponible', `${baseUrl}/mobile/restaurents`)
        .addAction('scan-qr', 'Scanner QR', 'Scanner un code QR', `${baseUrl}/mobile/scan-qr`)
        .addAction('about', 'À propos', 'En savoir plus sur l\'application', `${baseUrl}/mobile/about`);
};

module.exports = { createMainMenuView };