const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

const auth = require('../middlewares/authmiddleware');
const role = require('../middlewares/rolemiddleware');
const check = require('../middlewares/checkrestaurentmiddleware');

router.post('/table', auth, role(['Restaurateur']), check, tableController.createTable);
router.get('/table', auth, role(['Restaurateur']), tableController.listTable);
router.get('/table/:id', auth, role(['Restaurateur']), tableController.detailTable);
router.put('/table/:id', auth, role(['Restaurateur']), check, tableController.updateTable);
router.delete('/table/:id', auth, check, tableController.deleteTable);
router.get('/table/scan/:qrCode', tableController.scanQrCode);
router.get('/table/menu/:qrCode/', tableController.getMenuandMeal);

module.exports = router;