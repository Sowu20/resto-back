const express = require('express');
const router = express.Router();
const restaurentController = require('../controllers/restaurentController');

const auth = require('../middlewares/authmiddleware');
const role = require('../middlewares/rolemiddleware');
const check = require('../middlewares/checkrestaurentmiddleware');

router.post('/restaurent', auth, role(['Restaurateur']), restaurentController.createResto);
router.get('/restaurent', restaurentController.listResto);
router.get('/restaurent/stats', auth, restaurentController.getRestaurentStats);
router.get('/restaurent/liste', auth, restaurentController.getRestaurents);
router.get('/restaurent/search', auth, restaurentController.searchRestaurent);
router.get('/restaurent/status_restaurent', auth, restaurentController.getStatusRestaurents);
router.get('/restaurent/localisation', restaurentController.getRestaurentsLoc);
router.get('/restaurent/:id', auth, restaurentController.detailResto);
router.put('/restaurent/:id', auth, check, restaurentController.updateResto);
router.delete('/restaurent/:id', auth, role(['Admin']), restaurentController.deleteResto);

module.exports = router;