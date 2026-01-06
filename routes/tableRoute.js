const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');
const auth = require('../middlewares/authmiddleware');

router.post('/table', auth, tableController.createTable);
router.get('/table', auth, tableController.listTable);
router.get('/table/:id', auth, tableController.detailTable);
router.get('/table/scan/:qrCode', tableController.scanQrCode);
router.put('/table/:id', auth, tableController.updateTable);
router.delete('/table/:id', auth, tableController.deleteTable);

module.exports = router;