const express = require('express');
const router = express.Router();
const promotionCotroller = require('../../controllers/admin/promotionAdminController');
const auth = require('../../middlewares/authmiddleware');
const role = require('../../middlewares/rolemiddleware');

router.post('/admin/promotion', auth, role(['Admin']), promotionCotroller.createPromotion);
router.get('/admin/promotion/:id', auth, role(['Admin']), promotionCotroller.detailPromotion);
router.get('/admin/promotion/avaible', auth, role(['Admin']), promotionCotroller.avaiblePromotion);
router.get('/admin/promotion', auth, role(['Admin']), promotionCotroller.listPromotion);
router.get('/admin/promotion/due', auth, role(['Admin']), promotionCotroller.duePromotion);
rouet.get('/admin/promotion/restaurent/:restaurentId', auth, role(['Admin']), promotionCotroller.promotionByRestaurent);
router.put('/admin/promotion/:id', auth, role(['Admin']), promotionCotroller.updatePromotion);
router.delete('/admin/promotion/:id', auth, role(['Admin']), promotionCotroller.deletePromotion);

module.exports = router;