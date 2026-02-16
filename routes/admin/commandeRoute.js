const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/admin/commandeAdminController');
const auth = require('../../middlewares/authmiddleware');
const role = require('../../middlewares/rolemiddleware');

module.exports = router;