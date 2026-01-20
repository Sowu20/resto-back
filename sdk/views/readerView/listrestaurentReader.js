const { ReaderView } = require('@numerum-tech/cmsdk'); 

const listrestaurentReader = new ReaderView('restaurent-list', 'Liste des restaurets') 
    .setIntro('Sélectionner un restaurent pour consulter son menu') 
    .addParagraph('Liste des restaurents') 
    .addLink('/1', 'ChezNana'); 
    
module.exports = { listrestaurentReader }