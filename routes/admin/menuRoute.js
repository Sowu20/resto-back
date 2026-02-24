const express = require('express');
const router = express.Router();
const menuController = require('../../controllers/admin/menuAdminController');
const auth = require('../../middlewares/authmiddleware');
const role = require('../../middlewares/rolemiddleware');
const upload = require('../../middlewares/upload');

router.post('/admin/menu', auth, role(['Admin']), upload.single('image'), menuController.createMenu);
router.get('/admin/menu', auth, role(['Admin']), menuController.listMenu);
router.get('/admin/menu/:id', auth, role(['Admin']), menuController.detailMenu);
router.put('/admin/menu/:id', auth, role(['Admin']), menuController.updateMenu);
router.delete('/admin/menu/:id', auth, role(['Admin']), menuController.deleteMenu);

module.exports = router;