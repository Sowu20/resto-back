const express = require('express');
const router = express.Router();
const commandeController = require('../../controllers/restaurent/commandeController');
const auth = require('../../middlewares/authmiddleware');
const role = require('../../middlewares/rolemiddleware');

router.post('/order/:restaurentId', commandeController.faireCommande);
router.get('/order/:restaurentId', auth, commandeController.listCommande);
router.get('/order/:restaurentId/:id', auth, commandeController.detailCommande);
router.get('/order/stats/:restaurentId', auth, commandeController.getStats);
router.get('/order/revenus/:restaurentId', auth, commandeController.getRevenus);
router.get('/order/status/:restaurentId', auth, commandeController.getStatusCommande);
router.get('/order/meilleurs_ventes/:restaurentId', auth, commandeController.getMeilleuresVentes);
router.get('/order/commandes_recente/:restaurentId', auth, commandeController.getCommandesRecentes);
router.put('/order/:restaurentId/:id', auth, commandeController.updateCommande);
router.delete('/order/:restaurentId/:id', auth, commandeController.deleteCommande);

module.exports = router;