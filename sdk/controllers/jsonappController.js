const { createMainMenuView } = require('../views/menuView/mainMenu');
const { registerForm } = require('../views/formView/registerForm');
const { createUserReaderView } = require('../views/readerView/reader');
const { createRestaurantsList } = require('../views/readerView/listrestaurentReader');
const { createRestaurantDetailReader } = require('../views/readerView/restaurentDetailReader');
const Restaurent = require('../../models/Restaurent');
const { createMenusGrid } = require('../views/readerView/menusReader');
const { createMenuDetailView } = require('../views/readerView/menuDetailReader');
const { createRepasReader, createRepasDetailReader } = require('../views/readerView/repasReader');
const { createOrderForm } = require('../views/formView/orderForm');
const { createOrderConfirmationView } = require('../views/messageView/orderConfirmation');
const { createOrderSummaryView } = require('../views/readerView/orderSummary');
const { getMealData } = require('../views/readerView/repasReader');
const { createAboutView } = require('../views/readerView/aboutReader');
const mongoose = require('mongoose');
const sendNotification = require('../../utils/sendNotification');

// Helper pour obtenir l'URL de base dynamiquement
const getBaseUrl = (req) => {
    // On vérifie d'abord si on est en production via un header commun aux proxies (Render, Heroku, etc.)
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    return protocol + '://' + req.get('host');
};

const HomeScreen = (req, res) => {
    const baseUrl = getBaseUrl(req);
    const menu = createMainMenuView(baseUrl);
    res.json(menu.toJSON());
};

const RegisterForm = (req, res) => {
    res.json(registerForm.toJSON());
};

const getReader = (req, res) => {
    const baseUrl = getBaseUrl(req);
    const reader = createUserReaderView(baseUrl);
    res.json(reader.toJSON());
};

const Restaurents = async (req, res) => {
    try {
        const baseUrl = getBaseUrl(req);
        const restaurants = await Restaurent.find();
        const reader = createRestaurantsList(restaurants, baseUrl);
        res.json(reader.toJSON());
    } catch (error) {
        console.error('❌ Erreur Restaurents:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des restaurants' });
    }
};

const RestaurentDetail = async (req, res) => {
    try {
        const restaurantId = req.params.id || req.params.restaurantId;

        // On supporte le tableId via l'URL (req.params) ou via query (?table=x)
        const tableId = req.params.tableId || req.query.table;


        console.log('🔍 Chercher restaurant ID:', restaurantId, '| Table:', tableId);
        const restaurant = await Restaurent.findById(restaurantId);

        if (!restaurant) {
            console.log('⚠️ Restaurant non trouvé:', restaurantId);
            return res.status(404).json({ error: 'Restaurant non trouvé' });
        }

        const baseUrl = getBaseUrl(req);
        const reader = createRestaurantDetailReader(restaurant, tableId, baseUrl);
        res.json(reader.toJSON());
    } catch (error) {
        console.error('❌ Erreur RestaurentDetail:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération du détail du restaurant', details: error.message });
    }
};

const Menu = async (req, res) => {
    try {
        const { id: restaurantId, tableId } = req.params;
        const MenuModel = require('../../models/Menu');

        // Récupérer les menus actifs du restaurant depuis MongoDB
        const menus = await MenuModel.find({
            restaurent: restaurantId,
            isActive: true
        });

        const baseUrl = getBaseUrl(req);
        const reader = createMenusGrid(restaurantId, tableId, menus, baseUrl);

        if (!reader) {
            return res.status(404).json({ error: 'Aucun menu trouvé' });
        }

        res.json(reader);
    } catch (error) {
        console.error('❌ Erreur Menu:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des menus' });
    }
};

//fonction pour les détails d'un menu
const getMenuDetails = async (req, res) => {
    try {
        // ⭐⭐⭐ LOGS DE DEBUG ⭐⭐⭐
        console.log('🔍 =========== DEBUG getMenuDetails ===========');
        console.log('📍 Params reçus:', req.params);

        const { restaurantId, tableId, menuId } = req.params;
        const MenuModel = require('../../models/Menu');
        const RepasModel = require('../../models/Repas');

        // 1. Récupérer le menu
        const menu = await MenuModel.findById(menuId);

        if (!menu) {
            console.log('❌ Menu non trouvé:', menuId);
            return res.status(404).json({
                viewId: 'menu-not-found',
                viewTitle: 'Menu non trouvé',
                viewType: 'message',
                intro: 'Erreur',
                body: `Le menu demandé n'existe pas.`,
                severity: 'error',
                primaryAction: {
                    label: 'Retour aux menus',
                    type: 'GET',
                    href: `${getBaseUrl(req)}/mobile/restaurents/${restaurantId}${tableId ? `/table/${tableId}` : ''}/menu`
                }
            });
        }

        // 2. Récupérer les repas associés à ce menu
        // On suppose que le modèle Repas a un champ 'menu' qui référence le Menu
        const dishes = await RepasModel.find({
            menu: menuId,
            isAvaible: true // Optionnel : ne montrer que les plats dispos
        });

        console.log(`✅ Menu trouvé: ${menu.name}, Plats trouvés: ${dishes.length}`);

        // 3. Générer la vue via le Reader mis à jour
        const baseUrl = getBaseUrl(req);
        const menuDetail = createMenuDetailView(menu, tableId, dishes, baseUrl);

        res.json(menuDetail);
    } catch (error) {
        console.error('❌ Erreur getMenuDetails:', error);
        res.status(500).json({
            error: 'Erreur lors de la récupération du détail du menu',
            details: error.message
        });
    }
};

