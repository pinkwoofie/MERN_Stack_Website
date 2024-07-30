import { Router } from "express";
//import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { getCategories } from "../controllers/category.controllers.js";
import { getAudiobooksByCategory } from "../controllers/browseaudio.controllers.js";
import { addReview } from "../controllers/review.controllers.js";

const router = Router();

router.route("/categories").get(getCategories);
router.route('/audiobooks/').get(getAudiobooksByCategory);
router.route('/audiobooks/:audiobookId/reviews').post(addReview);


export default router;
