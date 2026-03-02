const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/admin/commandeAdminController');
const auth = require('../../middlewares/authmiddleware');
const role = require('../../middlewares/rolemiddleware');

router.post('/admin/order', auth, role(['Admin']), orderController.createCommande);
router.get('/admin/order', auth, role(['Admin']), orderController.listCommande);
router.get('/admin/order/stats', auth, role(['Admin']), orderController.getAdminStats);
router.get('/admin/order/:id', auth, role(['Admin']), orderController.detailCommande);
router.put('/admin/order/:id', auth, role(['Admin']), orderController.updateCommande);
router.delete('/admin/order/:id', auth, role(["Admin"]), orderController.deleteCommande);

module.exports = router;