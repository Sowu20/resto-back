const express = require('express');
const { RegisterForm, HomeScreen, getReader, Restaurents, RestaurentDetail, Menu, Repas, Categories, RepasByCategory, getMenuDetails, getRepasDetails, getOrderForm, submitOrder, previewOrder, getScanView, getAboutView, getPaymentForm, confirmPayment } = require('../controllers/jsonappController');

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
router.get('/mobile/restaurents/:restaurantId', RestaurentDetail);
router.get('/mobile/restaurents/:restaurantId/table/:tableId', RestaurentDetail);
router.get('/mobile/restaurents/:restaurantId/table/:tableId/menu', Menu);
router.get('/mobile/restaurents/:restaurantId/menu', Menu); // Sans tableId
// NOUVELLE route pour les détails d'un menu
router.get('/mobile/restaurents/:restaurantId/table/:tableId/menu/:menuId', getMenuDetails);
router.get('/mobile/restaurents/:restaurantId/menu/:menuId', getMenuDetails); // Sans tableId

// NOUVELLE route pour les categories
router.get('/mobile/restaurents/:restaurantId/table/:tableId/categories', Categories);
router.get('/mobile/restaurents/:restaurantId/categories', Categories); // Sans tableId

// NOUVELLE route pour les plats par categorie 
router.get('/mobile/restaurents/:restaurantId/table/:tableId/categories/:categoryId', RepasByCategory);
router.get('/mobile/restaurents/:restaurantId/categories/:categoryId', RepasByCategory); // Sans tableId
router.get('/mobile/restaurents/:restaurantId/table/:tableId/categories/:categoryId/repas', RepasByCategory);
router.get('/mobile/restaurents/:restaurantId/categories/:categoryId/repas', RepasByCategory); // Sans tableId

// NOUVELLE route pour les plats
router.get('/mobile/restaurents/:restaurantId/table/:tableId/repas', Repas);
router.get('/mobile/restaurents/:restaurantId/repas', Repas); // Sans tableId

// NOUVELLE route pour les détails d'un plat (avec et sans catégorie)
// 1. Routes de RÉSILIENCE (pour corriger l'erreur 404 en production : manque /repas/)
router.get('/mobile/restaurents/:restaurantId/table/:tableId/categories/:categoryId/:mealId', getRepasDetails);
router.get('/mobile/restaurents/:restaurantId/categories/:categoryId/:mealId', getRepasDetails);

// 2. Nouveau format avec /details (URL que vous venez d'ajouter)
router.get('/mobile/restaurents/:restaurantId/table/:tableId/categories/:categoryId/repas/:mealId/details', getRepasDetails);
router.get('/mobile/restaurents/:restaurantId/categories/:categoryId/repas/:mealId/details', getRepasDetails);
router.get('/mobile/restaurents/:restaurantId/table/:tableId/repas/:mealId/details', getRepasDetails);
router.get('/mobile/restaurents/:restaurantId/repas/:mealId/details', getRepasDetails); // Sans tableId

// 3. Format standard sans /details (pour la compatibilité descendante)
router.get('/mobile/restaurents/:restaurantId/table/:tableId/categories/:categoryId/repas/:mealId', getRepasDetails);
router.get('/mobile/restaurents/:restaurantId/categories/:categoryId/repas/:mealId', getRepasDetails);
router.get('/mobile/restaurents/:restaurantId/table/:tableId/repas/:mealId', getRepasDetails);
router.get('/mobile/restaurents/:restaurantId/repas/:mealId', getRepasDetails); // Sans tableId

// Route pour afficher le formulaire de commande (avec et sans catégorie)
router.get('/mobile/restaurents/:restaurantId/table/:tableId/categories/:categoryId/repas/:mealId/order', getOrderForm);
router.get('/mobile/restaurents/:restaurantId/categories/:categoryId/repas/:mealId/order', getOrderForm);
router.get('/mobile/restaurents/:restaurantId/table/:tableId/repas/:mealId/order', getOrderForm);
router.get('/mobile/restaurents/:restaurantId/repas/:mealId/order', getOrderForm); // Sans tableId

// Route pour soumettre la commande (POST)
//router.post('/mobile/restaurents/:restaurantId/repas/:mealId/order', submitOrder);

// NOUVELLE Route pour la prévisualisation (Résumé) (avec et sans catégorie)
router.post('/mobile/restaurents/:restaurantId/table/:tableId/categories/:categoryId/repas/:mealId/order/preview', previewOrder);
router.post('/mobile/restaurents/:restaurantId/categories/:categoryId/repas/:mealId/order/preview', previewOrder);
router.post('/mobile/restaurents/table/repas/order/preview', previewOrder);
router.post('/mobile/restaurents/:restaurantId/table/:tableId/repas/:mealId/order/preview', previewOrder);
router.post('/mobile/restaurents/:restaurantId/repas/:mealId/order/preview', previewOrder); // Sans tableId
// Le SDK city-mate poste vers l'URL de la page /order (avec slash final)
router.post('/mobile/restaurents/:restaurantId/table/:tableId/repas/:mealId/order', previewOrder);
router.post('/mobile/restaurents/:restaurantId/repas/:mealId/order', previewOrder); // Sans tableId
router.post('/mobile/restaurents/:restaurantId/table/:tableId/repas/:mealId/order/', previewOrder);
router.post('/mobile/restaurents/:restaurantId/repas/:mealId/order/', previewOrder); // Sans tableId

// Routes pour le paiement (avec et sans catégorie)
router.get('/mobile/restaurents/:restaurantId/table/:tableId/categories/:categoryId/order/:orderId/payment', getPaymentForm);
router.get('/mobile/restaurents/:restaurantId/categories/:categoryId/order/:orderId/payment', getPaymentForm);
router.get('/mobile/restaurents/:restaurantId/table/:tableId/order/:orderId/payment', getPaymentForm);
router.get('/mobile/restaurents/:restaurantId/order/:orderId/payment', getPaymentForm); // Sans tableId
router.get('/mobile/restaurents/:restaurantId/table/:tableId/repas/:mealId/order/:orderId/payment', getPaymentForm);
router.get('/mobile/restaurents/:restaurantId/repas/:mealId/order/:orderId/payment', getPaymentForm);

router.post('/mobile/restaurents/:restaurantId/table/:tableId/categories/:categoryId/order/:orderId/payment/confirm', confirmPayment);
router.post('/mobile/restaurents/:restaurantId/categories/:categoryId/order/:orderId/payment/confirm', confirmPayment);
router.post('/mobile/restaurents/:restaurantId/table/:tableId/order/:orderId/payment/confirm', confirmPayment);
router.post('/mobile/restaurents/:restaurantId/order/:orderId/payment/confirm', confirmPayment); // Sans tableId
router.post('/mobile/restaurents/:restaurantId/table/:tableId/repas/:mealId/order/:orderId/payment/confirm', confirmPayment);
router.post('/mobile/restaurents/:restaurantId/repas/:mealId/order/:orderId/payment/confirm', confirmPayment);

module.exports = router;