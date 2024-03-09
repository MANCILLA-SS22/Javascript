class ProductDto {
    constructor(product) {
        this.title = product.title;
        this.description = product.description;
        this.price = product.price;
        this.thumbnail = product.thumbnail;
        this.code = product.code;
        this.stock = product.stock;
        this.status = product.status;
        this.category = product.category;
    }
};

export {ProductDto};