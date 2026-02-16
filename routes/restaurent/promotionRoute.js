const express = require('express');
const router = express.Router();
const promotionController = require('../../controllers/restaurent/promotionController');
const auth = require('../../middlewares/authmiddleware');
const role = require('../../middlewares/rolemiddleware');

router.post('/promotion', auth, role(['Admin', 'restaurent']), promotionController.createPromotion);
router.get('/promotion', auth, role(['Admin', 'restaurent']), promotionController.listPromotion);
router.get('/promotion/actives', auth, role(['Admin', 'restaurent']), promotionController.avaiblePromotion);
router.get('/promotion/expires', auth, role(['Admin', 'restaurent']), promotionController.duePromotion);
router.get('/promotion/:id', auth, role(['Admin', 'restaurent']), promotionController.detailPromotion);
router.get('/promotion/restaurent/:restaurentId', auth, role(['Admin', 'restaurent']), promotionController.promotionByRestaurent);
router.put('/promotion/:id', auth, role(['Admin', 'restaurent']), promotionController.updatePromotion);
router.delete('/promotion/:id', auth, role(['Admin', 'restaurent']), promotionController.deletePromotion);

module.exports = router;