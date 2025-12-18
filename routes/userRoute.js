const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user', userController.listUser);
router.get('/user/:id', userController.detailUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;