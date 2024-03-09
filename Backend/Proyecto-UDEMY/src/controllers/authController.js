import jwt from "jsonwebtoken";
import crypto from "crypto";
import { promisify } from "util";
import { UserModel } from "../models/userModel.js";
import { AppError } from "../utils/appError.js";
import { catchFunc } from "../utils/catchAsync.js";
import { Email } from "../utils/email.js";

function signToken(id){
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN}); //That's the object that is the data, the payload that we want to put in our JWT
    // node -e "console.log(require('crypto').randomBytes(64).toString('hex'));" // (quick and easy way to generate JWT secret)
}

function createSendToken(user, statusCode, res){
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN * 24 * 3600 * 1000),
        httpOnly: true
    };
    console.log("cookieOptions", cookieOptions)

    if(process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);

    user.password = undefined;
    
    res.status(statusCode).json({ status: "success", token, data: {user: user} })
};

function restrictTo(...roles){ //let's remember that varaibles that are stored, let's say, in a previous middleware, then those variables will exist in the subsequent middlewares. For example, we first run the "protect" middleware, create the "req.user" and finally all the subsequent middlewares such as "restrictTo" will be able to get access to that variable.
    // roles ["admin", "lead-guide"]
    return function(req, res, next){ //We can't pass arguments into a middleware function. To fix that, we'll create like a wrapper function, which will then return the middleware function that we actually want to create.
        if(!roles.includes(req.user.role)) return next(new AppError("You do not have permission to permorm this action!!", 403));
        next();
    }
}

const signup = catchFunc(async function(req, res, next){  //http://localhost:5500/api/v1/user
    const newUser = await UserModel.create(req.body);
    const url = `${req.protocol}://${req.get("host")}/me`;
    console.log(url);
    await new Email(newUser, url).sendWelcome();
    createSendToken(newUser, 201, res);
});

const login = catchFunc(async function(req, res, next){
    const {email, password} = req.body;

    // 1) Check if email and password exist
    if(!email || !password) return next(new AppError("Please provide email and password!", 400));

    // 2) Check if user exists && password is correct;
    const user = await UserModel.findOne({email}).select("+password"); console.log("user --> ", user);
    const correct = await user.correctPassword(password, user.password); //The function "userSchema.methods.correctPassword" in userModel.js is an instanced method. So therefore it's available on all the user documents.
    if(!user || !correct) return next(new AppError("Incorrect email or password!", 401));

    // 3) If everything is ok, send token to client
    createSendToken(user, 200, res);
});

const logout = catchFunc(async function(req, res, next){
    res.cookie("jwt", "loggedout", {
        expiresIn: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({status: "success"})
});

const protect = catchFunc(async function(req, res, next){
    //Method 1: promisify
    // 1) Getting token and check if it's there
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }else if (req.cookies.jwt && req.cookies.jwt !== 'loggedout') {
        token = req.cookies.jwt;
    }

    if(!token) return next(new AppError("You are not logged in. Please log in to get access!", 401));
    
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); //This is function that we need to call, which will then return a promose. (token, process.env.JWT_SECRET) stands for --> call the function what is returned from promisify() immediately. THIS IS A SHORTER WAY TO USE PROMISES INSTEAD OF USING async-await OR .then() & .catch().
    console.log("Decoded", decoded);

    // 3) Check if user still exists
    const currentUser = await UserModel.findById(decoded.id); //console.log("currentUser", currentUser)
    if(!currentUser) return next(new AppError("The user belonging to this token does no longer exist!", 401));

    // 4) Check if user changed password after the token was issued
    if(!currentUser.changedPasswordAfter(decoded.iat)) return next(new AppError("User recently changed password. Please log in again!", 401));

    //Grand access to protected route
    req.user = currentUser; //console.log("req.user --> ", req.user)
    res.locals.user = currentUser; //We put the currentUser both on req.user and res.locals.user so that we can automatically use it in all the templates after it. 
    next();
    
/*  //Method 2: async-await   
    // 1) Getting token and check if it's there
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) token = req.headers.authorization.split(" ")[1];    
    if(!token) return next(new AppError("You are not logged in. Please log in to get access!", 401))
    
    
    let verify = promisify(jwt.verify);
    async function res(){
        try {
            // 2) Verification token
            verify = await verify(token, process.env.JWT_SECRET);
            console.log("Decoded", verify);

            // 3) Check if user still exists
            const currentUser = await UserModel.findById(verify.id); console.log("currentUser", currentUser)
            if(!currentUser) return next(new AppError("The user belonging to this token does no longer exist!", 401));

            // 4) Check if user changed password after the token was issued
            if(currentUser.changedPasswordAfter(verify.iat)) return next(new AppError("User recently changed password. Please log in again!", 401));

            //Grand access to protected route
            req.user = currentUser;
            next();
        } catch (error) {
            console.log(error)
        }
    }
    res(); */
});

