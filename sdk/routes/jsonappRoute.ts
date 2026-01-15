import express from 'express'; 
import { getForm, getMenu, getReader } from "../controllers/jsonappController";

const router = express.Router();

router.get('/actions/:viewId', getMenu);
router.get('/forms/:formId', getForm);
router.get('/readers/:readerId', getReader);

export default router;