import {cartModel} from "../models/carts.model.js";

class CartServiceMongo{
    async getCart(){
        try {
            return await cartModel.find();
        } catch (error) {
            return error;
        }
    }

    async addCart(cart){
        try {
            const newProduct = await cartModel.create(cart);
            return "Cart added successfully";
        } catch (error) {
            console.log(error);
        }
    }    

    async getCartById(id){
        try {
            // return await cartModel.findById(id);

            //Populate (traditional way)
            return await cartModel.findById({_id: id}).populate("products.product", "title description price stock");

            //Populate in middleware
            // return await cartModel.findOne({_id: id});
            
        } catch (error) {
            return error
        }
    }

    async updateCartProductsId(id, array) {
        try {
            return await cartModel.findByIdAndUpdate(id, {products: array});
        }
        catch (error) {
            return error;
        }
    }

    async deleteProductInCarById(id, newArrayProducts){
        try {
            const deleteProduct = await cartModel.findByIdAndUpdate(id, {products: newArrayProducts});
            return "Product deleted from cart"
        } catch (error) {
            
        }
    }

    async updateCartByProductsId(cartId, updateNumberOfProducts){
        try {
            return await cartModel.findByIdAndUpdate(cartId, updateNumberOfProducts);
        } catch (error) {
            return error
        }
    }

    async updateOneCart(cid, arrayProducts){
        try {
            const cart = await cartModel.findById(cid);
            cart.products = arrayProducts;
            const res = await cartModel.findByIdAndUpdate(cid, cart);
            return res;
        } catch (error) {
            
        }
    }

    async deleteProductsById(id){
        try {
            await cartModel.findByIdAndDelete(id);
            return "Cart deleted successfuly!";
        } catch (error) {
            
        }
    }
    
    // -------------------------------------->
    async finder(cartId){
        try {
            return await cartModel.findById(cartId);
        } catch (error) {
            return error
        }
    }
};

export {CartServiceMongo};