const express = require('express');
const router = express.Router();
const repasController = require('../../controllers/admin/repasAdminController');
const auth = require('../../middlewares/authmiddleware');
const role = require('../../middlewares/rolemiddleware');

router.post('/admin/repas', auth, role(['Admin']), repasController.createRepas);
router.get('/admin/repas', auth, role(['Admin']), repasController.listRepas);
router.get('/admin/repas/categorie/:categorieId', auth, role(['Admin']), repasController.getRepasByCategorie);
router.put('/admin/repas/:id', auth, role(['Admin']), repasController.updateRepas);
router.delete('/admin/repas/:id', auth, role(['Admin']), repasController.deleteMenu);

module.exports = router;