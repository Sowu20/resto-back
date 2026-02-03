const express = require('express');
const router = express.Router();
const repasController = require('../controllers/repasController');
const auth = require('../middlewares/authmiddleware');
const role = require('../middlewares/rolemiddleware');

router.post('/repas', auth, repasController.createRepas);
router.get('/repas', auth, repasController.listRepas);
router.get('/repas/:id', auth, repasController.detailRepas);
router.put('/repas/:id', auth, repasController.updateRepas);
router.delete('/repas/:id', auth, repasController.deleteMenu);
router.get('/repas/categorie/:categorieId/repas', auth, role(['restaurant','Admin']), repasController.getRepasByCategorie);
module.exports = router;