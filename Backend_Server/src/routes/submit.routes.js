import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { submitAudiobook } from '../controllers/audiobook.controllers.js';
import { upload } from "../middlewares/multer.middlewares.js";


const router = Router();

router.route('/submit').post(upload.fields([{ name: 'audiofile' }, { name: 'coverimage' }]), submitAudiobook);


export default router;