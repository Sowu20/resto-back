const express = require('express');
const router = express.Router();
const categorieController = require('../../controllers/restaurent/categorieController');
const auth = require('../../middlewares/authmiddleware');
const role = require('../../middlewares/rolemiddleware');

router.post('/categorie/:restaurentId', auth, categorieController.createCategorie);
router.get('/categorie/:restaurentId/', auth, categorieController.listCategorie);
router.get('/categorie/:restaurentId/:id', auth, categorieController.detailCategorie);
router.get('/categorie/menu/:restaurentId/:menuId', categorieController.getCategorieMenu);
router.put('/categorie/:restaurentId/:id', auth, categorieController.updateCategorie);
router.delete('/categorie/:restaurentId/:id', auth, categorieController.deleteCategorie);

module.exports = router;