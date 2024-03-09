class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getProducts(){
        return this.dao.getProducts();
    };

    getProductsNew(filter, conditionalQuery){
        return this.dao.getProductsNew(filter, conditionalQuery);
    };

    getProductById (getProductById){
        return this.dao.getProductById(getProductById);
    };

    addProduct(product){
        return this.dao.addProduct(product);
    };

    deleteProduct(id){
        return this.dao.deleteProduct(id);
    };

    updateProduct(_id, product){
        return this.dao.updateProduct(_id, product);
    };
};

export {ProductsRepository}