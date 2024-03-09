import express from "express";
import { createBooking, deleteBooking, getAllBooking, getBooking, getCheckoutSession, updateBooking } from "../controllers/bookingController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

router.use(protect)
router.get("/checkout-session/:tourId", getCheckoutSession);

router.use(restrictTo("admin", "lead-guide"));
router.route("/").get(getAllBooking).post(createBooking);
router.route("/:id").get(getBooking).patch(updateBooking).delete(deleteBooking);


export default router;