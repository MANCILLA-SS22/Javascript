import winston from "winston";

const loggerBase = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: "http" }), //Al usar Console, significa que los mostrara los loggers desde http (3) hasta error (0) en la consola.
        new winston.transports.File({ filename: './Ejercicio-43/loggers/errors.log', level: 'warn' }) //Para el caso de File, se visualizaran desde warn (1) hasta error (0), y se veran en un archivo .log con la ruta especificada
    ]
});

function logger(req, res){
    req.logger = loggerBase; 
    req.logger.warn("Prueba de log level warn --> en Endpoint"); // **BASE
    // req.logger.warning("Prueba de log level warning --> en Endpoint"); // **CUSTOM
    res.send("Prueba de logger!");
};

export {logger};