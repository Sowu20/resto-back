const express = require('express');
const router = express.Router();
const tableController = require('../../controllers/restaurent/tableController');
const auth = require('../../middlewares/authmiddleware');

router.post('/table/:restaurentId', auth, tableController.createTable);
router.get('/table/:restaurentId', auth, tableController.listTable);
router.get('/table/stats/:restaurentId', auth, tableController.statsTable);
router.get('/table/search/:restaurentId', auth, tableController.searchTable);
router.get('/table/scan/:qrCode', tableController.scanQrCode);
router.get('/table/menu/:qrCode/', tableController.getMenuandMeal);
router.get('/table/:restaurent/:id', auth, tableController.detailTable);
router.put('/table/:restaurentId/:id', auth, tableController.updateTable);
router.delete('/table/:restaurentId/:id', auth, tableController.deleteTable);

module.exports = router;