import RealTimeProductsController from "../controllers/realTimeProducts/controllerRealProducts.js";
import RouterCarts from "../controllers/carts/controllerCarts.js";
import RouterProducts from "../controllers/products/controllerProducts.js";
import ViewsController from "../controllers/views/viewsController.js";
import AuthController from "../controllers/auth/usersController.js";
import SessionsController from "../controllers/sessions/sessionsController.js"
import { addLogger } from "../logger/logger_CUSTOM.js";

const realTimeProductsController = new RealTimeProductsController();
const routerCarts = new RouterCarts();
const routerProducts = new RouterProducts();
const viewsController = new ViewsController();
const authController = new AuthController();
const sessionsController = new SessionsController();

function routerMain(app){
    // app.use(addLogger);
    app.use("/", viewsController.getRouter());
    app.use("/api/carts", routerCarts.getRouter());
    app.use("/api/products", routerProducts.getRouter());   
    app.use("/api/auth", authController.getRouter());
    app.use("/api/sessions", sessionsController.getRouter());
    app.use("/api/realTimeProduct", realTimeProductsController.getRouter());
}

export default routerMain;