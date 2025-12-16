const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');

router.post('/commande');
router.get('/commande');
router.get('/commande/:id');
router.put('/commande/:id');
router.delete('/commande/:id');

module.exports = router;