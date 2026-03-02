const express = require('express');
const router = express.Router();
const promotionController = require('../../controllers/restaurent/promotionController');
const auth = require('../../middlewares/authmiddleware');
const role = require('../../middlewares/rolemiddleware');

router.post('/promotion/:restaurentId', auth, promotionController.createPromotion);
router.get('/promotion/:restaurentId', auth, promotionController.listPromotion);
router.get('/promotion/actives/:restaurentId', auth, promotionController.avaiblePromotion);
router.get('/promotion/expires/:restaurentId', auth, promotionController.duePromotion);
router.get('/promotion/:restaurentId/:id', auth, promotionController.detailPromotion);
router.put('/promotion/:restaurentId/:id', auth, promotionController.updatePromotion);
router.delete('/promotion/:restaurentId/:id', auth, promotionController.deletePromotion);

module.exports = router;