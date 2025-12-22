const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');
const auth = require('../middlewares/authmiddleware');

router.post('/commande', auth, commandeController.createCommande);
router.get('/commande', auth, commandeController.listCommande);
router.get('/commande/:id', auth, commandeController.detailCommande);
router.put('/commande/:id', auth, commandeController.updateCommande);
router.delete('/commande/:id', auth, commandeController.deleteCommande);

module.exports = router;