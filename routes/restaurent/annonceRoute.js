const express = require('express');
const router = express.Router();
const annonceController = require('../../controllers/restaurent/annonceController');
const auth = require('../../middlewares/authmiddleware');
const role = require('../../middlewares/rolemiddleware');

router.post('/annonce', auth, role(['restaurant', 'Admin']), annonceController.createAnnonce);
router.get('/annonce', auth, role(['restaurant', 'Admin']), annonceController.listAnnonce);
router.get('/annonce/:id', auth, role(['restaurant', 'Admin']), annonceController.detailAnnonce);
router.put('/annonce/:id', auth, role(['restaurant', 'Admin']), annonceController.updateAnnonce);
router.delete('/annonce/:id', auth, role(['restaurant', 'Admin']), annonceController.deleteAnnonce);

module.exports = router;