const express = require('express');
const { RegisterForm, HomeScreen, getReader, Restaurents, RestaurentDetail, Menu, Repas } = require('../controllers/jsonappController');

const router = express.Router();

router.get('/mobile', HomeScreen);
router.get('/mobile/forms', RegisterForm);
router.get('/mobile/readers', getReader);
router.get('/mobile/restaurents', Restaurents);
router.get('/mobile/restaurents/:id', RestaurentDetail);
router.get('/mobile/restaurents/:id/menu', Menu);
router.get('/mobile/restaurents/:id/repas', Repas);

module.exports = router;