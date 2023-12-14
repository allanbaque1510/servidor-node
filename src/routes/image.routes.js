import { Router } from "express";
import {getAllImages, uploadImages, modifyImages} from '../controllers/image.controller.js';
import {authRequire} from '../middlewares/validateToken.js'
import { validateSchema } from "../middlewares/validator.middleware.js";
import { modifySchema, uploadSchema } from "../schemas/image.schema.js";

const router = Router();

router.get('/allImage', getAllImages);
router.post('/uploadImage',authRequire, uploadImages);
router.post('/modifyImage', authRequire, modifyImages);


export default router