import passport from "passport";
import { initialPassport } from "../initialize.config.js";

function passportConfig(app){
    initialPassport();
    app.use(passport.initialize());
};

export default passportConfig;