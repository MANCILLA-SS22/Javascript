//LOGGER CUSTOM
import winston from "winston";
import {mode} from "./config.js"

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
                filename: './loggers/errors-prod.log',
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
        new winston.transports.File({ filename: './loggers/errors-dev.log', level: 'warning' })
    ]
});

function addLogger(req, res, next){ // Declaramos a middleware
    if (mode === 'prod') {
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

export {addLogger};

//Este es el orden de los loggers mediante la libreria de Winston
// {
//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     verbose: 4,
//     debug: 5,
//     silly: 6
// }


/* //LOGGER BASE
import winston from "winston";

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: "http" }), //Al usar Console, significa que los mostrara los loggers desde http (3) hasta error (0) en la consola.
        new winston.transports.File({ filename: './loggers/errors.log', level: 'warn' }) //Para el caso de File, se visualizaran desde warn (1) hasta error (0), y se veran en un archivo .log con la ruta especificada
    ]
});

function addLogger(req, res, next){ // Declaramos a middleware
    req.logger = logger; //A partir de un middleware, vamos a colocar en el objeto req, el logger, aprovecharemos ademas para hacer nuestro primer log.
    req.logger.warn(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
    req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
    req.logger.error(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
    req.logger.debug(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`); // Este no aparece porque no esta definido dentro de los niveles
    next();
}

export {addLogger}; */