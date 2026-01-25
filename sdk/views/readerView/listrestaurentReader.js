const { ActionGridView } = require('@numerum-tech/cmsdk');

const listrestaurentMenu = new ActionGridView('restaurent-list', 'Nos restaurents')
    .setColumns(3)
    .setSpacing(18)
    .addAction('1', 'Chez Nana', 'Restaurant africain traditionnel', 'https://resto-back-xazy.onrender.com/assets/resto1.jpg')
    .addAction('2', 'Chez Bordille', 'Spécialités locales et grillades', 'https://resto-back-xazy.onrender.com/assets/resto2.jpg')
    .addAction('3', 'Chez Manon', 'Cuisine raffinée et poissons frais', 'https://resto-back-xazy.onrender.com/assets/resto3.jpg');

module.exports = { listrestaurentMenu }