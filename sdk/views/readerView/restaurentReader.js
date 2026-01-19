const { ReaderView } = require('@numerum-tech/cmsdk');

const restaurentReader = new ReaderView('restaurent-detail', 'Menu & Repas')
    .setIntro('Découvrez nos menus et repas')
    .addMarkdown(`
        ### Menus
            - Menu du jour
        ### Repas
            - Poulet braisé
    `);

module.exports = { restaurentReader };