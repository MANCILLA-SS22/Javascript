import {Router} from "express";
import {getAllTours, getTour, postTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan, getToursWithin, getDistances, uploadTourPhoto, resizeTourPhoto} from "../controllers/tourController.js";
import { protect, restrictTo } from "../controllers/authController.js";
import reviewRoutes from "./review.routes.js"

// import {createReview} from "../controllers/reviewController.js";
// router.route("/:tourId/reviews").post(protect, restrictTo("user"), createReview); //We got our tourID in the route, but then we need to let the controller know that it should now use this tourID and also the currently logged in user's ID
const router = Router();

// router.param("id", checkId); //Param Middleware is a middleware that only runs for certain parameters (when we have a certain parameter in our URL). Adds callback triggers to route parameters, where name is the name of the parameter and callback is the callback function. This name "id" depends on the name param we're going to check. In this case, ":/id".
router.route("/").get(getAllTours).post(protect, restrictTo("admin", "lead-guide"), postTour); //{{URL}}api/v1/tours?duration[gte]=7&sort=price
router.route("/top-5-cheap").get(aliasTopTours).get(getAllTours);
router.route("/tour-stats").get(getTourStats);
router.route("/monthly-plan/:year").get(protect, restrictTo("admin", "lead-guide", "guide"), getMonthlyPlan);
router.route("/:id").get(getTour).patch(protect, restrictTo("admin", "lead-guide"), uploadTourPhoto, resizeTourPhoto, updateTour).delete(protect, restrictTo("admin", "lead-guide"), deleteTour);
router.route("/tours-within/:distance/center/:latlng/unit/:unit").get(getToursWithin);
router.route("/distances/:latlng/unit/:unit").get(getDistances)

router.use("/:tourId/reviews", reviewRoutes);

export default router;