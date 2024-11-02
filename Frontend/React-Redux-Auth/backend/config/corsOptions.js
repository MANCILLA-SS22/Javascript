import allowedOrigins from './allowedOrigins.js';

const corsOptions = {
    origin: function(origin, callback){
        allowedOrigins.indexOf(origin) !== -1 || !origin ? callback(null, true) : callback(new Error('Not allowed by CORS'));
    },
    optionsSuccessStatus: 200
}

export default corsOptions;