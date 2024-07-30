// import { Router } from "express";
// import { registerUser } from "../controllers/user.controllers.js";
// import {upload} from "../middlewares/multer.middlewares.js";
// import { loginUser } from "../controllers/login.controllers.js";
// import { getCategories } from "../controllers/category.controllers.js";
// import { submitAudiobook } from '../controllers/audiobook.controllers.js';
// import { getAudiobooksByCategory } from "../controllers/browseaudio.controllers.js";
// import { addReview } from "../controllers/review.controllers.js";



// const router = Router()

// router.route("/register").post(upload.single("avatar"), registerUser);
// router.route("/login").post(loginUser);
// router.route("/categories").get(getCategories);
// router.route('/submit').post(upload.fields([{ name: 'audiofile' }, { name: 'coverimage' }]), submitAudiobook);
// router.route('/audiobooks').get(getAudiobooksByCategory);
// router.route('/audiobooks/:audiobookId/reviews').post(addReview);


// export default router;

import { Router } from "express";
import { registerUser,  loginUser} from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middlewares.js";


const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);


export default router;