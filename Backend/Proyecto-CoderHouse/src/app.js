import {app, httpServer, express} from "./socket/socketServer.js";
// import { configMongoSingleton } from "./config/mongodb/mongoInstance.method.js";
import {configMongo} from "./config/mongodb/mongodb.config.js"
import routerMain from "./router/classMain.routes.js";  
import handlebarsConfig from "./config/handlebars/handlebars.config.js";
import passportConfig from "./config/passport/passport.config.js";
import middlewares from "./middlewares/middlewares.config.js"
import { swaggerConfig } from "./config/swagger/swagger.specs.js";

// configMongoSingleton(); 
configMongo(httpServer);
passportConfig(app);
middlewares(app, express);
routerMain(app);
handlebarsConfig(app);
swaggerConfig(app);

// httpServer.listen(PORT, () => console.log(`Server listening on ${PORT}`));


// Ejecutar en la terminal: 
//  --> node src/app.js --mode dev
//  --> node src/app.js --mode prod