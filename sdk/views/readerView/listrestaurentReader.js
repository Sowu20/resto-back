const { ActionGridView } = require('@numerum-tech/cmsdk');
const { getOptimizedImageUrl } = require('../../utils/imageUtils');

const listrestaurentMenu = new ActionGridView('restaurent-list', 'Nos restaurents')
    .setColumns(3)
    .setSpacing(18)
    .addAction('1', 'Chez Nana', 'Restaurant africain traditionnel', getOptimizedImageUrl('https://resto-back-xazy.onrender.com/assets/resto1.jpg', { width: 300 }))
    .addAction('2', 'Chez Bordille', 'Spécialités locales et grillades', getOptimizedImageUrl('https://resto-back-xazy.onrender.com/assets/resto2.jpg', { width: 300 }))
    .addAction('3', 'Chez Manon', 'Cuisine raffinée et poissons frais', getOptimizedImageUrl('https://resto-back-xazy.onrender.com/assets/resto3.jpg', { width: 300 }));

module.exports = { listrestaurentMenu }