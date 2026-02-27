const express = require('express');
const router = express.Router();
const tableController = require('../../controllers/restaurent/tableController');

const auth = require('../../middlewares/authmiddleware');
const role = require('../../middlewares/rolemiddleware');
const check = require('../../middlewares/checkrestaurentmiddleware');

router.post('/table', auth, role(['Admin', 'restaurent']), check, tableController.createTable);
router.get('/table', auth, role(['Admin', 'restaurent']), tableController.listTable);
router.get('/table/:id', auth, role(['Admin', 'restaurent']), tableController.detailTable);
router.put('/table/:id', auth, role(['Admin', 'restaurent']), check, tableController.updateTable);
router.delete('/table/:id', auth, check, tableController.deleteTable);
router.get('/table/scan/:qrCode', tableController.scanQrCode);
router.get('/table/menu/:qrCode/', tableController.getMenuandMeal);

module.exports = router;