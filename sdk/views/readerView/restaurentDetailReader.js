const { ReaderView } = require('@numerum-tech/cmsdk');

const restaurentReader = new ReaderView('restaurent-A', 'ChezNana')
    .setIntro('Resturent africain traditionnel')
    .addParagraph('Adresse: Lomé-Togo')
    .addParagraph('Numéro de téléphone: 9034569890')
    .addParagraph("Heure d'ouvertur: 8h")
    .addLink('Voir les menus', '/mobile/restaurents/1/menus')
    .addLink('Voir les repas', '/mobile/restaurents/1/repas');

module.exports = { restaurentReader };