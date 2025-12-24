const express = require('express');
const router = express.Router();
const restaurentController = require('../controllers/restaurentController');
const auth = require('../middlewares/authmiddleware');

router.post('/restaurent', auth, restaurentController.createResto);
router.get('/restaurent', auth, restaurentController.listResto);
router.get('/restaurent/:id', auth, restaurentController.detailResto);
router.put('/restaurent/:id', auth, restaurentController.updateResto);
router.delete('/restaurent/:id', auth, restaurentController.deleteResto);

module.exports = router;