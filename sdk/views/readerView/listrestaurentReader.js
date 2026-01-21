const { ActionListView } = require('@numerum-tech/cmsdk');

const listrestaurentMenu = new ActionListView('restaurant-list', 'Nos Restaurants')
    .addAction('1', 'Chez Nana', 'Restaurant africain traditionnel')
    .addAction('2', 'Chez Bordille', 'Spécialités locales et grillades')
    .addAction('3', 'Chez Manon', 'Cuisine raffinée et poissons frais');

module.exports = { listrestaurentMenu };


// const { ReaderView } = require('@numerum-tech/cmsdk');

// const listrestaurentReader = new ReaderView('restaurent-list', 'Liste des restaurants')
//     .setIntro('Sélectionnez un restaurant pour consulter son menu')
//     .addLink('/1', 'Chez Nana')
//     .addLink('/2', 'Chez Bordille')
//     .addLink('/3', 'Chez Manon');

// module.exports = { listrestaurentReader }