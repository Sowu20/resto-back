const { ActionListView } = require('@numerum-tech/cmsdk');

const createCategoriesReader = (restaurantId, tableId, categories = [], baseUrl = 'https://resto-back-xazy.onrender.com') => {
    if (!categories || categories.length === 0) {
        return null; // Return empty or handle gracefully in controller
    }

    const tablePath = tableId ? `/table/${tableId}` : '';
    const listView = new ActionListView(`categories-list-${restaurantId}`, 'Catégories de Repas');

    categories.forEach(cat => {
        listView.addAction(
            cat._id.toString(),
            cat.name,
            cat.description || 'Découvrez nos plats de cette catégorie',
            `${baseUrl}/mobile/restaurents/${restaurantId}${tablePath}/categories/${cat._id}/repas`
        );
    });

    return listView;
};

module.exports = { createCategoriesReader };
