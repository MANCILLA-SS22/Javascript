function logger(req, res, next) {
    console.log("Servidor recibe peticion");
    next();

};
function errorHandlerMiddleware(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};

export {logger, errorHandlerMiddleware};