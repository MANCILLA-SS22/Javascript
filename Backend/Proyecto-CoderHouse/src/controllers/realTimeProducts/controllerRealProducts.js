import CustomRouter from "../../router/class.routes.js";
import { productService } from "../../database/service.js";
import { io } from "../../socket/socketServer.js";

class RealTimeProduct extends CustomRouter{
    init(){
        this.get("/", ["ADMIN"], async function(req, res){
            try {
                const product = await productService.getProducts();
                // console.log("product", product)
                io.emit("product_list", product); //Persistencia de archivos: El almacenamiento persistente se refiere a la retención de datos de forma no volátil, de modo que sigan estando disponibles incluso después de que un dispositivo o aplicación se apague o reinicie
                res.sendSuccess(product);
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`);
            }
        })
    }
}

export default RealTimeProduct;