const Repas = async (req, res) => {
    try {
        const { id: restaurantId, tableId } = req.params;
        const RepasModel = require('../../models/Repas');

        // Récupérer les repas disponibles du restaurant depuis MongoDB
        const repas = await RepasModel.find({
            restaurent: restaurantId,
            isAvaible: true
        });

        const baseUrl = getBaseUrl(req);
        const reader = createRepasReader(restaurantId, tableId, repas, baseUrl);

        if (!reader) {
            return res.status(404).json({ error: 'Aucun repas disponible' });
        }

        res.json(reader);
    } catch (error) {
        console.error('❌ Erreur Repas:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des repas' });
    }
};

const getRepasDetails = async (req, res) => {
    try {
        const { restaurantId, tableId, mealId } = req.params;
        const RepasModel = require('../../models/Repas');

        const repas = await RepasModel.findById(mealId);

        if (!repas) {
            return res.status(404).json({ error: 'Repas non trouvé' });
        }

        const baseUrl = getBaseUrl(req);
        const reader = createRepasDetailReader(restaurantId, tableId, repas, baseUrl);
        return res.json(reader.toJSON());
    } catch (error) {
        console.error('❌ Erreur getRepasDetails:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération du repas' });
    }
};

const getOrderForm = async (req, res) => {
    try {
        const { restaurantId, tableId, mealId } = req.params;
        const RepasModel = require('../../models/Repas');

        const repas = await RepasModel.findById(mealId);

        if (!repas) {
            return res.status(404).json({ error: 'Repas non trouvé' });
        }

        const baseUrl = getBaseUrl(req);
        const form = createOrderForm(
            repas.name,
            `${repas.price} FCFA`,
            restaurantId,
            mealId,
            tableId,
            baseUrl
        );
        res.json(form.toJSON());
    } catch (error) {
        console.error('❌ Erreur getOrderForm:', error);
        res.status(500).json({ error: 'Erreur lors de la création du formulaire' });
    }
};

//Appel au message de confirmation de commande
// const submitOrder = (req, res) => {
//     const { restaurantId, mealId } = req.params;
//     const orderData = req.body;

//     console.log('📦 =========== NOUVELLE COMMANDE REÇUE ===========');
//     console.log('📍 Restaurant ID:', restaurantId);
//     console.log('📍 Meal ID:', mealId);
//     console.log('📍 Données client:', JSON.stringify(orderData, null, 2));
//     console.log('📅 Date:', new Date().toLocaleString());
//     console.log('📦 ==============================================');

//     // On utilise la vue de confirmation externe (on appelle la fonction 
//     // createOrderConfirmationView et on Passe deux paramètres extraits de orderData (customer_name et customer_phone))
//     const successMessage = createOrderConfirmationView(
//         orderData.customer_name,
//         orderData.customer_phone
//     );

//     // Retourner le JSON du SDK
//     return res.json(successMessage.toJSON());
// };

// Nouvelle fonction pour afficher le résumé (Preview) et créer la commande


