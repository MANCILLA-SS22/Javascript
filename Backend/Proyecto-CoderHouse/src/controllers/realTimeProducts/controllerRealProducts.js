import CustomRouter from "../../router/class.routes.js"

class RealTimeProduct extends CustomRouter{
    init(){
        this.get("/", ["PUBLIC"], function(req, res){
            const {title, description, price, thumbnail, code, stock} = req.body;
            const product = [];
            product.push({title, description, price, thumbnail, code, stock});
            res.render("realTimeProducts", {title: "Form example",fileCss: "styles.css", allProducts: product})
        })
    }
}

export default RealTimeProduct; 


/* 
import { Router } from "express";
import ProductManager from "../classManagers/ProductManager.js";

const router = Router();
const Product = new ProductManager("src/data/products.json");


router.get("/", function(request, response){
    const allProducts = Product.getProducts();
    global.io.emit("productList", allProducts);
    response.render("realTimeProducts", {allProducts});
});

export default router; 
*/