import express from "express";
import { getAllReviews, createReview, deleteReview, updateReview, setTourUserIds, getReview } from "../controllers/reviewController.js";
import {protect, restrictTo} from "../controllers/authController.js";

const router = express.Router({mergeParams: true}); //We need to use mergeParams because by default, each router only have access to the parameters of their specific routes.

router.use(protect);
router.route("/").get(getAllReviews).post(restrictTo("user"), setTourUserIds, createReview);
router.route("/:id").get(getReview).patch(restrictTo("user", "admin"), updateReview).delete(restrictTo("user", "admin"), deleteReview);

export default router;