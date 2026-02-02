const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');
const admincommandeController = require('../controllers/admincommandeController');
const auth = require('../middlewares/authmiddleware');

router.post('/commande', auth, commandeController.createCommande);
router.post('/commande', commandeController.faireCommande);
router.get('/commande', auth, commandeController.listCommande);
router.get('/commande/statorder', auth, admincommandeController.getCommandesStats);
router.get('/commande/listcommande', auth, admincommandeController.getlistCommande);
router.get('/commande/:id', auth, commandeController.detailCommande);
router.put('/commande/:id', auth, commandeController.updateCommande);
router.delete('/commande/:id', auth, commandeController.deleteCommande);
router.get('/commande/:restaurentId/stats', auth, commandeController.getStats);
router.get('/commande/:restaurentId/revenus', auth, commandeController.getRevenus);
router.get('/commande/:restaurentId/status', auth, commandeController.getStatusCommande);
router.get('/commande/:restaurentId/meilleurs_ventes', auth, commandeController.getMeilleuresVentes);
router.get('/commande/:restaurentId/commandes_recente', auth, commandeController.getCommandesRecentes);

module.exports = router;