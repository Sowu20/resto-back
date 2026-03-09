const { CarouselView } = require('@numerum-tech/cmsdk');
const { getOptimizedImageUrl } = require('../../utils/imageUtils');

/**
 * Génère la vue détaillée d'un menu avec ses plats (Repas)
 * @param {Object} menu - L'objet Menu venant de MongoDB
 * @param {Array} dishes - La liste des Repas associés à ce menu
 * @returns {Object} JSON de la vue carrousel
 */
const createMenuDetailView = (menu, dishes = []) => {
    if (!menu) {
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

    const menuId = menu._id.toString();
    const restaurantId = menu.restaurent.toString();

    // Crée le carrousel
    const carousel = new CarouselView(`menu-carousel-${menuId}`, menu.name);

    if (dishes.length === 0) {
        // Slide par défaut si aucun plat
        carousel.addSlide(
            carousel.createSlide(
                `no-dish-${menuId}`,
                'Aucun plat',
                'Ce menu ne contient pas encore de plats.',
                {
                    imageUrl: getOptimizedImageUrl(menu.image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d', { width: 500 })
                }
            )
        );
    } else {
        // Ajoute chaque plat comme un slide
        dishes.forEach((dish, index) => {
            const dishPrice = dish.price ? `${dish.price} FCFA` : '';
            const description = dish.description ? `${dishPrice} - ${dish.description}` : dishPrice;

            carousel.addSlide(
                carousel.createSlide(
                    `dish-${menuId}-${index}`,
                    dish.name,
                    description,
                    {
                        imageUrl: getOptimizedImageUrl(dish.image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d', { width: 500 }),
                        badge: dish.isAvaible ? undefined : 'Indisponible' // Ex: afficher si dispo
                    }
                )
            );

            // Ajoute une action pour chaque slide
            if (dish.isAvaible) {
                carousel.addSlideAction(
                    `dish-${menuId}-${index}`,
                    '➕ Commander ce plat',
                    'GET', // On redirige vers le formulaire de commande du repas
                    {
                        href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/repas/${dish._id}/order`
                    }
                );
            }
        });
    }

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
            id: 'back-to-menus',
            label: 'Retour aux menus',
            type: 'GET',
            href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/menu`,
            variant: 'link'
        },
        {
            id: 'back-to-restaurant',
            label: 'Voir le restaurant',
            type: 'GET',
            href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}`,
            variant: 'link'
        }
    ];

    // Convertir en JSON et ajouter les actions globales
    const carouselJson = carousel.toJSON();
    carouselJson.actions = actions;

    return carouselJson;
};

module.exports = { createMenuDetailView };