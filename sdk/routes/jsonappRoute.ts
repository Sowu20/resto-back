import { router } from "../../app";
import { getForm, getMenu, getReader } from "../controllers/jsonappController";

router.get('/menu', getMenu);
router.get('/form', getForm);
router.get('/reader', getReader);