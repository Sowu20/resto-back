const express = require('express'); 
import { getForm, getMenu, getReader } from "../controllers/jsonappController";

const router = express.Router();

router.get('/action', getMenu);
router.get('/forms', getForm);
router.get('/readers', getReader);

export default router;