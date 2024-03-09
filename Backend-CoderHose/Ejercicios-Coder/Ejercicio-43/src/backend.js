// 1. Manejo de cookies
// 2. Uso de passport avanzado con cookies y localstorage (sin sessions)
// 3. Uso de process, variables de entorno (dotenv) y child process. 
// 4. Arquitectura de capas, servidor, diseno y persistencia. 
// 5. Patron Singleton (para una sola instancia en una clase)
// 6. Comunicación entre Frontend y Backend. Uso de "factory", "service" y DAO.
// 7. Mailer y mensajeria
// 8. Test y Mocks
// 9. Optimizacion (gzip y brotli, error handling)
// 10. Logging y testing de performance 

// nodemon Ejercicio-43/src/backend.js --mode prod   -->   Servidor escuchando por el puerto: 3001
// nodemon Ejercicio-43/src/backend.js --mode dev   -->   Servidor escuchando por el puerto: 5500
import express from "express";
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import cors from 'cors';
import morgan from "morgan";
import {Server} from "socket.io"
import compression from "express-compression";
import cookieParser from "cookie-parser";

import {__dirname} from './dirname.js';
import { errorHandlerMiddleware, logger } from "./middlewares/middlewares.js";
import { loggerDate } from "./middlewares/loggerDate.js";
import { initialPassport } from "./config/passport.config.js";
import config from './config/config.js';
import helloRouter from "./router/hello.routes.js";
import paginationRouter from "./router/pagination.routes.js";
import socketViewsRouter from "./router/views.routes.js";
import postRouter from "./router/post.routes.js"
import multerRouter from "../src/router/multer.routes.js"
import cookieRouter from "./router/cookies.routes.js";
import usersViewRouter from "./router/users.views.routes.js";
import githubLoginViewRouter from "./router/github-login.views.routes.js";
import jwtRouter from "./router/jwt.routes.js";
import petsRouter from "./router/pets.routes.js";
import UsersExtendRouter from "./custom/users.extend.routes.js";
import forkRouter from "./router/fork.routes.js";
import studentRouter from './router/students.routes.js';
import coursesRouter from './router/courses.routes.js';
import emailRouter from './router/email.routes.js';
import usersRouter from "./router/users.routes.js";
import sessionRouter from "./router/sessions.routes.js"
import smsRouter from './router/sms.routes.js';
import whatsappRouter from './router/whatsapp.routes.js';
import compressionRouter from './router/compression.routes.js';
import loggerRouter from "./router/logger.routes.js";
import performanceRouter from "./router/performance-test.routes.js";
import { tests } from "./methods/test.method.js";
import { listens } from "./methods/listens.method.js";
import { mongoInstance } from "./methods/mongoInstance.method.js";
import { clusters } from "./methods/clusters.method.js";
import { indexation1, indexation2, indexation3 } from "./MongoDB/indexation.js";
import { aggregation1, aggregation2 } from "./MongoDB/aggregation.js";
import { socket1, socket2, socket3, socket4 } from "./sockets/sockets.js";

// import { addLogger } from "./config/logger_BASE.js";    //Logger 1
// import { addLogger } from "./config/logger_CUSTOM.js";  //Logger 2

