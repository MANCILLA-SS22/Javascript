// 1.  Express 
// 2.  Multer
// 3.  Uso de plantillas con handlebars
// 4.  Websockets
// 5.  MongoDB & Mongoose
// 6.  MongoDB avanzado (poplation, indexation, aggregation & pagination)
// 7.  Mongoose avanzado (index and virtual properties, document, model, query and aggregate middlewares, methods and statics encapsulation methods)
// 8.  Manejo de cookies
// 9.  Manejo de session y JWT (con cookies y localstorage)
// 9.  Uso de autenticacion con passport avanzado
// 10. Uso variables de entorno (dotenv), clusters, process, child process, listeners, path with NodeJS
// 11. Arquitectura de capas, servidor, diseno y persistencia.
// 12. Patrones de diseno (Singleton, Facade, Builder, Command, Null object)
// 13. Comunicación entre Frontend y Backend. Uso de "factory", "service" y DAO.
// 14. Mailing y mensajeria
// 15. Test y Mocks
// 16. Optimizacion (gzip y brotli, error handling)
// 17. Seguridad
// 18. Logging y testing de performance 
// 19. Documentacion con Swagger
// 20. Testing con Mocha Assert (NodeJS) y Chai

// nodemon src/backend.js --mode prod   -->   Servidor escuchando por el puerto: 3001
// nodemon src/backend.js --mode dev    -->   Servidor escuchando por el puerto: 5500
import express from "express";
import handlebars from "express-handlebars";
import cors from 'cors';
import morgan from "morgan";
import compression from "express-compression";
import cookieParser from "cookie-parser";
import swaggerUIExpress  from "swagger-ui-express"; //Nos permitirá linkear una interfaz gráfica que represente la documentación a partir de una ruta de nuestro servidor de express.
import session from "express-session";
import flash from "express-flash";
import methodOverride from 'method-override';
import passport from "passport";
import {Server} from "socket.io";
import brotli from "brotli"

import helloRouter from "./router/hello.routes.js";
import paginationRouter from "./router/pagination.routes.js";
import socketViewsRouter from "./router/views.routes.js";
import postRouter from "./router/post.routes.js"
import expressRouter from "./router/express.routes.js"
import multerRouter from "./router/multer.routes.js"
import cookieRouter from "./router/cookies.routes.js";
import usersJwtViewRouter from "./router/users.Jwtviews.routes.js";
import usersSessionViewRouter from "./router/users.Sessionviews.routes.js";
import githubLoginViewRouter from "./router/github-login.views.routes.js";
import jwtRouter from "./router/jwt.routes.js";
import petsRouter from "./router/pets.routes.js";
import UsersExtendRouter from "./custom/users.extend.routes.js";
import forkRouter from "./router/fork.routes.js";
import studentRouter from './router/students.routes.js';
import coursesRouter from './router/courses.routes.js';
import emailRouter from './router/email.routes.js';
import usersRouter from "./router/users.routes.js";
import sessionRouter from "./router/sessions.routes.js";
import smsRouter from './router/sms.routes.js';
import whatsappRouter from './router/whatsapp.routes.js';
import compressionRouter from './router/compression.routes.js';
import loggerRouter from "./router/logger.routes.js";
import performanceRouter from "./router/performance-test.routes.js";
import usuariosRouter from "./router/usuarios.routes.js";
import mascotasRouter from "./router/mascotas.routes.js";
import adopcionesRouter from "./router/adopciones.routes.js";
import sesionesRouter from "./router/sesiones.routes.js";

