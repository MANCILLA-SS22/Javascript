import { AppError } from "../../utils/appError.js";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    limit: 100,
    windowMs: 3600*1000, //This would allow 100 request from the same IP in one hour.
    message: "Too many request from this IP, please ty again in an hour!"
});

function requestTime(req, res, next){
    req.requstTime = new Date().toISOString(); //We can define any property on the "req" object.
    // console.log("req.cookies --> ", req.cookies);
    next();
}

function all(req, res, next){  
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
}

export {limiter, requestTime, all}