const { mainMenu } = require('../views/menuView/mainMenu');
const { registerForm } = require('../views/formView/registerForm');
const { userReader } = require('../views/readerView/reader');
const { listrestaurentMenu } = require('../views/readerView/listrestaurentReader');
const { createRestaurantDetailReader } = require('../views/readerView/restaurentDetailReader');
const { createMenusGrid } = require('../views/readerView/menusReader');
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

    // Correction: Use createMenusGrid instead of createMenusReader
    const reader = createMenusGrid(restaurantId);

    if (!reader) {
        return res.status(404).json({ error: 'Restaurant non trouvé' });
    }

    // Le reader retourne déjà du JSON via toJSON() dans createMenusGrid
    // ou s'il retourne l'objet view, on doit appeler .toJSON()
    // Vérifions menusReader.js : il fait "return grid.toJSON()".
    // Donc ici on renvoie directement reader.
    res.json(reader);
};

//fonction pour les détails d'un menu
const getMenuDetails = (req, res) => {
    const { restaurantId, menuId } = req.params;

    console.log('Paramètres reçus:', { restaurantId, menuId });
    // Affiche: { restaurantId: '2', menuId: 'brunch-2', actionId: 'brunch-2' }

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
                href: `https://resto-back-xazy.onrender.com/mobile/restaurents/${restaurantId}/menu`
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