/* //Ejemplo 0: Uso del file system (fs) node.js
const fs = require("fs"); //console.log(fs);

fs.writeFileSync("./text.txt", "Escribiendo en un archivo nuevo \nOtro texto");
if(fs.existsSync("./text.txt")){
    console.log("Si existe");
    let contenido = fs.readFileSync("./text.txt", "utf-8");
    console.log(contenido);
    
    fs.appendFileSync("./text.txt", "\nContenido añadido");

    contenido = fs.readFileSync("./text.txt", "utf-8");
    console.log(contenido);

    fs.unlinkSync("./text.txt");    
} */

/* //Ejemplo 1: Uso del file system (fs) con callbacks
const fs = require("fs");
fs.writeFile("./texto_callback.txt", "Escribiendo en un callback", function(error){

    if (error) return console.log("Hubo un error al escribir el archivo");

    fs.readFile("./texto_callback.txt", "utf-8", function(error, contenido){
        if (error) return console.log("Hubo un error al leer el archivo");
    
        console.log(contenido);
    
        fs.appendFile("./texto_callback.txt","\nTexto recién salido del horno", function(error){
            if (error) return console.log("Hubo un error al agregar contenido al archivo");
    
            fs.readFile("./texto_callback.txt", "utf-8", function(error, contenido){
                if (error) return console.log("Hubo un error al leer el archivo");
                console.log(contenido);
    
                fs.unlink("./texto_callback.txt", function(error){
                    if (error) return console.log("Hubo un error al eliminar el archivo");
                });
            });
        });
    });
}); */

/* //Ejemplo 2: Ejercicio practico con fs.
// const fs = require("fs");
import fs from "fs"
const fecha = new Date().toLocaleString();

fs.writeFile("./texto_callback.txt", fecha, function(error){

    if (error) return console.log("Hubo un error al escribir el archivo");

    fs.readFile("./texto_callback.txt", "utf-8", function(error, contenido){
        if (error) return console.log("Hubo un error al leer el archivo");
        console.log("La fecha del arcghivo es: ", contenido);
    });
}); */

/* //Ejemplo 3: Uso del file system (fs) con callbacks Y promesas
// const fs = require("fs");
import fs from "fs"

async function operaciones(fileName) {
    try {
        await fs.promises.writeFile(fileName, "Escribiendo en un archivo con promesas");
        let contenido = await fs.promises.readFile(fileName, "utf-8"); console.log(contenido);
        
        await fs.promises.appendFile(fileName, "\nAgregando contenido");
        contenido = await fs.promises.readFile(fileName, "utf-8"); console.log(contenido);

        await fs.promises.unlink(fileName);

    } catch (error) {
        console.log("Hubo un error");
    }
};

operaciones("./texto.txt"); */

/* //Ejemplo 4: Manejo de datos complejos con fs.promise
const fs = require("fs");

async function operacion (fileName, objeto){
    try {
        await fs.promises.writeFile(fileName, JSON.stringify(objeto, null, "\t"));
        let contenido = await fs.promises.readFile(fileName, "utf-8");
        let data = JSON.parse(contenido);

        console.log(contenido);
        console.log(data);
        console.log(data.id);
        console.log(typeof contenido);

        let array = [data, { id: 2, name: "Arturo", age: 25 }];
        await fs.promises.writeFile(fileName, JSON.stringify(array, null, "\t"));
    
    } catch (error) {
        console.log(error);
        console.log("Hubo un error");
    }
};

operacion("./texto.json", {
    id: 1,
    name: "Roberto",
    age: 24,
}); */