import {__dirname} from './dirname.js';
import { errorHandlerMiddleware, logger } from "./middlewares/middlewares.js";
import { loggerDate } from "./middlewares/loggerDate.js";
import { initialPassport } from "./config/passport.config.js";
import { stencil } from "./specs/handlebars.specs.js";
import { corsOptions } from "./specs/cors.specs.js";
import { specs } from "./specs/swagger.specs.js";
import { connectMongo } from "./config/mongodb.config.js";
import { mongoStoreObj } from "./specs/mongoStore.specs.js";
import { mongoInstance } from "./methods/mongoInstance.method.js";
import { execFunc } from "./childe_process/exec.js";
import { execFileFunc } from "./childe_process/exec_file.js";
import { spawnFunc } from "./childe_process/spawn.js";
import { tests } from "./methods/test.method.js";
import { singletonDesignPatternX1 } from "./DesignPatterns/Singleton Pattern/Patron_Singleton_x1/index.js";
import { singletonDesignPatternX2 } from "./DesignPatterns/Singleton Pattern/Patron_Singleton_x2/index.js";
import { fecadeDesignPattern } from "./DesignPatterns/Facade Pattern/DesignPatternFecade.js";
import { commandDesignPattern } from "./DesignPatterns/Command Pattern/after.js";
import { builderDesignPattern } from "./DesignPatterns/Builder Pattern/after_traditional.js";
import { indexation1, indexation2, indexation3 } from "./methods/indexation.js";
import { aggregation1, aggregation2 } from "./methods/aggregation.js";
import { socket1, socket2, socket3, socket4 } from "./sockets/sockets.js";
import { clusters } from "./methods/clusters.method.js";
import { addLogger } from "./config/logger_CUSTOM.js";  //import { addLogger } from "./config/logger_BASE.js";

function app(){
    const app = express();
    const usersExtendRouter = new UsersExtendRouter();

    // mongoInstance(); // ****** Uso de REPOSITORTY (comentar lo referente a "factory" y connectMongo() para que esto funcione) ******
    connectMongo(app); 
    initialPassport();

    app.set("views", `${__dirname}/views`); // Seteamos nuestro motor. Con app.set("views", ruta) indicamos en que parte del proyecto estaran las vistas. Recordar utilizar rutas absolutas para evitar asuntos de ruteo relativo.
    app.engine("hbs", handlebars.engine(stencil)); //Finalmente, con este app.set() indicamos que, el motor que ya inicializamos arriba, es el que queremos utilizar. Es importante saber que, cuando digamos al servidor que renderice, sepa que tiene que hacerlo con el motor de hbs.
    app.set("view engine", "hbs"); //app.set("view engine", "ejs");
    app.use(morgan('dev'));
    
    app.use(cookieParser("CoderS3cr3tC0d3")); //colocamos la inicialización de nuestro passport, la inicialización de passport y cookieParser también para que el servidor pueda reconocer correctamente las cookies. 
    app.use(compression({brotli: { enabled: true, zlib: {} } })); //Con esta opción, se reconocerá un tipo de compresión “br” (brotli) al momento de enviar la información. La razón por la que colocamos un objeto zlib vacío se debe a que el módulo de express-compression cuenta con una dependencia interna “zlib”, la cual le permite ejecutar diferentes niveles de compresión.
    app.use(cors(corsOptions)); //Si utilizamos unicamente cors(), quiere decir que cualquiera podra acceder al servidor. Pero al mandarle un objeto cors(corsOptions), este contiene la info de quien o quienes pueden acceder.
    app.use(express.json()); //This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
    app.use(express.text());
    app.use(express.urlencoded({ extended: true, limit: 1000 })); //It parses incoming requests with urlencoded payloads and is based on body-parser. Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option. This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.
    app.use(express.static(`${__dirname}/public`)); // Public. Sentamos de manera estatica la carpeta public
    // app.use(flash()); //****** Uso de SESSIONS (comentar lo referente a "factory" y mongoInstance() para que esto funcione) ******
    // app.use(methodOverride('_method'))
    // app.use(session(mongoStoreObj));  
    // app.use(passport.initialize());
    // app.use(passport.session());

    // app.use(addLogger); //Este es un middleware de nivel de aplicación, que contiene los loggers, el cual se ejecutara antes de los routers de abajo.
    app.use("/", logger, errorHandlerMiddleware, helloRouter); //"logger" representa un middleware de nivel de endpoint. Ejecutamos primero la ruta "/", despues se ejecuta la funcion middleware y, si todo sale bien, se ejecuta la funcion next, y pasamos al siguiente middleware, que es el Middleware de manejo de errores. Y finalmente, si todo sale bien nuevamente, pasamos a la ultima funcion.
    app.use("/multer", multerRouter);
    app.use("/pagination", paginationRouter);
    app.use("/fork", forkRouter);
    app.use("/express", expressRouter);
    app.use("/socket", socketViewsRouter);
    app.use("/api/post", loggerDate, postRouter);

    app.use("/cookie", cookieRouter);
    app.use("/api/jwt", jwtRouter);
    app.use('/usersJwt', usersJwtViewRouter);
    app.use("/api/session", sessionRouter);
    app.use('/usersSession', usersSessionViewRouter);

    app.use("/api/pets", petsRouter);
    app.use("/api/users", usersRouter);
    app.use("/api/extend/users", usersExtendRouter.getRouter());
    app.use("/api/students", studentRouter);
    app.use("/api/courses", coursesRouter);

    app.use("/api/email", emailRouter);
    app.use("/api/sms", smsRouter);
    app.use("/api/whatsapp", whatsappRouter);

    app.use("/api/performance", performanceRouter)
    app.use("/compression", compressionRouter);
    app.use("/logger", loggerRouter); //Al usar esta ruta, hay que COMENTAR los middlewares Logger 1 y Logger 2 para ver el resultado
    app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs)) // Declaramos la Api donde vamos a tener la parte grafica

    app.use('/api/usuarios', usuariosRouter);
    app.use('/api/mascotas', mascotasRouter);
    app.use('/api/adopciones', adopcionesRouter);
    app.use('/api/sesiones', sesionesRouter);

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

    // ****** Child process (Utilizar uno a la vez) ****** 
    // execFunc();
    // execFileFunc();
    // spawnFunc();

    // ****** Uso de patrones de diseno (Utilizar uno a la vez) ****** 
    // singletonDesignPatternX1(); singletonDesignPatternX2();
    // fecadeDesignPattern();
    // commandDesignPattern();
    // builderDesignPattern();
    // NullObjectDesignPattern(2);

    // ****** Uso de tests ******
    // tests();

};
app();

