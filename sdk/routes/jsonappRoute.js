const express = require('express');
const { RegisterForm, HomeScreen, getReader, Restaurents, RestaurentDetail, Menu, Repas, getMenuDetails, getRepasDetails, getOrderForm, submitOrder, previewOrder, getScanView, getAboutView, getPaymentForm, confirmPayment } = require('../controllers/jsonappController');

const router = express.Router();

router.get('/mobile', HomeScreen);
router.get('/mobile/forms', RegisterForm);
router.get('/mobile/readers', getReader);
// Route pour le scanner QR
router.get('/mobile/scan-qr', getScanView);

// Route pour À propos
router.get('/mobile/about', getAboutView);

// Route pour les Restaurants
router.get('/mobile/restaurents', Restaurents);
router.get('/mobile/restaurents/:id/table/:tableId', RestaurentDetail);
router.get('/mobile/restaurents/:id/table/:tableId/menu', Menu);
// NOUVELLE route pour les détails d'un menu
router.get('/mobile/restaurents/:restaurantId/table/:tableId/menu/:menuId', getMenuDetails);
// NOUVELLE route pour les plats
router.get('/mobile/restaurents/:id/table/:tableId/repas', Repas);
// NOUVELLE route pour les détails d'un plat
router.get('/mobile/restaurents/:restaurantId/table/:tableId/repas/:mealId', getRepasDetails);
// Route pour afficher le formulaire de commande
router.get('/mobile/restaurents/:restaurantId/table/:tableId/repas/:mealId/order', getOrderForm);

// Route pour soumettre la commande (POST)
//router.post('/mobile/restaurents/:restaurantId/repas/:mealId/order', submitOrder);

// NOUVELLE Route pour la prévisualisation (Résumé) via formId simplifié
router.post('/mobile/restaurents/table/repas/order/preview', previewOrder);
router.post('/mobile/restaurents/:restaurantId/table/:tableId/repas/:mealId/order/preview', previewOrder);

// Routes pour le paiement
router.get('/mobile/restaurents/:restaurantId/table/:tableId/orders/:orderId/preview/payment', getPaymentForm);
router.post('/mobile/restaurents/:restaurantId/table/:tableId/orders/:orderId/preview/payment/confirm-payment', confirmPayment);

module.exports = router;