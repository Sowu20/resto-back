const express = require('express');
const router = express.Router();
const { subscribe } = require('../controllers/pushController');
const auth = require('../middlewares/authmiddleware');

router.post('/subscribe', auth, subscribe);

module.exports = router;