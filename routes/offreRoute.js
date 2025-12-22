const express = require('express');
const router = express.Router();
const offreController = require('../controllers/offreController');
const auth = require('../middlewares/authmiddleware')

router.post('/offre', auth, offreController.createOffre);
router.get('/offre', auth, offreController.listOffre);
router.get('/offre/:id', auth, offreController.detailOffre);
router.put('/offre/:id', auth, offreController.updateOffre);
router.delete('/offre/:id', auth, offreController.deleteOffre);

module.exports = router;