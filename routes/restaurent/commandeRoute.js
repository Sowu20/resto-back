const express = require('express');
const router = express.Router();
const commandeController = require('../../controllers/restaurent/commandeController');
const auth = require('../../middlewares/authmiddleware');
const role = require('../../middlewares/rolemiddleware');

router.post('/commande/:restaurentId', commandeController.faireCommande);
router.get('/order/:restaurentId', auth, commandeController.listCommande);
router.get('/order/:restaurentId/stats', auth, commandeController.getStats);
router.get('/commande/:restaurentId/revenus', auth, commandeController.getRevenus);
router.get('/commande/:restaurentId/status', auth, commandeController.getStatusCommande);
router.get('/commande/:restaurentId/meilleurs_ventes', auth, commandeController.getMeilleuresVentes);
router.get('/commande/:restaurentId/commandes_recente', auth, commandeController.getCommandesRecentes);
router.get('/commande/:restaurentId/:id', auth, commandeController.detailCommande);
router.put('/commande/:restaurentId/:id', auth, commandeController.updateCommande);
router.delete('/commande/:id', auth, commandeController.deleteCommande);

module.exports = router;