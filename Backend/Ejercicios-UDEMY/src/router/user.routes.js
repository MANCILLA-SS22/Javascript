import { Router } from "express";
import {getAllUsers, updateMe, deleteMe, deleteUser, updateUser, getUser, getMe, createUser, uploadUserPhoto, resizeUserPhoto} from "../controllers/userController.js";
import {signup, login, forgotPassword, resetPassword, updatePassword, protect, restrictTo, logout} from "../controllers/authController.js";
import { __dirname } from "../dirname.js";

const router = Router();

router.param("id", function(req, res, next, val){ //Param Middleware is a middleware that only runs for certain parameters (when we have a certain parameter in our URL). Adds callback triggers to route parameters, where name is the name of the parameter and callback is the callback function. This name "id" depends on the name param we're going to check. In this case, ":/id".
    console.log(`Tour id is: ${val}`);
    next();
});

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.use(protect); //Protect all routes after this middleware --> Middlewares run in sequence. So, instead of putting "protect" in every router below, we better create a middleware based on router.use(), which will contain all the "protect" parameter we used to use.
router.patch("/updateMyPassword", updatePassword);
router.get("/me", getMe, getUser);
router.patch("/updateMe", uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete("/deleteMe", deleteMe);


router.use(restrictTo("admin")); //Only users will be  allowed to get or modify information just below
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);


export default router;