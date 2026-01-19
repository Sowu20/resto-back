const express = require('express'); 
const { getForm, getMenu, getReader, getlistRestaurent, getRestaurent } = require('../controllers/jsonappController');

const router = express.Router();

router.get('/action', getMenu);
router.get('/forms', getForm);
router.get('/readers', getReader);
router.get('/listrestaurent', getlistRestaurent);
router.get('/restaurent', getRestaurent);

module.exports = router;