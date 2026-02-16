const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/admin/dashboardController');
const auth = require('../../middlewares/authmiddleware');
const role = require('../../middlewares/rolemiddleware');

router.get('/dashboard/admin/status', auth, role(['Admin']), dashboardController.CommandesStats);
router.get('/dashboard/admin/statorder', auth, role(['Admin']), dashboardController.StatOrders);
router.get('/dashboard/admin/listcommande', auth, role(['Admin']), dashboardController.listCommande);
router.get('/dashboard/admin/revenuchart', auth, role(['Admin']), dashboardController.RevenuChart);
router.get('/dashboard/admin/recent_order', auth, role(['Admin']), dashboardController.RecentOrders);
router.get('/dashboard/admin/top_sell', auth, role(['Admin']), dashboardController.topSellingMeals);

module.exports = router;