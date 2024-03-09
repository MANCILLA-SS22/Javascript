import fs from 'fs';

export default class ProductManager{
    constructor(products){ // ./products.json
        this.products = products; 
        this.res;
        
        let comprobacion = fs.existsSync(this.products);
        if (comprobacion) {
            try { //Recordar que el metodo contructor no puede ser asincrono, y por eso unicamente utilizamos el try-catch.
                this.res = fs.readFileSync(products, "utf-8"); //Leemos (y obtenemos) un array vacio justo cuando no hemos cargado ningun producto
                this.res = JSON.parse(this.res); //Una vez cargado el producto, lo parseamos para poder obtenerlo el objeto proveniente del formato JSON.
            } catch (error) {
                this.res = [];
            }
        }else {
            this.res = [];
        }
    }

    async addProduct(product){
        try {
            const verifyExistence = this.res.some((e) => e.code === product.code); //Verificamos que el codigo de cada producto sea igual. Si son iguales, entonces el producto ya existe y no es necesario agreagarlo
            if (!verifyExistence){
                this.res.length === 0 ? product.id = 1 : product.id = this.res.length + 1;
                this.res.push(product);
                await this.saveFile(this.res);
                return "Product added successfully";
            }else{
                return "Product already in stock";
            }

        } catch (error) {
            console.log(error);
        }
    }

    async saveFile(data){
        try {
            await fs.promises.writeFile(this.products, JSON.stringify([...data], null, "\t"));
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async deleteProduct(id) {
        try {
            const jsonData = await this.getProducts();
            const post = Object.values(jsonData).find((p) => p.id === id);
            if(post){
                const deleteById = this.res.filter(event => event.id !== id);
                await fs.promises.writeFile(this.products, JSON.stringify(deleteById, null, "\t"));
                return deleteById;
            }else{
                return "0";
            }

        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct (id, product){
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

                    await fs.promises.writeFile(this.products, JSON.stringify(this.res, null, "\t")); 
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

    getProducts (){
        return this.res;
    }

    getProductById (id){
        const num = this.res.find(event => event.id === id);
        return num; //retorna true si existe y false si no existe.
    }
}

// AQUI SE ENCUENTRAN LOS OBJETOS PARA REALIZAR PRUEBAS EN POSTMAN
/* [
    {
        "title": "Saiga-12", 
        "description": "Shotgun", 
        "price": 800, 
        "thumbnail": "http://dissidentarms.com/wp-content/uploads/2016/12/20210201_181025-scaled.jpg",
        "code": "SS2000",
        "stock": 1,
        "status": true
    }
    {   
        "title": "RPG", 
        "description": "Launchers", 
        "price": 1000, 
        "thumbnail": "https://static.wikia.nocookie.net/squad_gamepedia/images/9/9a/RPG-7_real_life.jpg/revision/latest?cb=20170116205104",
        "code": "SS2001",
        "stock": 5,
        "status": true
    }
    {   
        "title": "AA-12", 
        "description": "Shotgun", 
        "price": 3000, 
        "thumbnail": "https://static.wikia.nocookie.net/squad_gamepedia/images/9/9a/RPG-7_real_life.jpg/revision/latest?cb=20170116205104",
        "code": "SS2002",
        "stock": 8,
        "status": true
    }
    {
        "title": "Barret .50 cal", 
        "description": "Sniper", 
        "price": 5000, 
        "thumbnail": "https://www.militarytimes.com/resizer/uM3S85PI9oSYKigYiohxkx3Si7w=/1024x0/filters:format(png):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/archetype/    4FP5BTDFBNDWPOBKJPROA3ZDOE.png",
        "code": "SS2003",
        "stock": 3,
        "status": true
    }
    {   
        "title": "AK-12", 
        "description": "Assault riffle", 
        "price": 900, 
        "thumbnail": "https://files.cults3d.com/uploaders/14777289/illustration-file/422a8f9d-fe09-467d-9aa0-7c6976561d36/1.png",
        "code": "SS2004",
        "stock": 8,
        "status": true
    }
    {
        "title": "MP7", 
        "description": "Sub machine gun", 
        "price": 650, 
        "thumbnail": "https://www.airsoftatlanta.com/cdn/shop/products/DSC07015.JPG?v=1558658466",
        "code": "SS2005",
        "stock": 10,
        "status": true
    }
    {
        "title": "G36c", 
        "description": "Launchers", 
        "price": 700, 
        "thumbnail": "https://cdn11.bigcommerce.com/s-9mcepdq780/images/stencil/1280x1280/products/511/1738/1__81892.1553886372.jpg?c=2",
        "code": "SS2006",
        "stock": 9,
        "status": true
    }
    {
        "title": "VEPR-12", 
        "description": "Shotgun", 
        "price": 1500, 
        "thumbnail": "https://gundigest.com/wp-content/uploads/Molot-Vepr-12-f2.jpg",
        "code": "SS2007",
        "stock": 2,
        "status": true
    }
] */