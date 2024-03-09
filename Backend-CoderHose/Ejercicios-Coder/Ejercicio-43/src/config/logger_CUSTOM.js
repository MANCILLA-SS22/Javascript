import winston, { transports } from "winston";
import config from "../config/config.js";

const customLevelsOptions = { //Creating our logger:
    levels: { fatal: 0, error: 1, warning: 2, http: 3, info: 4, debug: 5 },
    colors: { fatal: 'red', error: 'cyan', warning: 'yellow', http: 'red', info: 'blue', debug: 'white' }
};

const prodLogger = winston.createLogger({ // Logger en env desarrollo
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
                level: "info",
                format: winston.format.combine( winston.format.colorize({colors: customLevelsOptions.colors}), winston.format.simple() )
            }
        ),
        new winston.transports.File({
                filename: './Ejercicio-43/loggers/errors-prod.log',
                level: 'warning', //Cambiamos el logger level name.
                format: winston.format.simple()
            }
        )
    ]
});

const devLogger = winston.createLogger({ // Logger en env prod
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({ level: "http" }),
        new winston.transports.File({ filename: './Ejercicio-43/loggers/errors-dev.log', level: 'warning' })
    ]
});

function addLogger(req, res, next){ // Declaramos a middleware
    if (config.mode === 'prod') {
        req.logger = prodLogger
        req.logger.warning(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
        req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
        req.logger.error(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);

    }else {
        req.logger = devLogger
        req.logger.warning(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
        req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
        req.logger.error(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
    }
    next();
};

export {addLogger}