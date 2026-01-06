const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');
const auth = require('../middlewares/authmiddleware');

router.post('/categorie', auth, categorieController.createCategorie);
router.get('/categorie', auth, categorieController.listCategorie);
router.get('/categorie/:id', auth, categorieController.detailCategorie);
router.put('/categorie/:id', auth, categorieController.updateCategorie);
router.delete('/categorie/:id', auth, categorieController.deleteCategorie);

module.exports = router;