async function isLoggedIn(req, res, next){ //Only for rendered pages, no errors!
    if(req.cookies.jwt){
        try {
            // 1) Verify token  
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET); //This is function that we need to call, which will then return a promose. (token, process.env.JWT_SECRET) stands for --> call the function what is returned from promisify() immediately. THIS IS A SHORTER WAY TO USE PROMISES INSTEAD OF USING async-await OR .then() & .catch().
            console.log("Decoded", decoded);
    
            // 2) Check if user still exists
            const currentUser = await UserModel.findById(decoded.id); //console.log("currentUser", currentUser)
            if(!currentUser) return next();
    
            // 3) Check if user changed password after the token was issued
            if(!currentUser.changedPasswordAfter(decoded.iat)) return next();
    
            //There's a logged in user
            res.locals.user = currentUser;
            return next();
        } catch (error) {
            return next();
        }
    }

    next();
};

const forgotPassword = catchFunc(async function(req, res, next){
    // 1) Get user based on POSTed email
    const user = await UserModel.findOne({email: req.body.email});
    if(!user) return next(new AppError("There is no user with email address!", 404));

    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken(); 
    console.log("resetToken", resetToken)
    await user.save({validateModifiedOnly: true}); //We need to save it because before this line, we only MODIFY the document but we don't save it into the database. "validateBeforeSave: false" will deactivate all the validaters that we specify in our schema. If we don't use this field. then we'll find validation erros as we need to have an email or password.

    // 3) Send it to user's email
    try {
        const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;
        await new Email(user, resetURL).sendPasswordReset();
        res.status(200).json({status: "success",message: "Token sent to email!"});
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateModifiedOnly: true});  //We need to save it because before this line, we only MODIFY the document but we don't save it into the database. "validateBeforeSave: false" will deactivate all the validaters that we specify in our schema. If we don't use this field. then we'll find validation erros as we need to have an email or password.
        return next(new AppError("There was an error sending the email. Please try again!", 500));
    }
});

const resetPassword = catchFunc(async function(req, res, next){
    // 1) Get user based on the token
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await UserModel.findOne({
        passwordResetToken: hashedToken, 
        passwordResetExpires: {$gt: Date.now()}
    });

    // 2) If token has not expired, and there is user, set the new password
    if(!user) return next(new AppError("Token is invalid or has expired", 400));
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save(); //In this case, we don't have to turn off the validators as we did before becasue indeed we want to validate. For example, we want the validator to confirm if the password is equal to passwordConfirm. 

    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT
    createSendToken(user, 200, res);

});

const updatePassword = catchFunc(async function(req, res, next){
    // 1) Get user from collection
    const user = await UserModel.findById(req.user.id).select("+password"); //We also need to explicitly ask for the password becasue it is not, by default, not included in the output.
    if(!user) return next(new AppError("There is no user with email address!", 404));    

    // 2) Check if POSTed current password is correct
    const ans = await user.correctPassword(req.body.passwordCurrent, user.password);
    if(!ans) return next(new AppError("Your current password is wrong", 401));

    // 3) If so, update password (We can't use findByIdAndUpdate() becasue the document middlewares won't be executed. That's why we have to uptdate this manually)
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save(); //In this case, we don't have to turn off the validators as we did before becasue indeed we want to validate. For example, we want the validator to confirm if the password is equal to passwordConfirm. 

    // 4) Log user in, send JWT
    createSendToken(user, 200, res);   
});

export {signup, login, protect, restrictTo, forgotPassword, resetPassword, updatePassword, isLoggedIn, logout};

//4) Check if user changed password after the token was issued
// In the "protect" function, the purpose of assigning req.user = "decoded" is to make the "decoded" object available to other middleware functions or route handlers that are executed after the protect middleware. In this case, since req.user 
// is assigned the value of "decoded", the "decoded" object will be available to any subsequent middleware functions or route handlers that need to  access information about the authenticated user. This is a common pattern in middleware-based web 
// frameworks, where information is passed between middleware functions using the req (request)  and res (response) objects. By attaching data to the req object, that data can be accessed and used by other parts of the application that handle the request. 
// In summary, the assignment  req.user = decoded is necessary to make the authenticated user object available to subsequent middleware functions or route handlers that need to access it.