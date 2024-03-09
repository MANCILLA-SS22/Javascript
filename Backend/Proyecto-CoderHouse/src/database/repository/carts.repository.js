class CartsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getCart(){
        return this.dao.getCart();
    };

    addCart(cart){
        return this.dao.addCart(cart);
    };

    getCartById (id){
        return this.dao.getCartById(id);
    };

    updateCartProductsId(id, array){
        return this.dao.updateCartProductsId(id, array);
    };

    deleteProductInCarById(id, newArrayProducts){
        return this.dao.deleteProductInCarById(id, newArrayProducts);
    };

    updateCartByProductsId(cartId, updateNumberOfProducts){
        return this.dao.updateCartByProductsId(cartId, updateNumberOfProducts);
    };

    updateOneCart (cid, arrayProducts){
        return this.dao.updateOneCart(cid, arrayProducts);
    };

    deleteProductsById(id){
        return this.dao.deleteProductsById(id);
    };

    finder(cartId){
        return this.dao.finder(id);
    };    
};

export {CartsRepository}