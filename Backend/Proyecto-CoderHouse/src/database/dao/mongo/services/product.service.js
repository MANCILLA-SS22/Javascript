import productModel from "../models/products.model.js"

class ProductServiceMongo{
    async getProducts (){
        return  await productModel.find();
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
                await productModel.create(product);
                return "Product added successfully";
            }else{
                return "Product already in stock";
            }

        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            return await productModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct (_id, product){
        try {
            return await productModel.findByIdAndUpdate(_id, product);

        }catch (error) {
            console.log(error);
        }
    }
}

export {ProductServiceMongo}