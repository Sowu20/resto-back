const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.post('/register');
router.post('/login');
router.get('/user');
router.get('/user/:id');
router.put('/user/:id');
router.delete('/user/:id');

module.exports = router;