const { ReaderView, CardView } = require('@numerum-tech/cmsdk');

// Données détaillées des plats pour chaque menu
const menuDetailsData = {
    // Menus de Chez Nana (restaurant 1)
    'petit-dej-1': {
        restaurantId: '1',
        restaurantName: 'Chez Nana',
        menuName: 'Menu Petit-déjeuner',
        price: '2000 FCFA',
        description: 'Un petit-déjeuner complet pour bien commencer la journée',
        duration: 'Servi de 6h à 11h',
        dishes: [
            { name: 'Café ou Thé', description: 'Au choix' },
            { name: 'Jus d\'orange frais', description: 'Pressé du jour' },
            { name: 'Assortiment de viennoiseries', description: 'Croissant, pain au chocolat' },
            { name: 'Fruits de saison', description: 'Assortiment frais' },
            { name: 'Yaourt nature ou aux fruits' }
        ]
    },
    'dej-1': {
        restaurantId: '1',
        restaurantName: 'Chez Nana',
        menuName: 'Menu Déjeuner',
        price: '3500 FCFA',
        description: 'Le déjeuner traditionnel avec produits frais',
        duration: 'Servi de 12h à 15h',
        dishes: [
            { name: 'Entrée au choix', description: 'Salade verte ou soupe du jour' },
            { name: 'Plat principal', description: 'Viande ou poisson avec accompagnement' },
            { name: 'Dessert maison', description: 'Tarte ou fruit' },
            { name: 'Boisson', description: 'Eau, soda ou vin (1 verre)' }
        ]
    },
    'diner-1': {
        restaurantId: '1',
        restaurantName: 'Chez Nana',
        menuName: 'Menu Dîner',
        price: '5000 FCFA',
        description: 'Dîner gastronomique dans une ambiance chaleureuse',
        duration: 'Servi de 19h à 23h',
        dishes: [
            { name: 'Amuse-bouche', description: 'Création du chef' },
            { name: 'Entrée raffinée', description: 'Terrine ou salade composée' },
            { name: 'Plat principal', description: 'Spécialité de la maison' },
            { name: 'Plateau de fromages', description: 'Sélection régionale' },
            { name: 'Dessert gourmand', description: 'Pâtisserie maison' },
            { name: 'Vin', description: '1/2 bouteille au choix' },
            { name: 'Café ou Infusion' }
        ]
    },

    // Menus de Chez Bordille (restaurant 2)
    'brunch-2': {
        restaurantId: '2',
        restaurantName: 'Chez Bordille',
        menuName: 'Menu Brunch',
        price: '2500 FCFA',
        description: 'Brunch dominical copieux et convivial',
        duration: 'Dimanche uniquement, 10h-14h',
        dishes: [
            { name: 'Oeufs au choix', description: 'Brouillés, au plat ou omelette' },
            { name: 'Bacon grillé', description: 'Servi croustillant' },
            { name: 'Pancakes', description: 'Sirop d\'érable inclus' },
            { name: 'Café ou thé à volonté' },
            { name: 'Jus de fruits frais' }
        ]
    },
    // ... Ajoute les autres menus de la même manière
};

// Version 1: Utilisation de ReaderView (lecture seule)
const createMenuDetailReader = (menuId) => {
    const menuDetail = menuDetailsData[menuId];

    if (!menuDetail) {
        return null;  // Menu non trouvé
    }

    const reader = new ReaderView(
        `menu-detail-${menuId}`,
        `${menuDetail.menuName}`
    )
        .setIntro(`${menuDetail.restaurantName} - ${menuDetail.price}`)
        .addParagraph(menuDetail.description)
        .addSubTitle('⌚ Horaires')
        .addParagraph(menuDetail.duration)
        .addSeparator()
        .addSubTitle('📋 Composition du menu');

    // Ajouter chaque plat dans une liste
    const dishList = menuDetail.dishes.map(dish =>
        dish.description
            ? `${dish.name}: ${dish.description}`
            : dish.name
    );

    reader.addListField(dishList)
        .addSeparator()
        .addSubTitle('🛒 Commander');

    // Ajouter des actions
    reader.addAction('add-to-cart', 'Ajouter au panier', 'POST', {
        href: `/api/cart/add?menuId=${menuId}`,
        confirmMessage: `Ajouter ce menu (${menuDetail.menuName}) à votre panier ?`
    });

    reader.addAction('back-to-menus', 'Retour aux menus', 'GET', {
        href: `/mobile/restaurents/${menuDetail.restaurantId}/menu`
    });

    return reader.toJSON();
};

