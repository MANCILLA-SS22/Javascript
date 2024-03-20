// ✓ Modificar el schema de producto para contar con un campo “owner”, el cual haga referencia a la persona que creó el producto
//   ○ Si un producto se crea sin owner, se debe colocar por defecto 'ADMIN'.
//   ○ El campo owner deberá guardar sólo el correo electrónico (o _id, lo dejamos a tu conveniencia) del usuario que lo haya creado (Sólo podrá recibir usuarios premium)

import { PORT } from "./config/dotenvMain/env.config.js";
import {app, httpServer, express} from "./socket/socketServer.js";
import program from "./process.js";
import routerMain from "./router/classMain.routes.js";  
import mongoConfig from "./config/mongodb/mongodb.config.js";
import handlebarsConfig from "./config/handlebars/handlebars.config.js";
import passportConfig from "./config/passport/passport.config.js";
import middlewares from "./middlewares/middlewares.config.js"

mongoConfig();
passportConfig(app);
middlewares(app, express);
routerMain(app);
handlebarsConfig(app);

httpServer.listen(PORT, () => console.log(`Server listening on ${PORT}`));