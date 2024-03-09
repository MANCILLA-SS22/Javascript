class AppError extends Error{
    constructor(message, statusCode){
        super(message); //When we extend a parent class, we call "super" in order to call the parent constructor. And, we do that with message because it is actually the only parameter that the built-in error accepts

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;

        //We specify the current object, and then the AppError class itself (this.constructor). So, when a new objeect is created, and a constructor funcion is called, then that function call is
        //not gonna appear in the stack trace, and will not pollute it.
        Error.captureStackTrace(this, this.constructor);
    }
}

export {AppError};