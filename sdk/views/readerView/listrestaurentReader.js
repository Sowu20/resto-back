const { CardView } = require('@numerum-tech/cmsdk');

const listrestaurentReader = new CardView('restaurent-list', 'Liste des restaurants')
    .addAction('resto-1', 'ChezNana', 'Spécialités togolaises', '/1');

module.exports = { listrestaurentReader }