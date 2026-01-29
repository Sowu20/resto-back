const express = require('express');
const { RegisterForm, HomeScreen, getReader, Restaurents, RestaurentDetail, Menu, Repas, getMenuDetails, getRepasDetails, getOrderForm, submitOrder, previewOrder, getScanView, getAboutView } = require('../controllers/jsonappController');

const router = express.Router();

router.get('/mobile', HomeScreen);
router.get('/mobile/forms', RegisterForm);
router.get('/mobile/readers', getReader);
router.get('/mobile/restaurents', Restaurents);
router.get('/mobile/restaurents/:id', RestaurentDetail);
router.get('/mobile/restaurents/:id/menu', Menu);
// NOUVELLE route pour les détails d'un menu
router.get('/mobile/restaurents/:restaurantId/menu/:menuId', getMenuDetails);
// NOUVELLE route pour les plats
router.get('/mobile/restaurents/:id/repas', Repas);
// NOUVELLE route pour les détails d'un plat
router.get('/mobile/restaurents/:restaurantId/repas/:mealId', getRepasDetails);
// Route pour afficher le formulaire de commande
router.get('/mobile/restaurents/:restaurantId/repas/:mealId/order', getOrderForm);

// Route pour soumettre la commande (POST)
//router.post('/mobile/restaurents/:restaurantId/repas/:mealId/order', submitOrder);

// NOUVELLE Route pour la prévisualisation (Résumé)
router.post('/mobile/restaurents/:restaurantId/repas/:mealId/order', previewOrder);

// Route pour le scanner QR
router.get('/mobile/scan-qr', getScanView);

// Route pour À propos
router.get('/mobile/about', getAboutView);

module.exports = router;