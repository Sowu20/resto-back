const { CardView } = require('@numerum-tech/cmsdk');

const listrestaurentReader = new CardView('restaurent-list', 'Liste des restaurets')
    .setSubtitle('Restaurent traditionnel')
    .setDescription('Cuisine togolaise')
    .addAction('Voir le restaurent', 'GET', '/1');

module.exports = { listrestaurentReader }