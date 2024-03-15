// ✓ Realizar un sistema de recuperación de contraseña, la cual envíe por medio de un correo un botón que redireccione a una página para restablecer la contraseña (no recuperarla).
//     ○ El link del correo debe expirar después de 1 hora de enviado.
//     ○ Si se trata de restablecer la contraseña con la misma contraseña del usuario, debe impedirlo e indicarle que no se puede colocar la misma contraseña
//     ○ Si el link expiró, debe redirigir a una vista que le permita generar nuevamente el correo de restablecimiento, el cual contará con una nueva duración de 1 hora
// ✓ Establecer un nuevo rol para el schema del usuario llamado “premium” el cual estará habilitado también para crear productos
// ✓ Modificar el schema de producto para contar con un campo “owner”, el cual haga referencia a la persona que creó el producto
//     ○ Si un producto se crea sin owner, se debe colocar por defecto “admin”.
//     ○ El campo owner deberá guardar sólo el correo electrónico (o _id, lo dejamos a tu conveniencia) del usuario que lo haya creado (Sólo podrá recibir usuarios premium)
// ✓ Modificar los permisos de modificación y eliminación de productos para que:
//     ○ Un usuario premium sólo pueda borrar los productos que le pertenecen. 
//     ○ El admin pueda borrar cualquier producto, aún si es de un owner.
// ✓ Además, modificar la lógica de carrito para que un usuario premium NO pueda agregar a su carrito un producto que le pertenece
// ✓ Implementar una nueva ruta en el router de api/users, la cual será /api/users/premium/:uid la cual permitirácambiar el rol de un usuario, de “user” a “premium” y viceversa.

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