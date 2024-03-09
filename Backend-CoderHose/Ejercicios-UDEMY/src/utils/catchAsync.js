function catchFunc(fn){
    return function(req, res, next){ //This is the funcion that express we'll gonna call. It's here where req, res, next are recognized by express and not in the function bellow
        return fn(req, res, next).catch(next);
    }
}

export {catchFunc};