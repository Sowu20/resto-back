const { mainMenu } = require('../views/menuView/mainMenu');
const { registerForm } = require('../views/formView/registerForm');
const { userReader } = require('../views/readerView/reader');
const { listrestaurentMenu } = require('../views/readerView/listrestaurentReader');
const { createRestaurantDetailReader } = require('../views/readerView/restaurentDetailReader');
const { createMenusReader } = require('../views/readerView/menusReader');
const { createMenuDetailView } = require('../views/readerView/menuDetailReader');
const { createRepasReader } = require('../views/readerView/repasReader');

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

    const reader = createMenusReader(restaurantId);

    if (!reader) {
        return res.status(404).json({ error: 'Restaurant non trouvé' });
    }

    res.json(reader.toJSON());
};

//fonction pour les détails d'un menu
const getMenuDetails = (req, res) => {
    const { restaurantId, menuId } = req.params;
    const menuDetail = createMenuDetailView(menuId);

    if (!menuDetail) {
        return res.status(404).json({
            viewId: 'menu-not-found',
            viewTitle: 'Menu non trouvé',
            viewType: 'message',
            intro: 'Erreur',
            body: 'Le menu demandé n\'existe pas.',
            severity: 'error',
            primaryAction: {
                label: 'Retour aux menus',
                type: 'GET',
                href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/menus`
            }
        });
    }

    res.json(menuDetail);
};

const Repas = (req, res) => {
    const restaurantId = req.params.id;  // Récupère l'ID depuis l'URL

    const reader = createRepasReader(restaurantId);

    if (!reader) {
        return res.status(404).json({ error: 'Restaurant non trouvé' });
    }

    res.json(reader.toJSON());
};

module.exports = { HomeScreen, RegisterForm, getReader, Restaurents, RestaurentDetail, Menu, Repas, getMenuDetails };