export {app};

// ****** Uso de clusters (Para trabajar con clusters, HABILITAR la linea de abajo y COMENTAR "app();". Si no, entonces comentarla y habilidar "app()" ****** 
// clusters();

// ****** Uso de Artillery (Ejecutar en consola) ****** 
//   --count: Especifica el número de usuarios virtuales que se crearán para hacer las peticiones
//   --num: Especifica el número de peticiones que realizará cada usuario
//   -o : Devuelve un formato json con los resultados del test.
// Artillery                     -->    `artillery quick --count 40 --num 50 "http://localhost:5500/api/performance/operation/sencilla" -o ./data/resultadosSencilla.json`
// Artillery                     -->    `artillery quick --count 40 --num 50 "http://localhost:5500/api/performance/operation/complex" -o ./data/resultadosComplex.json`
// Ejecucion de script .yml      -->    `artillery run ./src/config.yml --output ./data/test01.json`
// Generacion de reporte .html   -->    `artillery report test01.json -o ./data/resultUser.html` (opcional)





// Express
// Websockets
// MongoDB avanzado (poplation, indexation, aggregation & pagination)
// Mongoose avanzado (index and virtual properties, document, model, query and aggregate middlewares, methods and statics encapsulation methods)
// Manejo de cookies
// Manejo de session y JWT (con cookies y localstorage)
// Uso de autenticacion con passport avanzado
// Clusters, process, child process, listeners, path with NodeJS