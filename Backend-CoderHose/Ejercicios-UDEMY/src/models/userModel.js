import {Schema, model} from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please, tell us your name!"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email!"],
        // match: [new RegExp(/^[a-zA-Z\s]+$/), '{VALUE} is not valid. Please use only letters' ], //We can use this line instead of using the xss-clean library in backend.js
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid Email!"]
    },
    photo: { type: String, default: "default.jpg" },
    role: {
        type: String,
        enum: ["user", "guide", "lead-guide", "admin"],
        default: "user"
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        minlenght: 8,
        select: false //This one will automatically necer show up in any output
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password!"],
        validate: {
            //This only works on SAVE and CREATE!!
            validator: function(el){
                return el === this.password
            },
            message: "Passwords are not the same!!"
        }
    },
    passwordChangedAt: Date, //This method will always change when someone change the password
    passwordResetToken: String,
    passwordResetExpires: String, //This reset will expire after a certain amount of time.
    active: {type: Boolean, default: true, select: false}
});

//DOCUMENT MIDDLEWARES: "pre" middlewares functions are gonna run before .save() and .create() command. "post" middlewares functions are executed after all the "pre" middleware functions have complited. "this" is gonna point to the currently processed document
// The middleware function that we're gonna specify, so the encryption is then gonna be happen between the moment that we recive that data and the moment where it's actually persisted to the database. That's where the pre-save middleware runs. Between getting the data and saving it to the database.
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined //Now we need to delete the confirm password field because at this point we only have the real password hashed and don't need to store it in the database. It's just used for validation.
    next();
});

userSchema.pre("save", function(next){
    if(!this.isModified("password") || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre("/^find/", function(next){
    this.find({
        active: {$ne: false} //We write {$ne: false} instead of active: true, because the other users don't have explicitly the "active" property set to "true".
    });

    next();
});

//INSTANCE METHOD: It's a method that it's gonna be available on all documents of a certain collection
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = async function(JWTTimesstamp){
    if(this.passwordChangedAt){
        const changedChangedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10); // "10" stands for the "n" base of the number
        console.log(changedChangedTimestamp, JWTTimesstamp);
        
        return JWTTimesstamp < changedChangedTimestamp; //"changed" means that the day or the time at which the token was issued is less than the changed timestamp
    }

    return false; //"false" means not changed.
}

userSchema.methods.createPasswordResetToken = function(){   
    const resetToken = crypto.randomBytes(32).toString("hex"); //This token is what we're gonna send to the user and it's like a reset password that the user can then use to create a new real password. And, only the user will have access to this token. We should never store a password and a plain reset token in the database.
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex"); //We create a hash with the "sha256" algorithm, then we need to update the token created in the "resetToken" variable (where it is not initially hashed), and finally stored it as hexadecimal with digest("hex"). we never want to store the plain text password in the database.
    this.passwordResetExpires = Date.now()+ 10*60*1000; //We set up the expiration time for the password. In this case 10*60*1000 = 10 minutes
    console.log("resetToken", {resetToken}); console.log("this.passwordResetToken", this.passwordResetToken); console.log("this.passwordResetExpires", this.passwordResetExpires)
    
    //We need to send the unencrypted reset token because otherwise it won't make much sense to encrypt it at all. If the token that was in the database was the exact same that we could use to actually 
    //change the password, then that wouldn't be any encryption at all. We send a plain token via email, and then we have the encrypted version in our database.
    return resetToken;
}

const UserModel = model("Users", userSchema);
export { UserModel };

// 1) refresh JWT
// 2) Blacklist JWT
// 3) cross site forgery (csurf)
// 4) what is OAuth
// 5) implementing google OAuth
// 6) git attack measures
// 7) implement two-factor authentication