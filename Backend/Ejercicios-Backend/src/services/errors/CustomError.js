class CustomError {
    static createError({ name = "Error", code = 1 , cause, message}){
        const err = new Error(message, {cause});  //"Error" es un error nativo que entrega Node
        err.name = name,
        err.code = code,
        err.cause = cause ? new Error(cause) : null;

        throw err;
    }
};

export default CustomError;