/* //Ejemplo 5: Ejercicio practico Manager de usuarios
// Se creará una clase que permita gestionar usuarios usando fs.promises, éste deberá contar sólo con dos métodos: Crear un usuario y consultar los usuarios guardados.
// ✓ El Manager debe vivir en una clase en un archivo externo llamado ManagerUsuarios.js
// ✓ El método “Crear usuario” debe recibir un objeto con los campos: Nombre Apellido Edad Curso.
//   El método debe guardar un usuario en un archivo “Usuarios.json”, deben guardarlos dentro de un arreglo, ya que se trabajarán con múltiples usuarios
// ✓ El método “ConsultarUsuarios” debe poder leer un archivo Usuarios.json y devolver el arreglo correspondiente a esos usuarios

const fs = require("fs");

class ManagerUsuarios{
    #usuarios;

    constructor(fileName){ //Mandamos el "fileName", ya que se podria utilizar varios "ManagerUsuarios" con diferentes tipos de usuarios.
        this.fileName = fileName;

        let comprobacion = fs.existsSync(this.fileName);
        if (comprobacion) {
            try { //Recordar que el metodo contructor no puede ser asincrono, y por eso unicamente utilizamos el try-catch.
                console.log("True");
                this.usuarios = fs.readFileSync(fileName, "utf-8");
                this.usuarios = JSON.parse(usuarios);
            } catch (error) {
                // console.log(error);
                this.usuarios = [];
            }
        }else {
            this.usuarios = [];
        }
    }

    async saveFile(data) {
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, "\t"));
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async addUsuario(usuario) {
        this.usuarios.push(usuario);
        const respuesta = await this.saveFile(this.usuarios);
    
        if (respuesta) {
            console.log("Usuario creado");
        } else {
            console.log("Hubo un error al crear un usuario");
        }
    }
    
    consultarUsuarios() {
        console.log(this.usuarios);
        return this.usuarios;
    }
}

class Usuario{
    constructor(nombre, apellido, edad, curso){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.curso = curso;
    }
}

// Pruebas
const usuario1 = new Usuario("Mariano", "Lopez", 26, "Backend");
const usuario2 = new Usuario("Felipe", "Lopez", 36, "Backend");
const usuario3 = new Usuario("Arturo", "Feliz", 26, "Frontend");

const manager = new ManagerUsuarios("./Usuarios.json");

console.log(manager.consultarUsuarios());
manager.addUsuario(usuario1);
manager.addUsuario(usuario2);
manager.addUsuario(usuario3);
// console.log(manager.consultarUsuarios()); */

/* //Ejemplo 6: Ejercicio practico Manager de posts
const fs = require("fs");

class ManagerPost{
    constructor(path){ //El constructor no puede ser asincrono. Por eso se usa readFileSync.
        this.path = path;
        this.posts;

        try{
            this.posts = fs.readFileSync(this.path, "utf-8"); //Creamos una variable "posts" que va a tener los datos (que recibira del archivo)
            this.posts = JSON.parse(posts); //Despues, el texto que recibimos en la linea de arriba, lo parseamos (convertimos a JSON) y se vuelve a almacenar en el atributo de la clase.
        } catch (error) {
            this.posts = []; //En caso de que no exista, simplemente almacenamos un array vacio.
        }
    }

    async savePost(post){
        if(!post) return console.log("El post esta vacio");

        const existPost = this.posts.find(event => event.id === post.id);
        if(existPost) return console.log("El post ya existe!");

        try{
            this.posts.push(post);
            await fs.promises.writeFile(this.path, JSON.stringify(this.posts, null, "\t"))
        }catch (error) {
            console.log(`Hubo un error al guardar los datos: ${error}`);
            return;
        }
    }

    async deletePost(id) {
        const post = this.posts.find((p) => p.id === id);

        if (!post) {
            return console.log("El post no existe");
        }

        const index = this.posts.findIndex(post);

        try {
            this.posts.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(this.posts, null, "\t") );
        } catch (error) {
            console.log(`Hubo un error al guardar los datos: ${error}`);
            return;
        }
    }

    validate(post){
        if(!post.userId || !post.id || !post.title || !post.body){
            return false;
        }else{
            return true;
        }
    }

    getPosts(){
        return this.posts;
    }

};

class Post{
    constructor(userId, id, title, body){
        this.userId = userId;
        this.id = id;
        this.title = title;
        this.body = body;
    }
}

async function fetchDatos() {
    try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    
    const manager = new ManagerPost("./posts.json");
    for (let i = 0; i < 10; i++) {
        const post = new Post(
            data[i].userId,
            data[i].id,
            data[i].title,
            data[i].body,
        );
        manager.savePost(post);
    }

    console.log(manager.getPosts());
    
    } catch (error) {
    console.log(`Hubo un error ${error}`);
    }
}

fetchDatos(); */

