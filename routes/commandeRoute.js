const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');
const auth = require('../middlewares/authmiddleware');

router.post('/commande', auth, commandeController.createCommande);
router.post('/commande', commandeController.faireCommande);
router.get('/commande', auth, commandeController.listCommande);
router.get('/commande/:id', auth, commandeController.detailCommande);
router.put('/commande/:id', auth, commandeController.updateCommande);
router.delete('/commande/:id', auth, commandeController.deleteCommande);
router.get('/commande/:restaurentId/stats', commandeController.getStats);
router.get('/commande/:restaurentId/revenus', commandeController.getRevenus);
router.get('/commande/:restaurentId/status', commandeController.getStatusCommande);
router.get('/commande/:restaurentId/meilleurs_ventes', commandeController.getMeilleuresVentes);
router.get('/commande/:restaurentId/commandes_recente', commandeController.getCommandesRecentes);

module.exports = router;