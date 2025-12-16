const express = require('express');
const router = express.Router();
const repasController = require('../controllers/repasController');

router.post('/repas');
router.get('/repas');
router.get('/repas/:id');
router.put('/repas/:id');
router.delete('/repas/:id');

module.exports = router;