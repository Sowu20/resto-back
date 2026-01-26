const { mainMenu } = require('../views/menuView/mainMenu');
const { registerForm } = require('../views/formView/registerForm');
const { userReader } = require('../views/readerView/reader');
const { listrestaurentMenu } = require('../views/readerView/listrestaurentReader');
const { createRestaurantDetailReader } = require('../views/readerView/restaurentDetailReader');
const { createMenusGrid } = require('../views/readerView/menusReader');
const { createMenuDetailView } = require('../views/readerView/menuDetailReader');
const { createRepasReader, createRepasDetailReader } = require('../views/readerView/repasReader');
const { createOrderForm } = require('../views/formView/orderForm');

const HomeScreen = (req, res) => {
    res.json(mainMenu.toJSON());
};

const RegisterForm = (req, res) => {
    res.json(registerForm.toJSON());
};

const getReader = (req, res) => {
    res.json(userReader.toJSON());
};

const Restaurents = (req, res) => {
    res.json(listrestaurentMenu.toJSON());
};

const RestaurentDetail = (req, res) => {
    const restaurantId = req.params.id;  // Récupère l'ID depuis l'URL

    const reader = createRestaurantDetailReader(restaurantId);

    if (!reader) {
        return res.status(404).json({ error: 'Restaurant non trouvé' });
    }

    res.json(reader.toJSON());
};

const Menu = (req, res) => {
    const restaurantId = req.params.id;  // Récupère l'ID depuis l'URL

    // Correction: Use createMenusGrid instead of createMenusReader
    const reader = createMenusGrid(restaurantId);

    if (!reader) {
        return res.status(404).json({ error: 'Restaurant non trouvé' });
    }

    res.json(reader);
};

//fonction pour les détails d'un menu
const getMenuDetails = (req, res) => {
    // ⭐⭐⭐ LOGS DE DEBUG ⭐⭐⭐
    console.log('🔍 =========== DEBUG getMenuDetails ===========');
    console.log('📍 URL complète:', req.originalUrl);
    console.log('📍 Méthode HTTP:', req.method);
    console.log('📍 Params reçus:', req.params);
    console.log('📍 Query params:', req.query);
    console.log('📍 Headers:', {
        'user-agent': req.headers['user-agent'],
        'x-app-version': req.headers['x-app-version'] || 'non spécifié'
    });
    console.log('📍 Timestamp:', new Date().toISOString());
    console.log('🔍 ===========================================');

    const { restaurantId, menuId } = req.params;

    // Log supplémentaire pour voir ce qu'on extrait
    console.log('📋 Paramètres extraits:', { restaurantId, menuId });

    // Détermine l'ID à utiliser
    const actualMenuId = menuId;
    console.log('🎯 ID du menu à chercher:', actualMenuId);

    const menuDetail = createMenuDetailView(actualMenuId);

    if (!menuDetail) {
        console.log('❌ Menu non trouvé:', actualMenuId);
        return res.status(404).json({
            viewId: 'menu-not-found',
            viewTitle: 'Menu non trouvé',
            viewType: 'message',
            intro: 'Erreur',
            body: `Menu ${actualMenuId} non trouvé.`,
            severity: 'error',
            primaryAction: {
                label: 'Retour aux menus',
                type: 'GET',
                href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/menu`
            }
        });
    }

    console.log('✅ Menu trouvé, envoi de la vue');
    res.json(menuDetail);
};

const Repas = (req, res) => {
    const restaurantId = req.params.id;  // Récupère l'ID depuis l'URL

    const reader = createRepasReader(restaurantId);

    if (!reader) {
        return res.status(404).json({ error: 'Restaurant non trouvé' });
    }

    res.json(reader);
};

const getRepasDetails = (req, res) => {
    const { restaurantId, mealId } = req.params;
    const reader = createRepasDetailReader(restaurantId, mealId);

    if (!reader) {
        return res.status(404).json({ error: 'Repas non trouvé' });
    }

    res.json(reader.toJSON());
};

const getOrderForm = (req, res) => {
    const { restaurantId, mealId } = req.params;

    // Pour récupérer les infos du plat, on utilise une fonction helper (à ajouter dans repasReader)
    // ou on pourrait importer les données directement.
    // Pour simplifier ici, on va supposer qu'on a besoin d'importer platsData ou un helper.
    // Ajoutons un helper dans repasReader.js d'abord.

    // Temporaire: appelons createRepasDetailReader pour avoir le CardView et extraire le titre/prix?
    // Un peu bête. Mieux vaut modifier repasReader.js pour exporter une fonction getMealInfo.

    // Approche : On va modifer repasReader.js dans la foulée pour exporter 'getMealInfo'.

    // Supposons que getMealInfo existe (je vais l'ajouter juste après).
    const { getMealData } = require('../views/readerView/repasReader');
    const meal = getMealData(restaurantId, mealId);

    if (!meal) {
        return res.status(404).json({ error: 'Repas non trouvé pour commande' });
    }

    const form = createOrderForm(meal.nom, meal.price, restaurantId, mealId);
    res.json(form.toJSON());
};

const submitOrder = (req, res) => {
    const { restaurantId, mealId } = req.params;
    const orderData = req.body;

    console.log('📦 =========== NOUVELLE COMMANDE REÇUE ===========');
    console.log('📍 Restaurant ID:', restaurantId);
    console.log('📍 Meal ID:', mealId);
    console.log('📍 Données client:', JSON.stringify(orderData, null, 2));
    console.log('📅 Date:', new Date().toLocaleString());
    console.log('📦 ==============================================');

    // On simule une réponse de succès avec une vue de type message (ou équivalent via le SDK)
    res.json({
        viewId: `order-success-${Date.now()}`,
        viewTitle: 'Commande Réussie !',
        viewType: 'message',
        intro: 'Succès',
        body: `Merci ${orderData.customer_name || 'cher client'} ! Votre commande a été reçue. Nous vous contacterons au ${orderData.customer_phone || 'votre numéro'} si besoin.`,
        severity: 'success',
        primaryAction: {
            label: 'Retour à l\'accueil',
            type: 'GET',
            href: 'https://resto-back-xazy.onrender.com/mobile'
        }
    });
};

module.exports = { HomeScreen, RegisterForm, getReader, Restaurents, RestaurentDetail, Menu, Repas, getMenuDetails, getRepasDetails, getOrderForm, submitOrder };