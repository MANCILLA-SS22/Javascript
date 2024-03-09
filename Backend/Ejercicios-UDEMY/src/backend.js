import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import mongoSanitiza from "express-mongo-sanitize"
import xss from "xss-clean";
import hpp from "hpp"
import compression from "compression";

import tourRouter from "./router/tour.routes.js";
import userRouter from "./router/user.routes.js";
import reviewRouter from "./router/review.routes.js";
import viewsRouter from "./router/view.routes.js";
import bookingRouter from "./router/booking.routes.js";

import {__dirname} from "./dirname.js"; // --> C:\Users\xxelt\OneDrive\Documentos\PROYECTOS_PERSONALES\JavaScript\Ejercicio-0-UDEMY\src
import {globalErrorHandler} from "./controllers/errorController.js";
import { all, limiter, requestTime } from "./config/middlewares/middlewares.js";

const app = express();

// console.log(process.env); //process.env now has the keys and values you defined in your .env file
if(process.env.NODE_ENV === "development"){ //process.env.NODE_ENV === "development" or app.get('env') are the same. //In express, app.get('env') returns 'development' if NODE_ENV is not defined in "config.env". So you don't need the line to test its existence and set default.
    // console.log("1")
    app.use(morgan("dev"));
}

const directives = {
    defaultSrc: ["'self'", 'data:', 'blob:', 'https:', 'ws://localhost:1234/'],
    baseUri: ["'self'"],
    connectSrc: ["'self'", "'unsafe-inline'", 'data:', 'blob:'],
    scriptSrc: [ "'self'", 'https:', 'http:', 'blob:', 'https://js.stripe.com', 'https://m.stripe.network',],
    styleSrc: ["'self'", 'https:', "'unsafe-inline'", 'https://tile.openstreetmap.org', 'https://fonts.googleapis.com/'],
    workerSrc: ["'self'", 'data:', 'blob:', 'https://*.tiles.mapbox.com', 'https://api.mapbox.com', 'https://events.mapbox.com', 'https://m.stripe.network'],
    objectSrc: ["'none'"],
    imgSrc: ["'self'", 'blob:', 'data:', 'https:'],
    fontSrc: ["'self'", 'https:', 'data:', 'fonts.googleapis.com','fonts.gstatic.com'],
    formAction: ["'self'"],
    childSrc: ["'self'", 'blob:'],
    frameSrc: ["'self'", 'https://js.stripe.com'],
    upgradeInsecureRequests: []
}

//GLOBAL MIDDLEWARES
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"))); //Serving static files
app.use(express.static(`${__dirname}/public`)); //Serving static files
app.use(helmet.contentSecurityPolicy({crossOriginResourcePolicy: false, crossOriginEmbedderPolicy: false, directives})); // app.use(helmet());
app.use(cookieParser());
app.use(express.json({limit: "10kb"})); //Body parser, reading data from body into req.body
app.use(express.urlencoded({extended: true, limit: "10kb"}));
app.use(mongoSanitiza()); //Data sanitization against NoSQL query injection
app.use(xss()); //Data sanitization against XSS
app.use(hpp()); //Prevent parameter pollution (use '{{URL}}api/v1/tours?sort=duration&sort=price' in postman. This will take only the last parameter. In this case, sort=price)
app.use(requestTime); //Test middleware
app.use(compression());
app.use("/", viewsRouter);
app.use("/api", limiter); //We want to limit access to our API route. So, we write "api" as a path because we want to affect the next routes that start with "api". In this case "/api/v1/tours" and "/api/v1/users"
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("*", all); //This middleware stands for the error handdling process. It'll be executed ONLY if the route in the line 28 are typed wronlgy. For example: /api/tours, /api/v1/tourss, etc. If the route in the line 28 is typed rigthly (/api/v1/tours) and the enpoint wrongly (for example, router.route("/:id")), then app.use("*") won't be executed but the app.use(globalErrorHandler);
app.use(globalErrorHandler);

export default app;