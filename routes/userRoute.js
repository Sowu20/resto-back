const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const auth = require('../middlewares/authmiddleware');
const role = require('../middlewares/rolemiddleware');
const check = require('../middlewares/checkusermiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user',auth, role(['Admin']), userController.listUser);
router.get('/user/:id', auth, check, userController.detailUser);
router.put('/user/:id', auth, check, userController.updateUser);
router.delete('/user/:id', auth, role(['Admin']), userController.deleteUser);

module.exports = router;