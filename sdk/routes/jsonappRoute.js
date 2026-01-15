const express = require('express'); 
const { getForm, getMenu, getReader } = require('../controllers/jsonappController');

const router = express.Router();

router.get('/action', getMenu);
router.get('/forms', getForm);
router.get('/readers', getReader);

export default router;