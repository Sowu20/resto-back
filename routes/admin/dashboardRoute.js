const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/admin/dashboardController');
const auth = require('../../middlewares/authmiddleware');
const role = require('../../middlewares/rolemiddleware');

router.get('/admin/dashboard/statorder', auth, role(['Admin']), dashboardController.StatsOrders);
router.get('/admin/dashboard/revenuchart', auth, role(['Admin']), dashboardController.RevenueChart);
router.get('/admin/dashboard/recent_order', auth, role(['Admin']), dashboardController.RecentOrders);
router.get('/admin/dashboard/top_sell', auth, role(['Admin']), dashboardController.TopSellers);

module.exports = router;