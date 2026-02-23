const express = require('express');
const router = express.Router();
const repasController = require('../../controllers/restaurent/repasController');
const auth = require('../../middlewares/authmiddleware');
const role = require('../../middlewares/rolemiddleware');
const upload = require('../../middlewares/upload');

router.post('/repas/:restaurentId', auth, upload.single('image'), repasController.createRepas);
router.get('/repas/:restaurentId', auth, repasController.listRepas);
router.get('/repas/:restaurentId/:id', auth, repasController.detailRepas);
router.put('/repas/:restaurentId/:id', auth, repasController.updateRepas);
router.delete('/repas/:restaurentId/:id', auth, repasController.deleteMenu);
router.get('/repas/categorie/:restaurentId/:categorieId', auth, repasController.getRepasByCategorie);

module.exports = router;