// Version 2: Utilisation de CardView (plus visuel)
const createMenuDetailCard = (menuId) => {
    const menuDetail = menuDetailsData[menuId];

    if (!menuDetail) {
        return null;
    }

    const card = new CardView(
        `menu-card-${menuId}`,
        menuDetail.menuName
    )
        .setSubtitle(menuDetail.restaurantName)
        .setDescription(menuDetail.description)
        .setImage('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4', menuDetail.menuName)
        .addStat('💰 Prix', menuDetail.price)
        .addStat('🕐 Service', menuDetail.duration);

    // Ajouter une section pour les plats
    const dishesText = menuDetail.dishes
        .map(dish => `• ${dish.name}${dish.description ? ` : ${dish.description}` : ''}`)
        .join('\n');

    card.addSection('📋 Inclus dans ce menu', dishesText);

    // Ajouter des actions
    card.addAction('add-to-cart', '🛒 Ajouter au panier', 'POST', {
        confirmMessage: `Confirmer l'ajout du ${menuDetail.menuName} à votre panier ?`
    });

    card.addAction('back-to-menus', '↩️ Voir tous les menus', 'GET', {
        href: `/mobile/restaurents/${menuDetail.restaurantId}/menu`,
        variant: 'link'
    });

    return card.toJSON();
};

// Version 3: Vue mixte avec ReaderView + actions
const createMenuDetailView = (menuId) => {
    const menuDetail = menuDetailsData[menuId];

    if (!menuDetail) {
        return {
            viewId: 'menu-not-found',
            viewTitle: 'Menu non trouvé',
            viewType: 'message',
            intro: 'Erreur',
            body: 'Le menu demandé n\'existe pas.',
            severity: 'error',
            primaryAction: {
                label: 'Retour',
                type: 'GET',
                href: '/mobile/restaurents'
            }
        };
    }

    return {
        viewId: `menu-full-${menuId}`,
        viewTitle: menuDetail.menuName,
        viewType: 'reader',
        intro: `${menuDetail.restaurantName} • ${menuDetail.price}`,
        content: [
            {
                type: 'paragraph',
                text: menuDetail.description
            },
            {
                type: 'subtitle',
                text: '⌚ Horaires de service'
            },
            {
                type: 'paragraph',
                text: menuDetail.duration
            },
            {
                type: 'separator'
            },
            {
                type: 'subtitle',
                text: '📋 Détails des plats'
            },
            {
                type: 'list',
                items: menuDetail.dishes.map(dish => ({
                    text: dish.description ? `${dish.name} - ${dish.description}` : dish.name
                }))
            },
            {
                type: 'separator'
            }
        ],
        actions: [
            {
                id: 'add-to-cart',
                label: '🛒 Ajouter au panier',
                type: 'POST',
                href: `/api/cart/add?menuId=${menuId}&price=${menuDetail.price.replace(' FCFA', '')}`,
                confirmMessage: `Ajouter "${menuDetail.menuName}" pour ${menuDetail.price} ?`
            },
            {
                id: 'back-to-menus',
                label: '↩️ Retour aux menus',
                type: 'GET',
                href: `/mobile/restaurents/${menuDetail.restaurantId}/menu`
            },
            {
                id: 'back-to-restaurant',
                label: '🏠 Voir le restaurant',
                type: 'GET',
                href: `/mobile/restaurents/${menuDetail.restaurantId}`,
                variant: 'link'
            }
        ]
    };
};

module.exports = {
    createMenuDetailReader,
    createMenuDetailCard,
    createMenuDetailView
};