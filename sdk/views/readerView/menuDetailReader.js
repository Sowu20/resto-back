const { CarouselView } = require('@numerum-tech/cmsdk');
const { getOptimizedImageUrl } = require('../../utils/imageUtils');

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
            { name: 'Café ou Thé', description: 'Au choix', imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085' },
            { name: 'Jus d\'orange frais', description: 'Pressé du jour', imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b' },
            { name: 'Assortiment de viennoiseries', description: 'Croissant, pain au chocolat', imageUrl: 'https://images.unsplash.com/photo-1555507036-ab794f27d2e9' },
            { name: 'Fruits de saison', description: 'Assortiment frais', imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf' },
            { name: 'Yaourt nature ou aux fruits', imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777' }
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
            { name: 'Entrée au choix', description: 'Salade verte ou soupe du jour', imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe' },
            { name: 'Plat principal', description: 'Viande ou poisson avec accompagnement', imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8' },
            { name: 'Dessert maison', description: 'Tarte ou fruit', imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e' },
            { name: 'Boisson', description: 'Eau, soda ou vin (1 verre)', imageUrl: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22' }
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
            { name: 'Amuse-bouche', description: 'Création du chef', imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d' },
            { name: 'Entrée raffinée', description: 'Terrine ou salade composée', imageUrl: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327' },
            { name: 'Plat principal', description: 'Spécialité de la maison', imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8' },
            { name: 'Plateau de fromages', description: 'Sélection régionale', imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d' },
            { name: 'Dessert gourmand', description: 'Pâtisserie maison', imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e' },
            { name: 'Vin', description: '1/2 bouteille au choix', imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3' },
            { name: 'Café ou Infusion', imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085' }
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
            { name: 'Oeufs au choix', description: 'Brouillés, au plat ou omelette', imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8' },
            { name: 'Bacon grillé', description: 'Servi croustillant', imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd' },
            { name: 'Pancakes', description: 'Sirop d\'érable inclus', imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445' },
            { name: 'Café ou thé à volonté', imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085' },
            { name: 'Jus de fruits frais', imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b' }
        ]
    }
};

// Fonction pour créer la vue carrousel des détails du menu
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

    // Crée le carrousel exactement comme dans la documentation
    const carousel = new CarouselView(`menu-carousel-${menuId}`, menuDetail.menuName);

    // Ajoute chaque plat comme un slide
    menuDetail.dishes.forEach((dish, index) => {
        carousel.addSlide(
            carousel.createSlide(
                `dish-${menuId}-${index}`,
                dish.name,
                dish.description || '',
                {
                    imageUrl: getOptimizedImageUrl(dish.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4', { width: 500 }),
                    badge: index === 0 ? '⭐ Inclus' : undefined
                }
            )
        );

        // Ajoute une action pour chaque slide (optionnel)
        carousel.addSlideAction(
            `dish-${menuId}-${index}`,
            '➕ Ajouter ce plat',
            'POST',
            {
                href: `/api/cart/add-item?dish=${encodeURIComponent(dish.name)}&menuId=${menuId}`,
                confirmMessage: `Ajouter "${dish.name}" à votre commande ?`
            }
        );
    });

    // Ajoute une action globale pour le menu complet
    carousel.addSlideAction(
        `menu-${menuId}-full`,
        '🛒 Commander le menu complet',
        'POST',
        {
            href: `/api/cart/add?menuId=${menuId}`,
            confirmMessage: `Ajouter le "${menuDetail.menuName}" complet pour ${menuDetail.price} ?`
        }
    );

    // Configure les paramètres du carrousel
    carousel.setSettings({
        autoplay: false,
        intervalMs: 4000,
        loop: true,
        showIndicators: true,
        showArrows: true
    });

    // Ajoute des actions globales (navigation)
    const actions = [
        {
            id: 'back-to-restaurant',
            label: '🏠 Voir le restaurant',
            type: 'GET',
            href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${menuDetail.restaurantId}`,
            variant: 'link'
        },
        {
            id: 'back-to-menus',
            label: '📋 Voir tous les menus',
            type: 'GET',
            href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${menuDetail.restaurantId}/menu`,
            variant: 'link'
        }
    ];

    // Convertir en JSON et ajouter les actions globales
    const carouselJson = carousel.toJSON();
    carouselJson.actions = actions;

    return carouselJson;
};

module.exports = { createMenuDetailView };