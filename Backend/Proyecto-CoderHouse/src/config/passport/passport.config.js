// import passport from "passport";
import { initialPassport } from "./initialize.config.js";

function passportConfig(app){
    initialPassport();
    // app.use(passport.initialize()); //You are not required to use passport.initialize() if you are not using sessions.
};

export default passportConfig;