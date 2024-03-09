import express from "express";
import { getOverview , getTour, getLoginForm, getAccount, updateUserData, getMyTours } from "../controllers/viewsController.js";
import { isLoggedIn, protect } from "../controllers/authController.js";
import { createBookingCheckout } from "../controllers/bookingController.js";

const router = express.Router();

router.get('/', createBookingCheckout, isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/me', protect, getAccount);
router.get('/my-tours', protect, getMyTours);
router.post('/submit-user-data', protect, updateUserData);

export default router;