const previewOrder = async (req, res) => {
    try {
        const { restaurantId: paramResId, mealId: paramMealId, tableId: paramTableId } = req.params;
        const orderData = req.body;
        const { restaurantId: bodyResId, mealId: bodyMealId, tableId: bodyTableId } = orderData;

        const restaurantId = bodyResId || paramResId;
        const mealId = bodyMealId || paramMealId;
        const tableId = bodyTableId || paramTableId;

        const RepasModel = require('../../models/Repas');
        const CommandeModel = require('../../models/Commande');
        const TableModel = require('../../models/Table');

        console.log('📦 =========== CRÉATION COMMANDE ===========');
        console.log('📍 Body reçu:', JSON.stringify(req.body, null, 2));

        // Récupérer le repas depuis la BD
        const repas = await RepasModel.findById(mealId);
        if (!repas) {
            return res.status(404).json({ error: 'Repas non trouvé' });
        }

        // Récupérer la table depuis la BD
        let tableInfo = tableId;
        try {
            const table = await TableModel.findById(tableId);
            if (table) tableInfo = table;
        } catch (e) {
            console.log('⚠️ Erreur récupération table:', e.message);
        }

        // Générer un numéro de commande unique

        //const orderNumber = `CMD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`; Précédent
        const orderNumber = `CMD-${Date.now().toString().slice(-4)}`; // Actuel
        // Créer la commande dans MongoDB
        const newOrder = await CommandeModel.create({
            order_number: orderNumber,
            customer_name: orderData.customer_name,
            customer_phone: orderData.customer_phone,
            payment_method: orderData.payment_method,
            items: [{
                repas: mealId,
                name: repas.name,
                price: repas.price,
                image: repas.image || '',
                quantite: 1,
                total: repas.price
            }],
            total_amount: repas.price,
            status: 'en_attente',
            payment_status: 'en_attente',
            restaurent: restaurantId,
            table: tableId ? new mongoose.Types.ObjectId(tableId) : undefined // Conversion seulement si présent
        });

        console.log('✅ Commande créée:', newOrder._id);

        // Notification automatique au restaurateur
        try {
            await sendNotification({
                userId: restaurantId,
                titre: 'Nouvelle commande',
                contenu: `Vous avez reçu une nouvelle commande (${orderNumber}) de ${orderData.customer_name || 'Client'} !`,
                type: 'commande'
            });
            console.log('🔔 Notification envoyée au restaurateur');
        } catch (notifError) {
            console.error('⚠️ Erreur lors de l\'envoi de la notification:', notifError.message);
            // On ne bloque pas la réponse client si la notification échoue
        }

        // Afficher le résumé avec bouton de paiement
        const baseUrl = getBaseUrl(req);
        const summaryView = createOrderSummaryView(
            orderData.customer_name || 'Client',
            orderData.customer_phone || '-',
            repas.name || 'Plat',
            `${repas.price || 0} FCFA`,
            restaurantId || '',
            mealId || '',
            newOrder._id.toString(),
            tableInfo,
            repas.image || '',
            baseUrl
        );

        return res.json(summaryView.toJSON());
    } catch (error) {
        console.error('❌ Erreur CRITIQUE dans previewOrder:', error);
        return res.status(500).json({
            error: 'Erreur lors de la création de la commande',
            details: error.message
        });
    }
};

//Fonction pour le scanner
const getScanView = (req, res) => {
    const { scanView } = require('../views/scannerView/scanView');
    res.json(scanView.toJSON());
};

const getAboutView = (req, res) => {
    const baseUrl = getBaseUrl(req);
    const about = createAboutView(baseUrl);
    res.json(about.toJSON());
};

// Fonction pour afficher l'interface de paiement
const getPaymentForm = async (req, res) => {
    try {
        const { restaurantId, tableId, orderId } = req.params;
        const CommandeModel = require('../../models/Commande');

        const order = await CommandeModel.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Commande non trouvée' });
        }

        const baseUrl = getBaseUrl(req);
        const { createPaymentView } = require('../views/formView/paymentForm');
        const paymentView = createPaymentView(order, restaurantId, tableId, baseUrl);
        res.json(paymentView.toJSON());
    } catch (error) {
        console.error('❌ Erreur getPaymentForm:', error);
        res.status(500).json({ error: 'Erreur lors de l\'affichage du paiement' });
    }
};

// Fonction pour confirmer le paiement
const confirmPayment = async (req, res) => {
    try {
        const { restaurantId, tableId, orderId } = req.params;
        const CommandeModel = require('../../models/Commande');
        const TableModel = require('../../models/Table');

        // Mettre à jour le statut de paiement
        const order = await CommandeModel.findByIdAndUpdate(
            orderId,
            {
                payment_status: 'paye',
                status: 'en_attente' // Commande en attente de préparation
            },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ error: 'Commande non trouvée' });
        }

        // Récupérer la table correspondant à la commande
        let tableInfo = order.table ? order.table.toString() : null;
        try {
            if (order.table) {
                const table = await TableModel.findById(order.table);
                if (table) tableInfo = table;
            }
        } catch (e) {
            console.log('⚠️ Erreur récupération table après paiement:', e.message);
        }

        // Afficher la confirmation
        const baseUrl = getBaseUrl(req);
        const confirmationView = createOrderConfirmationView(
            order.customer_name,
            order.customer_phone,
            order.order_number,
            tableInfo,
            baseUrl
        );

        res.json(confirmationView.toJSON());
    } catch (error) {
        console.error('❌ Erreur confirmPayment:', error);
        res.status(500).json({ error: 'Erreur lors de la confirmation du paiement' });
    }
};

module.exports = {
    HomeScreen,
    RegisterForm,
    getReader,
    Restaurents,
    RestaurentDetail,
    Menu,
    Repas,
    getMenuDetails,
    getRepasDetails,
    getOrderForm,
    previewOrder,
    getScanView,
    getAboutView,
    getPaymentForm,
    confirmPayment
};