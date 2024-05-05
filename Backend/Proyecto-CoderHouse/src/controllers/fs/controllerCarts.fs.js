import { Router } from "express";
import CartManager from "../dao/fsClassManager/cartsManager/CartManager.js";
import ProductManager from "../dao/fsClassManager/productsManager/ProductManager.js";

const routerCarts = Router();

const ProductJSON = new ProductManager("./dao/fsClassManager/productsManager/data/products.json");
const CartJSON = new CartManager("./dao/fsClassManager/cartsManager/data/carts.json");

routerCarts.get("/", async function(req, res){
    const allCarts = await CartJSON.getCart();
    const {limit} = req.query;
    
    limit ? res.json(Object.values(allCarts).slice(0, limit)) : res.json(allCarts);
});

routerCarts.post("/", async function(req, res){
    try {
        const cart = {}
        const createdCart = await CartJSON.addCart(cart);
        res.json({mesagge: createdCart});
    } 
    catch (error) {
        res.status(500).json({mesagge: "Server error"});
    }
});

routerCarts.get("/:id", function(req, res){
    const {id} = req.params;
    const getId = CartJSON.getCartById(+id);
    if (!getId) res.status(404).json({message: "Cart not found"});
    const carrito = { id: +id, products: getId.product }
    res.status(200).json(carrito);
});

routerCarts.post("/:cartId/products/:productId", async function(req, res){  //http://localhost:5500/api/carts/2/products/1
    const {cartId} = req.params;
    const {productId} = req.params;
    const getCartId = CartJSON.getCartById(+cartId); //console.log("1", getCartId);
    const getProductId = ProductJSON.getProductById(+productId); //console.log("2", getProductId);
    let cartIdProducts = getCartId?.products;

    if (!getCartId) return res.status(404).json({message: "Not found cart id."});
    if (!getProductId) return res.status(404).json({message: "Not found product id."});
    
    const verificarCartProduct = cartIdProducts.find(event => event.product === +productId); //console.log("3", cartIdProducts);            
    if (verificarCartProduct === undefined){
        const newObject = { product: +productId, quantity: 1 }
        cartIdProducts.push(getProductId, newObject);
        const updateCartProducts = await CartJSON.updateCartProductsId(+cartId, cartIdProducts);
        res.status(200).json(updateCartProducts);
    }
    
    const productsArrayPosition = cartIdProducts.findIndex(event => event.product === +productId);
    cartIdProducts[productsArrayPosition].quantity += 1;
    const updateCartProducts = await CartJSON.updateCartProductsId(+cartId, cartIdProducts);
    res.status(200).json(updateCartProducts);
});

export default routerCarts;