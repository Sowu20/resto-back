const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const auth = require('../controllers/authController');

router.post('/menu', auth, menuController.createMenu);
router.get('/menu', auth, menuController.listMenu);
router.get('/menu/:id', auth, menuController.detailMenu);
router.put('/menu/:id', auth, menuController.updateMenu);
router.delete('/menu/:id', auth, menuController.deleteMenu);

module.exports = router;