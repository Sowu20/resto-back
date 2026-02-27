const express = require('express');
const router = express.Router();
const menuController = require('../../controllers/restaurent/menuController');
const auth = require('../../middlewares/authmiddleware');
const upload = require('../../middlewares/upload');

router.post('/menu/:restaurentId', auth, upload.single('image'), menuController.createMenu);
router.get('/menu/:restaurentId', auth, menuController.listMenu);
router.get('/menu/:restaurentId/:id', auth, menuController.detailMenu);
router.put('/menu/:restaurentId/:id', auth, menuController.updateMenu);
router.delete('/menu/:restaurentId/:id', auth, menuController.deleteMenu);

module.exports = router;