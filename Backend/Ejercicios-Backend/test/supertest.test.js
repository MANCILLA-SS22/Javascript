import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("localhost:5500"); //Este requester de la línea 5 será el encargado de realizar las peticiones al servidor.

describe("Testing Adopme me", function(){

    describe("Testing Pets Api", function(){
        it('Crear una mascrota: El API POST /api/mascotas debe crear una nueva mascota correctamente', async function (){
            //Given
            const petMock = {
                name: "Patitas",
                specie: "pez",
                birthDate: "10-10-2022"
            };

            // Then
            // const result = await requester.post("/api/mascotas").send(petMock); //Retorna toda la informacion proveniente del metodo POST, pero unicamente necesitamos 3 parametros. Para ellos desestructuramos y nos queda la linea de abajo
            // console.log(result);
            const {statusCode, ok, _body} = await requester.post("/api/mascotas").send(petMock);


            //Assert that
            expect(statusCode).is.equal(200);
            expect(_body.payload).is.ok.and.to.have.property("_id");
            expect(_body.payload.adopted).to.equal(false);
            expect(_body.payload).to.have.property("adopted").and.to.be.deep.equal(false);
            
        });

        it('Crear una mascrota: El API POST /api/mascotas debe crear una nueva mascota correctamente', async function (){
            //Given
            const petMock = {
                specie: "pez",
                birthDate: "10-10-2022"
            };

            // Then
            const {statusCode, ok, _body} = await requester.post("/api/mascotas").send(petMock);

            //Assert that
            expect(statusCode).is.equal(400);
            expect(_body).is.ok.and.to.have.property("error");
            expect(_body).to.have.property("status");
            
        });

        it('Crear una mascrota con avatar (Test con upload): Debe poder crearse una mascota con la ruta imagen.', async function (){
            // (1) Cuando estamos trabajando con archivos, recuerda que no es factible poder enviar archivos por medio de un json. Es por ello que, para este caso, tendremos que enviar un multipart FormData. 
            // (2) Para poder enviar todos los campos, no solo los archivos, nos basaremos en el elemento .field
            // (3) Sin embargo, cuando tengamos intención que colocar un archivo como elemento a enviar, se utilizará el elemento .attach.
            // (4) Recuerda que, al hacer un attach, este debe coincidir con el campo esperado por multer en su middleware uploader.single

            //Given
            const petMock = {
                name: "Orejitas",
                specie: "cat",
                birthDate: "10-11-2022"
            };

            //Then
            const result = await requester.post("/api/mascotas/withimage")
                .field("name", petMock.name)
                .field("specie", petMock.specie)
                .field("birthDate", petMock.birthDate)
                .attach("image", "./test/files/coderDog.jpg");
            
            //Assert
            expect(result.statusCode).to.equal(200);
            expect(result._body.payload).to.have.property("_id");
            expect(result._body.payload.image).equal.be.ok;
        });
    });

    describe("Testing Login and session with cookie", function(){
        // 1)  Primero realizaremos un registro. (declaramos una variable “cookie” de manera global en el contexto describe, la utilizaremos para el siguiente test.)
        // 2)  Posteriormente, con el mismo usuario registrado, llamaremos a nuestro login. (Nos interesa esperar (expect) 3 cosas: Que el resultado de la cookie realmente funcione, que la cookie final tenga el nombre de “coderCookie” (que es el nombre que se setea desde el endpoint), y que el valor esté definido)
        // 3)  A partir del login, no evaluaremos necesariamente la respuesta, sino que también nuestro punto de interés será recibir una cookie con el usuario.
        // 4)  Esta cookie la utilizaremos posteriormente para probar que el endpoint current reciba la cookie y nos entregue la información que necesitamos.  

        before(function(){
            this.cookie; //Antes que nada  declaramos una variable “cookie” de manera global en el contexto "describe", la utilizaremos para el siguiente test.
            this.mockUser = { //Inicializamos de manera global el usuario y despues enviamos al login los mismos datos del usuario que recien registramos
                first_name: "Usuario de prueba 2",
                last_name: "Apellido de prueba 2",
                email: "correodeprueba@gmail.com",
                password: "coder1234"
            };
        });    

        it("Test registro del usuario: Debe poder registrar correctamente un usuario", async function (){
            //Given (En este caso es nuestra variable global this.mockUser, por lo que no es necesario pasarlo de vuelta aqui)

            //Then
            const {statusCode} = await requester.post("/api/sesiones/register").send(this.mockUser);

            //Assert
            expect(statusCode).is.equal(200);
        });
        
        it("Test login usuario: Debe poder hacer algun login correctamente con el usuario registrado previamente", async function(){
            //Given
            const mockUser = {
                email: this.mockUser.email,
                password: this.mockUser.password
            };

            //Then
            const result = await requester.post("/api/sesiones/login").send(mockUser);
            const cookieResult = result.headers["set-cookie"][0]; //La cookie se almacena en "headers" y ahora lo qu se debe hacer es acceder a ella en su posicion 0.
            const cookieData = cookieResult.split("=");
            this.cookie = {
                name: cookieData[0],
                value: cookieData[1]
            }
            
            // 
            expect(result.statusCode).is.equal(200);
            expect(this.cookie.name).to.be.ok.and.eql("coderCookie");
            expect(this.cookie.value).to.be.ok;
        });

        it("Test ruta protegida: Debe enviar la cookie que contiene el usuario y desestructurarla correctamente", async function(){
            //Given

            //Then
            //enviamos la cookie que guardamos arriba a partir de un set. Luego el metodo current debolvera el correo del usuario que se guardo desde el login, indicando que efectivamente se guardo una cookie con el valor del usuario (correo).
            const {_body} = await requester.get("/api/sesiones/current").set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);

            //Assert
            expect(_body.payload.email).to.be.ok.and.equal(this.mockUser.email);
        });
    }); 
});






//Supertest es una librería que nos permitirá ejecutar peticiones HTTP a nuestro servidor, para poder probar funcionalidades como estatus de peticiones, envío de bodies en petición o revisión de respuestas recibidas por el servidor. 
//Al probar un endpoint, estaremos probando múltiples módulos en conjunto, utilizados para resolver la funcionalidad que refleja el endpoint.

// Para trabajar con supertest tendremos que trabajar con dos terminales, la perteneciente a la base de datos principal (Server) y una para pruebas (Testing)
// ✓ La primera estará pensada para ejecutar el servidor y dejarlo escuchando, listo para recibir las peticiones de nuestro test.     --> src/backend.js --mode dev
// ✓ La otra terminal servirá para ejecutar el comando de test las veces que sean necesarias hasta finalizar con el flujo de pruebas. --> npx mocha test/supertest.test.js

//Mocha
//before: Función que nos permite inicializar elementos antes de comenzar con todo el contexto de testeo. Generalmente se inicializa una vez afectando UNICAMENTE a los "it" que estan fuera de los describe
//beforeEach: Función que nos permite inicializar elementos antes de comenzar cada test dentro de un contexto particular. Se ejecuta justo antes de ejecutar los "it"
//it: unidad mínima de nuestro testing, en ella, definimos qué acción se está realizando y cuál será el resultado esperado.

//Chai
//equal (Strictly equal): means that your are comparing exactly the same object to itself
//eql (Deeply Equal): means that every property of the compared objects (and possible deep linked objects) have the same value.
//equals = equal = eq
//eqls = eql