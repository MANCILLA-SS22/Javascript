import winston from "winston";

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: "http" }), //Al usar Console, significa que los mostrara los loggers desde http (3) hasta error (0) en la consola.
        new winston.transports.File({ filename: './Ejercicio-43/loggers/errors.log', level: 'warn' }) //Para el caso de File, se visualizaran desde warn (1) hasta error (0), y se veran en un archivo .log con la ruta especificada
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