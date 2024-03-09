import { Router } from "express";
import CartManager from "../dao/fsClassManager/cartsManager/CartManager.js";
import ProductManager from "../dao/fsClassManager/productsManager/ProductManager.js";

const routerCarts = Router();

const ProductJSON = new ProductManager("./dao/fsClassManager/productsManager/data/products.json");
const CartJSON = new CartManager("./dao/fsClassManager/cartsManager/data/carts.json");

routerCarts.get("/", async function(request, response){
    const allCarts = await CartJSON.getCart();
    const {limit} = request.query;
    
    limit ? response.json(Object.values(allCarts).slice(0, limit)) : response.json(allCarts);
});

routerCarts.post("/", async function(request, response){
    try {
        const cart = {}
        const createdCart = await CartJSON.addCart(cart);
        response.json({mesagge: createdCart});
    } 
    catch (error) {
        response.status(500).json({mesagge: "Server error"});
    }
});

routerCarts.get("/:id", function(request, response){
    const {id} = request.params;
    const getId = CartJSON.getCartById(+id);
    if (!getId) {
        response.status(404).json({message: "Cart not found"});
    }else{
        const carrito = {
            id: +id,
            products: getId.products
        }
        response.status(200).json(carrito);
    }
});

routerCarts.post("/:cartId/products/:productId", async function(request, response){  //http://localhost:5500/api/carts/2/products/1
    const {cartId} = request.params;
    const {productId} = request.params;
    const getCartId = CartJSON.getCartById(+cartId); console.log("1", getCartId);
    const getProductId = ProductJSON.getProductById(+productId); console.log("2", getProductId);
    let cartIdProducts = getCartId?.products;

    if (!getCartId){
        response.status(404).json({message: "Not found cart id."});
    }else{
        if (!getProductId){
            response.status(404).json({message: "Not found product id."});
        }else{
            const verificarCartProduct = cartIdProducts.find(event => event.product === +productId); console.log("3", cartIdProducts);            
            if (verificarCartProduct === undefined){
                const newObject = {
                    product: +productId,
                    quantity: 1
                }
                cartIdProducts.push(getProductId, newObject);
                const updateCartProducts = await CartJSON.updateCartProductsId(+cartId, cartIdProducts);
                response.status(200).json(updateCartProducts);
            }else{
                const productsArrayPosition = cartIdProducts.findIndex(event => event.product === +productId);
                cartIdProducts[productsArrayPosition].quantity += 1;

                const updateCartProducts = await CartJSON.updateCartProductsId(+cartId, cartIdProducts);
                response.status(200).json(updateCartProducts);
            }
        }
    }
});

export default routerCarts;