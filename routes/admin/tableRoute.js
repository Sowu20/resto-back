const express = require('express');
const router = express.Router();
const tableController = require('../../controllers/admin/tableAdminController');
const auth = require('../../middlewares/authmiddleware');
const role = require('../../middlewares/rolemiddleware');

router.post('/admin/table', auth, role(['Admin']), tableController.createTable);
router.get('/admin/table', auth, role(['Admin']), tableController.listTable);
router.get('/admin/table/stats', auth, role(['Admin']), tableController.statsTable);
router.get('/admin/table/:id', auth, role(['Admin']), tableController.detailTable);
router.put('/admin/table/:id', auth, role(['Admin']), tableController.updateTable);
router.delete('/admin/table/:id', auth, role(['Admin']), tableController.deleteTable);

module.exports = router;