/* //Ejemplo 7: Manejo de archivos (Segundo desafio)
//  ✓ Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos.
//  ✓ La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.
//  ✓ Debe guardar objetos con el siguiente formato:
//    - id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
//    - title (nombre del producto)
//    - description (descripción del producto)
//    - price (precio)
//    - thumbnail (ruta de imagen)
//    - code (código identificador)
//    - stock (número de piezas disponibles)
//  ✓ Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).
//  ✓ Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
//  ✓ Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto
//  ✓ Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID
//  ✓ Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.

const fs = require("fs");

class ProductManager{
    constructor(products){ // ./products.txt
        this.products = products; 
        this.res;
        
        let comprobacion = fs.existsSync(this.products);
        if (comprobacion) {
            try { //Recordar que el metodo contructor no puede ser asincrono, y por eso unicamente utilizamos el try-catch.
                console.log("True");
                this.res = fs.readFileSync(products, "utf-8"); //Leemos (y obtenemos) un array vacio justo cuando no hemos cargado ningun producto
                this.res = JSON.parse(this.res); //Una vez cargado el producto, lo parseamos para poder obtenerlo el objeto proveniente del formato JSON.
            } catch (error) {
                this.res = [];
            }
        }else {
            this.res = [];
        }
    }

    async addProduct (product){
        try {
            const verifyExistence = this.res.some((e) => e.code === product.code); //Verificamos que el codigo de cada producto sea igual. Si son iguales, entonces el producto ya existe y no es necesario agreagarlo
            if (!verifyExistence){
                // if (this.res.length === 0) {
                //     product.id = this.res.length+1;
                // }else{
                //     if(this.res[this.res.length-1].id === this.res.length){
                //         product.id = this.res.length + 1;
                //     } 
                //     else{
                //         product.id = this.res[this.res.length-1].id+1;
                //     }
                // }
                this.res.length === 0 ? product.id = 1 : product.id = this.res.length + 1;
                this.res.push(product);
                await fs.promises.writeFile(this.products, JSON.stringify([...this.res, product], null, "\t"));
                // return console.error("Product added successfully");
            }else{
                return console.error("Product already in stock");
            }

        } catch (error) {
            console.log(error);
        }
    }

    async deletePost(id) {
        try {
            const post = this.res.find((p) => p.id === id); console.log(post)
            if(post){
                const deleteById = this.res.filter(event => event.id !== id);
                console.log("Nuevi array", deleteById)
                await fs.promises.writeFile(this.products, JSON.stringify(deleteById, null, "\t"));
                return console.log("Removed product successfully");
            }else{
                return console.log("El post no existe");
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
        num ? console.log("The product found by id is: ", num) : console.log("Product not found by id");
    }

}

class GestionDeProductos{
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

const Product = new ProductManager("./products.txt");

// Obtenemos el array vacio
// console.log(Product.getProducts());

// Agregamos productos al arreglo vacio
const producto1 = Product.addProduct(new GestionDeProductos(
    "AK-47", 
    "Assault riffle", 
    9, 
    "https://www.therange702.com/wp-content/uploads/2021/09/AK47-768x513-1.jpg.webp",
    "SS1998",
    5
));

const producto2 = Product.addProduct(new GestionDeProductos(
    "P-90", 
    "Sub machine gun", 
    6, 
    "https://www.therange702.com/wp-content/uploads/2022/12/fn-p90-sqsh.jpg.webp",
    "SS1999",
    5
));

const producto3 = Product.addProduct(new GestionDeProductos(
    "Saiga-12", 
    "Shotgun", 
    10, 
    "http://dissidentarms.com/wp-content/uploads/2016/12/20210201_181025-scaled.jpg",
    "SS2000",
    5
));

const producto4 = Product.addProduct(new GestionDeProductos(
    "RPG", 
    "Launchers", 
    200, 
    "http://dissidentarms.com/wp-content/uploads/2016/12/20210201_181025-scaled.jpg",
    "SS2001",
    5
));

const productiActualizar = {
    title: "new title", 
    description: "new description", 
    price: 1000, 
    thumbnail: "new url image", 
    code: "new code", 
    stock: 10 
}

// console.log(Product.getProducts());

// console.log(Product.getProductById(3));
// console.log(Product.getProducts());

// Product.deletePost(4);
// console.log(Product.getProducts());

// console.log(Product.getProducts());
// console.log(Product.getProducts());

// Product.updateProduct(1, productiActualizar);
// console.log(Product.getProducts()); */

/* //Ejemplo 8: Lectura y escritura de archivos
Escribir un programa ejecutable bajo node.js que realice las siguientes acciones:
✓ Abra una terminal en el directorio del archivo y ejecute la instrucción: npm init -y. Esto creará un archivo especial (lo veremos más adelante) de nombre package.json
✓ Lea el archivo package.json y declare un objeto con el siguiente formato y datos:
    const info = {
        contenidoStr: (contenido del archivo leído en formato string),
        contenidoObj: (contenido del archivo leído en formato objeto),
        size: (tamaño en bytes del archivo)
    }
✓ Muestre por consola el objeto info luego de leer el archivo
✓ Guardar el objeto info en un archivo llamado info.json dentro de la misma carpeta de package.json
✓ Incluir el manejo de errores (con throw new Error)
✓ Utilizar el módulo promises de fs dentro de una función async/await y utilizar JSON.stringify + JSON.parse para poder hacer las transformaciones json->objeto y viceversa. */