function backend(){
    const app = express();
    const usersExtendRouter = new UsersExtendRouter();
    const SERVER_PORT = config.port;
    const corsOptions = { // Configura el middleware cors con opciones personalizadas
        origin: 'http://localhost:5500', // Permitir solo solicitudes desde un cliente específico
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Configura los métodos HTTP permitidos    
        allowedHeaders: 'Content-Type,Authorization', // Configura las cabeceras permitidas
        credentials: true, // Configura si se permiten cookies en las solicitudes
    };
    const stencil = { // Inicializamos el motor con app.engine, para indicar que motor usaremos. En este caso, handlebars.engine
        extname: "hbs", //index.hbs
        defaultLayout: "main", //Plantilla principal
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    };

    initialPassport();
    
    app.set("views", `${__dirname}/views`); // Seteamos nuestro motor. Con app.set("views", ruta) indicamos en que parte del proyecto estaran las vistas. Recordar utilizar rutas absolutas para evitar asuntos de ruteo relativo.
    app.engine("hbs", handlebars.engine(stencil)); //Finalmente, con este app.set() indicamos que, el motor que ya inicializamos arriba, es el que queremos utilizar. Es importante saber que, cuando digamos al servidor que renderice, sepa que tiene que hacerlo con el motor de hbs.
    app.set("view engine", "hbs");
    app.use(morgan('dev'));
    app.use(cookieParser("CoderS3cr3tC0d3")); //colocamos la inicialización de nuestro passport, la inicialización de passport y cookieParser también para que el servidor pueda reconocer correctamente las cookies. 
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(compression({brotli: { enabled: true, zlib: {} } }));  //app.use(compression());
    app.use(express.static(`${__dirname}/public`)); // Public. Sentamos de manera estatica la carpeta public
    app.use(cors(corsOptions)); //Si utilizamos unicamente cors(), quiere decir que cualquiera podra acceder al servidor. Pero al mandarle un objeto cors(corsOptions), este contiene la info de quien o quienes pueden acceder.
    // app.use(addLogger); //Este es un middleware de nivel de aplicación, que contiene los loggers, el cual se ejecutara antes de los routers de abajo.
    app.use("/", logger, errorHandlerMiddleware, helloRouter); //"logger" representa un middleware de nivel de endpoint. Ejecutamos primero la ruta "/", despues se ejecuta la funcion middleware y, si todo sale bien, se ejecuta la funcion next, y pasamos al siguiente middleware, que es el Middleware de manejo de errores. Y finalmente, si todo sale bien nuevamente, pasamos a la ultima funcion.
    app.use("/multer", multerRouter);
    app.use("/pagination", paginationRouter);
    app.use("/fork", forkRouter);
    app.use("/cookie", cookieRouter);
    app.use('/users', usersViewRouter);
    app.use("/socket", socketViewsRouter);
    app.use("/api/post", loggerDate, postRouter);
    app.use("/github", githubLoginViewRouter);
    app.use("/api/jwt", jwtRouter);
    app.use("/api/pets", petsRouter);
    app.use("/api/extend/users", usersExtendRouter.getRouter());
    app.use("/api/students", studentRouter);
    app.use("/api/courses", coursesRouter);
    app.use("/api/email", emailRouter);
    app.use("/api/users", usersRouter);
    app.use("/api/session", sessionRouter);
    app.use("/api/sms", smsRouter);
    app.use("/api/whatsapp", whatsappRouter);
    app.use("/api/performance", performanceRouter)
    app.use("/compression", compressionRouter);
    app.use("/logger", loggerRouter); //Al usar esta ruta, hay que COMENTAR los middlewares Logger 1 y Logger 2 para ver el resultado
    app.listen(SERVER_PORT, function(){
        console.log("Server listening on port " + SERVER_PORT);

        // ****** Uso de listeners ******
        listens();    
        
        // ****** Uso de tests ******         
        tests();      
    });

    // ****** Uso de REPOSITORTY (comentar lo referente a "factory" para que esto funcione) ****** 
    mongoInstance(); 

    // ****** Uso Websockets (Si usamos esto, DESCOMENTAR las 4 lineas de abajo y comentar "app.listen(SERVER_PORT, function(){}") ****** 
    // const httpServer = app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`));
    // const io = new Server(httpServer); //Instanciar websocket    
    // socket1(io);
    // socket2(io);
    // socket3(io);
    // socket4(io);

    // ****** Uso de indexacion con mongoDB (Utilizar uno a la vez) ****** 
    // indexation1();
    // indexation2();
    // indexation3();

    // ****** Uso de aggregation con mongoDB (Utilizar uno a la vez) ****** 
    // aggregation1();
    // aggregation2();

};
backend();
export {backend}

// ****** Uso de clusters (Para trabajar con clusters, HABILITAR la linea de abajo y COMENTAR "backend();". Si no, entonces comentarla y habilidar "backend()" ****** 
// clusters();


// ****** Uso de Artillery (Ejecutar en consola) ****** 
//   --count: Especifica el número de usuarios virtuales que se crearán para hacer las peticiones
//   --num: Especifica el número de peticiones que realizará cada usuario
//   -o : Devuelve un formato json con los resultados del test.
// Artillery                     -->    `artillery quick --count 40 --num 50 "http://localhost:5500/api/performance/operation/sencilla" -o ./Ejercicio-43/data/resultadosSencilla.json`
// Artillery                     -->    `artillery quick --count 40 --num 50 "http://localhost:5500/api/performance/operation/complex" -o ./Ejercicio-43/data/resultadosComplex.json`
// Ejecucion de script .yml      -->    `artillery run ./Ejercicio-43/src/config.yml --output ./Ejercicio-43/data/test01.json`
// Generacion de reporte .html   -->    `artillery report test01.json -o ./Ejercicio-43/data/resultUser.html` (opcional)