const { ReaderView } = require('@numerum-tech/cmsdk');

const listrestaurentReader = new ReaderView('restaurent-list', 'Liste des restaurets')
    .setIntro('Sélectionner un restaurent pour consulter son menu')
    .addParagraph('Liste des restaurents')
    .addLink('Voir les restaurents', '/api/restaurents');

module.exports = { listrestaurentReader }