import Route from "../../router/class.routes.js"
import { v4 as uuidv4 } from "uuid";
import { productService, cartService, userService } from "../../database/service.js";
import { ticketModel } from '../../database/dao/mongo/models/ticket.model.js';
import { ProductDto } from "../../database/dto/Product.dto.js";
import { sendNotification } from "../../config/adapter/NodemailerAdapter.js";

class CartRouter extends Route{
    init(){
        this.get("/", ['USER', 'PREMIUM'], async function(req, res){
            try {
                const allCarts = await cartService.getCart();
                allCarts ? res.sendSuccess(allCarts) : res.sendClientError({message: "Not cars found"});
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });

        this.post("/", ['USER', 'PREMIUM'], async function(req, res){
            try {
                const cart = {product: []}
                const createdCart = await cartService.addCart(cart);
                // console.log("createdCart", createdCart)
                const user = req.user;

                const updateUser = await userService.updateUser(user._id, {
                    $push: {
                        cart: createdCart
                    }
                });                
                // console.log("updateUser", updateUser);

                res.sendSuccess(createdCart);
            } 
            catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });

        this.get("/:cid", ['USER', 'PREMIUM'], async function(req, res){
            try {
                const {cid} = req.params;
                const getId = await cartService.getCartById(cid);  
                !getId ? res.sendClientError({message: "Cart not found"}) : res.sendSuccess(getId);
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });
        
        this.put("/:cid", ['USER', 'PREMIUM'], async function(req, res){
            try {
                const productDto = new ProductDto(req.body);
                const {cid} = req.params;
                const getCartId = await cartService.updateOneCart(cid, productDto);
                res.sendSuccess(getCartId);
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });

        this.delete("/:cid", ['USER', 'PREMIUM'], async function(req, res){
            try {
                const {cid} = req.params;
                const deleteProduct = await cartService.deleteProductsById(cid);
                res.sendSuccess(deleteProduct);
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });

        this.post("/:cid/products/:pid", ['USER', 'PREMIUM'], async function(req, res){ 
            try {
                const {cid} = req.params;
                const {pid} = req.params;
                const getCartId = await cartService.getCartById(cid);
                const getProductId = await productService.getProductById(pid);
                let cartIdProducts = getCartId?.products;
            
                if (!getCartId) res.sendClientError({message: "Not found cart id."});
                if (!getProductId) res.sendClientError({message: "Not found product id."});
                
                const verificarCartProduct = cartIdProducts.find((event) => event.product._id.toString() === pid);
                if (verificarCartProduct === undefined){
                    const newObject = { product: pid, quantity: 1 }
                    cartIdProducts.push(newObject); // cartIdProducts.push(getProductId, newObject);
                    const updateCartProducts = await cartService.updateCartProductsId(cid, cartIdProducts);
                    res.sendSuccess(updateCartProducts);
                }else{
                    const productsArrayPosition = cartIdProducts.findIndex(event => event.product._id.toString() === pid);
                    cartIdProducts[productsArrayPosition].quantity += 1;
                    const updateCartProducts = await cartService.updateCartProductsId(cid, cartIdProducts);
                    res.sendSuccess(updateCartProducts);
                }                
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });

        this.delete("/:cid/products/:pid", ['USER', 'PREMIUM'], async function(req, res){
            try {
                const {cid} = req.params;
                const {pid} = req.params;
                const getCartId = await cartService.getCartById(cid);
                const productInCar = getCartId.products.find(event => event.product._id.toString() === pid);
                
                if(!getCartId) return res.sendClientError({messaje: "Cart not found"});
                if(!productInCar) return res.sendClientError({messaje: "Product not found"});
                
                const productPosition = getCartId.products.findIndex(event => event.product._id.toString() === pid); //Buscamos la posicion del producto a eliminar
                getCartId.products.splice(productPosition, 1) //Una vez encontrado, eliminamos el producto (con la posicion obtenida)
                const newArray = getCartId.products;
                const deleteProduct = await cartService.deleteProductInCarById(cid, newArray);
                if(req.user.role === "PREMIUM"){
                    await sendNotification(req.user.email, {
                        message: `Lo sentimos. Hemos eliminado el producto "${productInCar.product.title}" ha sido borrado :(`,
                        subject: "Eliminacion de producto"
                    });
                }                
                res.sendSuccess(deleteProduct);
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });

        this.put("/:cid/products/:pid", ['USER', 'PREMIUM'], async function(req, res){
            try {
                const {quantity} = req.body;
                const {cid} = req.params;
                const {pid} = req.params;
                
                if (typeof quantity !== "number") return res.sendClientError({messaje: "Error"});
                
                const getCartId = await cartService.getCartById(cid);
                const verify = getCartId.products.find(event => event.product._id.toString() === pid);
                
                if(verify){
                    let updateNumberOfProducts = await cartService.finder(cid);
                    const arrayPosition = updateNumberOfProducts.products.findIndex(event => event.product._id.toString() === pid);
                    updateNumberOfProducts.products[arrayPosition].quantity = quantity;
                    const ans = await cartService.updateCartByProductsId(cid, updateNumberOfProducts);
                    // console.log("ans", ans)
                    res.sendSuccess(ans);
                }else{
                    let updateNumberOfProducts = await cartService.finder(cid);
                    updateNumberOfProducts.products.push({product: pid, quantity: quantity});
                    const ans = await cartService.updateCartByProductsId(cid, updateNumberOfProducts);
                    // console.log("ans", ans);
                    res.sendSuccess(ans);
                }
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });
        
        this.get("/:cid/purchase/:uid/user", ['USER', 'PREMIUM'], async function(req, res){
            const {cid, uid} = req.params;
            const cart = await cartService.getCartById(cid); //Filtramos el carrito con los productos dentro de el
            const products = cart.products; //Almacenamos los productos pertenecientes al carrito (estos productos vienen en formato array)
            const purchaseAvailable = products.filter(event => event.product.stock !== 0);   //Filtramos los productos con un valor diferente de 0 en stock
            const purchaseUnavailable = products.filter(event => event.product.stock < event.quantity); //Filtramos los productos del carrito que tengan un valor mayor al del stock

            purchaseAvailable.forEach(async function(event){
                const productsToSell = await productService.updateProductgetProductById(event.product._id);
                productsToSell.stock =- event.quantity;
                await productService.updateProduct({_id: event.product._id}, productsToSell);
            });

            const ticket = {
                code: uuidv4(),
                purchaseDate: new Date().toLocaleString(),
                amount: purchaseAvailable.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0),
                owner: req.user.email
            };

            const newTicket = await ticketModel.create(ticket);
            if(newTicket) await cartService.updateOneCart(cid, purchaseUnavailable); //Mantenemos en el carrito los productos no comprados por falta de stock
            await userService.updateUser(uid, {cart: purchaseAvailable}); //Almacenamos el carrito en el usuario actual

            res.sendSuccess(newTicket);
        });
    }
}

export default CartRouter;