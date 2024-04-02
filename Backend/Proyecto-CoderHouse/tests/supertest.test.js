import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("localhost:5500"); //Este requester de la línea 5 será el encargado de realizar las peticiones al servidor.

describe("Testing Global Weapons", function(){
    describe("Testing Products Api", async function(){
        it('Obtener todos los productos: El API GET /api/products debe obtener todos los products correctamente', async function (){
            //Given
            
            // Then
            const {_body, status} = await requester.get("/api/products");
            
            //Assert that
            expect(status).is.equal(200);
            expect(_body).to.have.property("payload");

        });

        it('Obtener un producto por id: El API GET /api/products debe obtener un producto correctamente', async function (){
            //Given

            // Then
            const id = "66024acb40aff040a158b251";
            const {_body} = await requester.get(`/api/products/${id}`);

            //Assert that
            expect(_body.payload).to.have.property("status").is.true;
        });

        it('Obtener un mock de productos con faker: Debe devolver un arreglo de 100 elementos de faker.', async function (){
            //Given
            
            //Then
            const {_body, status} = await requester.get("/api/products/mockingproducts");

            //Assert
            expect(status).is.equal(200);
            expect(_body.payload).to.have.lengthOf(100);
        });
    });

    describe("Testing Carts Api", function(){
        it('Obtener todos los carritos: El API GET /api/carts debe obtener todos los carritos correctamente', async function (){
            //Given
            
            // Then
            const {_body, status} = await requester.get("/api/carts");
            
            //Assert that
            expect(_body).to.have.property("products");

        });

        it('Obtener un producto por id: El API GET /api/products debe obtener un producto correctamente', async function (){
            //Given

            // Then
            const id = "660b9e100802b4e956e57b0f";
            const {_body} = await requester.get(`/api/carts/${id}`);

            //Assert that
            expect(_body.payload).to.have.property("status").is.true;
        });
    });
    
    describe("Testing Users Api", function(){
        it('Verificar usuario registrado: El API GET /api/sessions/current debe comprobar si el usuario esta registrado correctamente', async function (){
            //Given
            
            // Then
            const { _body, status } = await requester.get('/api/sessions/current');            

            //Assert that
            expect(_body.payload.message).is.equal("No eres un usuario logeado");
            expect(status).is.equal(200);
        });
    });  
});


//Supertest es una librería que nos permitirá ejecutar peticiones HTTP a nuestro servidor, para poder probar funcionalidades como estatus de peticiones, envío de bodies en petición o revisión de respuestas recibidas por el servidor. 
//Al probar un endpoint, estaremos probando múltiples módulos en conjunto, utilizados para resolver la funcionalidad que refleja el endpoint.

// Para trabajar con supertest tendremos que trabajar con dos terminales, la perteneciente a la base de datos principal (Server) y una para pruebas (Testing)
// ✓ La primera estará pensada para ejecutar el servidor y dejarlo escuchando, listo para recibir las peticiones de nuestro test.     --> nodemon src/app.js --mode dev
// ✓ La otra terminal servirá para ejecutar el comando de test las veces que sean necesarias hasta finalizar con el flujo de pruebas. --> npx mocha tests/supertest.test.js

//Mocha
//before: Función que nos permite inicializar elementos antes de comenzar con todo el contexto de testeo. Generalmente se inicializa una vez afectando UNICAMENTE a los "it" que estan fuera de los describe
//beforeEach: Función que nos permite inicializar elementos antes de comenzar cada test dentro de un contexto particular. Se ejecuta justo antes de ejecutar los "it"
//it: unidad mínima de nuestro testing, en ella, definimos qué acción se está realizando y cuál será el resultado esperado.

//Chai
//equal (Strictly equal): means that your are comparing exactly the same object to itself
//eql (Deeply Equal): means that every property of the compared objects (and possible deep linked objects) have the same value.
//equals = equal = eq
//eqls = eql