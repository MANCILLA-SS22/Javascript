import fs from 'fs';

export default class CartManager{
    constructor(cart){  // cart --> ./carts.json
        this.cart = cart; 
        this.res; //memory array
        
        let comprobacion = fs.existsSync(this.cart);
        if (comprobacion) {
            try {
                this.res = fs.readFileSync(cart, "utf-8");
                this.res = JSON.parse(this.res);
            } catch (error) {
                this.res = [];
            }
        }else {
            this.res = [];
        }
    }

    async addCart(cart){
        try {
            console.log("1 --> ", this.res.length)
            if (this.res.length === 0) {
                cart.id = 1;
                cart.products = [];
            } else {
                cart.id = this.res.length + 1;
                cart.products = [];
                // if (this.res[this.res.length - 1].id === this.res.length){
                //     console.log("2 --> ", this.res[this.res.length - 1].id);
                //     cart.id = this.res.length + 1;
                //     cart.products = [];
                // }
                // else {
                //     cart.id = this.res[this.res.length - 1].id + 1;
                //     cart.products = [];
                // }
            }
            await this.saveFile(this.res, cart);
        } catch (error) {
            console.log(error);
        }
    }

    async saveFile(data, cart){
        try {
            await fs.promises.writeFile(this.cart, JSON.stringify([...data, cart], null, "\t"));
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async deleteById(id){
        try {
            const jsonData = await this.getProducts();
            const cart = Object.values(jsonData).find((p) => p.id === id);
            if(cart){
                const deleteById = this.res.filter(event => event.id !== id);
                await fs.promises.writeFile(this.cart, JSON.stringify(deleteById, null, "\t"));
                return deleteById;
            }else{
                return "0";
            }

        } catch (error) {
            console.log(error);
        }
    }

    async updateCart(id, product){
        try {
            const parametersExist = product.hasOwnProperty("title") && product.hasOwnProperty("description") && product.hasOwnProperty("price") && product.hasOwnProperty("thumbnail") && product.hasOwnProperty("code") && product.hasOwnProperty("stock");
            const val = this.res.find((p) => p.id === id); 

            if (val){
                if (parametersExist){
                    val.title = product.title;
                    val.description = product.description;
                    val.price = product.price;
                    val.thumbnail = product.thumbnail;
                    val.code = product.code;
                    val.stock = product.stock;

                    await fs.promises.writeFile(this.cart, JSON.stringify(this.res, null, "\t")); 
                    return console.log("updated product successfully");
                }else{
                    return console.error("Not enough information.");
                }
            }else{
                return console.error("Not found id.");
            }            

        } catch (error) {
            console.log(error);
        }
    }

    async updateCartProductsId(id, array) {
        try {
            const jsonData = this.res;
            const itemId = Object.values(jsonData).find((event) => event.id === id);
            itemId.products = array; //Esto sirve para actualizar el array
            await fs.promises.writeFile(this.cart, JSON.stringify(jsonData, null, "\t"));
            return itemId.products;
        }
        catch (error) {
            return error;
        }
    }

    getCart(){
        return this.res;
    }

    getCartById(id){
        const num = this.res.find(event => event.id === id);
        return num;
    }
}