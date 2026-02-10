const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');
const admincommandeController = require('../controllers/admincommandeController');
const auth = require('../middlewares/authmiddleware');
const role = require('../middlewares/rolemiddleware');

router.post('/commande', auth, commandeController.createCommande);
router.post('/commande', commandeController.faireCommande);
router.get('/commande', auth, commandeController.listCommande);
router.get('/commande/admin/status', auth, role(['Admin']), admincommandeController.CommandesStats);
router.get('/commande/admin/statorder', auth, role(['Admin']), admincommandeController.StatOrders);
router.get('/commande/admin/listcommande', auth, role(['Admin']), admincommandeController.listCommande);
router.get('/commande/admin/revenuchart', auth, role(['Admin']), admincommandeController.RevenuChart);
router.get('/commande/admin/recent_order', auth, role(['Admin']), admincommandeController.RecentOrders);
router.get('/commande/admin/top_sell', auth, role(['Admin']), admincommandeController.topSellingMeals)
router.get('/commande/:id', auth, commandeController.detailCommande);
router.put('/commande/:id', auth, commandeController.updateCommande);
router.delete('/commande/:id', auth, commandeController.deleteCommande);
router.get('/commande/:restaurentId/stats', auth, commandeController.getStats);
router.get('/commande/:restaurentId/revenus', auth, commandeController.getRevenus);
router.get('/commande/:restaurentId/status', auth, commandeController.getStatusCommande);
router.get('/commande/:restaurentId/meilleurs_ventes', auth, commandeController.getMeilleuresVentes);
router.get('/commande/:restaurentId/commandes_recente', auth, commandeController.getCommandesRecentes);

module.exports = router;