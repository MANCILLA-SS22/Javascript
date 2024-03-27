import winston from "winston";
import { environment } from "../config/dotenvMain/env.config.js";

const customLevelsOptions = { //Creating our logger:
    levels: { fatal: 0, error: 1, warning: 2, http: 3, info: 4, debug: 5 },
    colors: { fatal: 'red', error: 'cyan', warning: 'yellow', http: 'red', info: 'blue', debug: 'white' }
};

const logger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: environment === "dev" ? "debug" : "info",
            format: winston.format.combine( 
                winston.format.colorize({colors: customLevelsOptions.colors}), 
                winston.format.simple() 
            )
        }),
        new winston.transports.File({
            filename: environment === "dev" ? `./files/errors-dev.log`: `$./files/errors-prod.log`,
            level: "error",
            format: winston.format.simple()
        })
    ]
});

function addLogger(req, res, next){ // Declaramos a middleware
    req.logger = logger
    req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
    next();
};

export {addLogger}