/* //Ejemplo 9: Práctica de módulos nativos: fs + crypto
// Se creará una clase “UserManager” que permitirá guardar usuarios en un archivo. El usuario se recibirá con una contraseña en string plano, y se deberá guardar la contraseña 
// hasheada con crypto. Utilizar los módulos nativos fs y crypto, El manager debe contar con los siguientes métodos:
// ✓ El método “Crear usuario” debe recibir un objeto con los campos: Nombre, Apellido, Nombre de usuario, y Contraseña
//    El método debe guardar un usuario en un archivo “Usuarios.json”, recordando que la contraseña debe estar hasheada por seguridad
// ✓ El método “Validar Usuario” recibirá el nombre de usuario que quiero validar, seguido de la contraseña, debe poder leer el json previamente generado con el arreglo de 
//    usuarios y hacer la comparación de contraseñas, Si coinciden el usuario y la contraseña, devolver un mensaje “Logueado”, caso contrario indicar error si el usuario no existe, o si la contraseña no coincide.

const fs = require("fs");
const crypto = require("crypto");

class UserManager {
    constructor(path) {
        try {
            this.path = path;
            this.users = fs.readFileSync(path, "utf-8");
            this.users = JSON.parse(users);
        } catch {
            this.users = [];
        }
    }

    async crearUsuario(user){
        const hashPassword = crypto.createHash("sha256").update(user.password).digest("hex");
        user.password = hashPassword;
        this.users.push(user);

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.users, null, "\t"));
            console.log("User Created")
        } catch (error) {
            console.log("Error creating user: "+ error);
        }

    }

    validarUsuario(username, password) {
        const userExists = this.users.find((user) => user.username === username);
        if (!userExists) return console.log("User does not exists");

        const hashPassword = crypto.createHash("sha256").update(password).digest("hex");
        userExists.password === hashPassword ? console.log("Logged!") : console.log("Invalid Password");
    }
}

class User {
    constructor(nombre, apellido, username, password) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.username = username;
        this.password = password;
    }
}

const user = new UserManager("./Users.json");
user.crearUsuario(new User("emi", "perez", "emiperez", "123"));
user.crearUsuario(new User("yessi", "perez", "yessiperez", "1234"));
user.crearUsuario(new User("facu", "perez", "facuperez", "pauli"));
user.crearUsuario(new User("paula", "perez", "pauperez", "facu123"));

// user.validarUsuario("emiperez", "123");
// user.validarUsuario("pauperez", "facu123");
// user.validarUsuario("yessiperez", "123");
// user.validarUsuario("yessuperez", "123"); */

/* //Ejemplo 10: Calculadora de edad
// Realizar un programa que utilice la dependencia momentjs (deberá instalarse por npm install).
// ✓ Debe contar con una variable que almacene la fecha actual (utilizar moment())
// ✓ Debe contar con una variable que almacene sólo la fecha de tu nacimiento (utilizar moment).
// ✓ Validar con un if que la variable contenga una fecha válida (utilizar el método isValid());
// ✓ Finalmente, mostrar por consola cuántos días han pasado desde que naciste hasta el día de hoy. (utilizar el método diff()
// ✓ Extra: Cambia tu moment a la versión 1.6.0, al no ser la misma versión mayor, nota el cambio al correr el programa.

const moment = require("moment");
const fechaActual = moment();
const fechaPropia = moment("1998-04-22");
const transcurso = fechaActual.diff(fechaPropia, "days");

if (!fechaPropia.isValid()){
    return console.log("Please fix the date introduced!");
}else{
    return console.log(`La cantidad de dias pasados es de: ${transcurso} dias`)
} */

/* //Ejemplo 11: Nodemon ~ Solucion a error en consola: https://www.alexmedina.net/habilitar-la-ejecucion-de-scripts-para-powershell/ ~
import http from "http" //console.log(http);
const server = http.createServer((request, response) => {
    console.log(request.url);
    if(request.method === "GET" && request.url === "/")  response.end("Mi primer servidor con node js"); //Con .end enviamos una respuesta
    if(request.url !== "/") response.end("Error pagina no encontrada!");
});

server.listen(8080, function(){ //Con este comando definimos el numero de puerto
    console.log("Server listening on port 8080");
}); */
