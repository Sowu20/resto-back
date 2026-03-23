const express = require('express');
const router = express.Router();
const { subscribe } = require('../controllers/pushController');

router.post('/subscribe', subscribe);

module.exports = router;