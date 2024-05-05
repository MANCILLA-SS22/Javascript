import productModel from "../models/products.model.js"

class ProductServiceMongo{
    async getProducts (){
        try {
            return  await productModel.find();
        } catch (error) {
            return error;
        }
    }

    async getProductsNew (filter, conditionalQuery){
        try {
            return await productModel.paginate(filter, conditionalQuery);
        }catch (error) {
            return error;
        }
    }

    async getProductById (getProductById){
        const res = await productModel.findById(getProductById);
        return res;
    }

    async addProduct(product){
        try {
            const verifyExistence = await productModel.findOne({code: product.code}); //Verificamos que el codigo de cada producto sea igual. Si son iguales, entonces el producto ya existe y no es necesario agreagarlo
            if (!verifyExistence){
                const productCreated = await productModel.create(product);
                return productCreated;
            }else{
                return "Product already in stock";
            }

        } catch (error) {
            return error;
        }
    }

    async deleteProduct(id) {
        try {
            return await productModel.findByIdAndDelete(id);
        } catch (error) {
            return error;
        }
    }

    async updateProduct (_id, product){
        try {
            return await productModel.findByIdAndUpdate(_id, product);
        }catch (error) {
            return error;
        }
    }
}

export {ProductServiceMongo}