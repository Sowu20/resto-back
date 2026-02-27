const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/admin/commandeAdminController');
const auth = require('../../middlewares/authmiddleware');
const role = require('../../middlewares/rolemiddleware');

router.get('/admin/commandes', auth, role(['Admin']), orderController.listCommande);
router.get('/admin/commandes/stats', auth, role(['Admin']), orderController.getAdminStats);

module.exports = router;