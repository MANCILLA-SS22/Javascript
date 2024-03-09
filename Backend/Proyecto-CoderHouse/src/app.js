// ✓ Primero, definir un sistema de niveles que tenga la siguiente prioridad (de menor a mayor): debug, http, info, warning, error, fatal
// ✓ Después implementar un logger para desarrollo y un logger para producción, el logger de desarrollo deberá loggear a partir del nivel debug, sólo en consola
// ✓ Sin embargo, el logger del entorno productivo debería loggear sólo a partir de nivel info.
// ✓ Además, el logger deberá enviar en un transporte de archivos a partir del nivel de error en un nombre “errors.log”
// ✓ Agregar logs de valor alto en los puntos importantes de tu servidor (errores, advertencias, etc) y modificar los console.log() habituales que tenemos para que muestren todo a partir de winston.
// ✓ Crear un endpoint /loggerTest que permita probar todos los logs

import { PORT } from "./config/dotenvMain/env.config.js";
import {app, httpServer, express} from "./socket/socketServer.js";
import program from "./process.js";
import routerMain from "./router/classMain.routes.js";  
import mongoConfig from "./config/mongodb/mongodb.config.js";
import handlebarsConfig from "./config/handlebars/handlebars.config.js";
import passportConfig from "./config/passport/passport.config.js";
import middlewares from "./config/middlewares/middlewares.config.js";

mongoConfig();
passportConfig(app);
middlewares(app, express);
routerMain(app);
handlebarsConfig(app);

httpServer.listen(PORT, () => console.log(`Server listening on ${PORT}`));