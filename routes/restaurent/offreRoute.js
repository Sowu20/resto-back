const express = require('express');
const router = express.Router();
const offreController = require('../controllers/offreController');
const auth = require('../../middlewares/authmiddleware');
const role = require('../../middlewares/rolemiddleware');

router.post('/offre', auth, role(['Admin', 'restaurent']), offreController.createOffre);
router.get('/offre', auth, role(['Admin', 'restaurent']), offreController.listOffre);
router.get('/offre/restaurent/:restaurentId', auth, role(['Admin', 'restaurent']), offreController.getOffreByRestaurent);
router.get('/offre/repas/:repasId', auth, role(['Admin', 'restaurent']), offreController.getOffreByRepas);
router.get('/offre/:id', auth, role(['Admin', 'restaurent']), offreController.detailOffre);
router.put('/offre/:id', auth, role(['Admin', 'restaurent']), offreController.updateOffre);
router.delete('/offre/:id', auth, role(['Admin', 'restaurent']), offreController.deleteOffre);

module.exports = router;