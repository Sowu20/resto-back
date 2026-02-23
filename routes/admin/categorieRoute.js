const express = require('express');
const router = express.Router();
const categorieController = require('../../controllers/admin/categorieAdminController');
const auth = require('../../middlewares/authmiddleware');
const role = require('../../middlewares/rolemiddleware');

router.post('/admin/categorie', auth, role(['Admin']), categorieController.createCategorie);
router.get('/admin/categorie', auth, role(['Admin']), categorieController.listCategorie);
router.get('/admin/categorie/menu/:menuId', auth, role(['Admin']), categorieController.getCategorieMenu);
router.put('/admin/categorie/:id', auth, role(['Admin']), categorieController.updateCategorie);
router.delete('/admin/categorie/:id', auth, role(['Admin']), categorieController.deleteCategorie);

module.exports = router;