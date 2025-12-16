const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');

router.post('/promotion');
router.get('/promotion');
router.get('/promotion/:id');
router.get('/promotion/:id');
router.delete('/promotion/:id');

module.exports = router;