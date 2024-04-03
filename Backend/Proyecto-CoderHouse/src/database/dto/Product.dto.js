class ProductDto {
    constructor(product, email) {
        this.title = product.title;
        this.description = product.description;
        this.price = product.price;
        this.thumbnail = product.thumbnail;
        this.code = product.code;
        this.stock = product.stock;
        this.category = product.category;
        this.owner = email;
    }
};

export {ProductDto};