const express = require('express');
const router = express.Router();
const restaurentController = require('../controllers/restaurentController');

router.post('/reastaurent');
router.get('/restaurent');
router.get('restaurent/:id');
router.put('/restaurent/:id');
router.delete('/restaurent/:id');

module.exports = router;