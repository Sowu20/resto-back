const { ReaderView } = require('@numerum-tech/cmsdk');

const listrestaurentReader = new ReaderView('restaurent-list', 'Liste des restaurets')
    .setIntro('Sélectionner un restaurent pour consulter son menu')
    .addParagraph('Liste des restaurents')
    .addLink('ChezNana', '/mobile/restaurentDetail/1');

module.exports = { listrestaurentReader }