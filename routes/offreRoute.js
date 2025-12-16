const express = require('express');
const router = express.Router();
const offreController = require('../controllers/offreController');

router.post('/offre');
router.get('/offre');
router.get('/offre/:id');
router.get('/offre/:id');
router.delete('/offre/:id');

module.exports = router;