//archivo.test.js: la subextensión .test.js indica que el archivo será utilizado dentro de un contexto de testing

import mongoose from "mongoose";
import { UsuarioServiceMongo } from "../../src/database/dao/mongo/services/usuarios.service.js";
import config from "../../src/config/config.js";
import Assert from "assert";

mongoose.connect(config.mongoUrlTest);

const assert = Assert.strict; //Assert: módulo nativo de nodejs que nos permitirá hacer validaciones de manera estricta y podremos hacer las operaciones que determinarán si un test pasa o no.

describe('Testing User Dao', function(){ //describe: función utilizada para definir diferentes contextos de testeo, podemos tener la cantidad de contextos que deseemos en un flujo de testing, siempre y cuando reflejen intenciones diferentes.
    before(function () { //before: Función que nos permite inicializar elementos antes de comenzar con todo el contexto de testeo. Generalmente se inicializa una vez afectando UNICAMENTE a los "it" que estan fuera de los describe
        this.usuarioServiceMongo = new UsuarioServiceMongo();
    });

    beforeEach(function () { //beforeEach: Función que nos permite inicializar elementos antes de comenzar cada test dentro de un contexto particular. Se ejecuta justo antes de ejecutar los "it"
        this.timeout(5000) // time de espera ya que estamos usando una DB
        mongoose.connection.collections.usuarios.drop(); //Permitira limpiar la base de datos en la coleccion "usuarios" cada vez que se ejecute el test.
    });

    it('El dao debe devolver los usuarios en forma de arreglo', async function () { //it: unidad mínima de nuestro testing, en ella, definimos qué acción se está realizando y cuál será el resultado esperado.
        // Given
        // console.log("this.usuarioServiceMongo", this.usuarioServiceMongo);
        const isArray = true;

        // Then
        const result = await this.usuarioServiceMongo.get()
        console.log("result", result);

        // Assert that
        assert.strictEqual(Array.isArray(result), isArray); //con strictEqual verificamos si ambos parametros son iguales.
    });

    it('El dao debe agregar el usuario correctamente a la DB', async function () {
        // Given
        let mockUser = {
            first_name: "Coder",
            last_name: "House",
            email: "correoprueba@test.com",
            password: "123",
        }

        // Then
        const result = await this.usuarioServiceMongo.save(mockUser)
        console.log(result);

        // Assert that
        assert.ok(result._id); // Evaluara si el parametro pasado es truethy, es decir, que sea cualquier valor definido que no se pueda tomar por falso. ()
    });

    it('El dao debe agregar el arreglo de mascotas vacio por defecto', async function () {
        // Given
        let mockUser = {
            first_name: "Coder",
            last_name: "House",
            email: "correoprueba@test.com",
            password: "123",
        }

        // Then
        const result = await this.usuarioServiceMongo.save(mockUser)
        console.log(result);

        // Assert that
        assert.deepStrictEqual(result.pets, []); //deepStrictEqual hace referencia a una comparacion interna y profunda (incluyendo sus propiedades internas). Si se evita la palabra "deep", el test enviara error debido a que estara valorando que sean referencias distintas.
    });

    it('El dao debe obtener a un usuario por email', async function () {
        // Given
        let mockUser = {
            first_name: "Coder",
            last_name: "House",
            email: "correoprueba@test.com",
            password: "123",
        }

        // Then
        const result = await this.usuarioServiceMongo.save(mockUser);
        const user = await this.usuarioServiceMongo.getBy({email: result.email});
        console.log(result);

        // Assert that
        assert.strictEqual(typeof user, "object"); //deepStrictEqual hace referencia a una comparacion interna y profunda (incluyendo sus propiedades internas). Si se evita la palabra "deep", el test enviara error debido a que estara valorando que sean referencias distintas.
    });    

    afterEach(function () { //afterEach: Función que nos permite realizar alguna acción una vez finalizado cada test dentro del contexto particular.
        mongoose.connection.collections.usuarios.drop();
    });
})

// Pasos a seguir
// (1) Describe es la primera parte informativa de nuestro test, el cual indica de manera explícita cuál será el módulo a testear. Todo lo que coloquemos dentro de este describe pertenece al mismo contexto de test. 
// (2) Ahora, utilizaremos una función before para poder contar con una variable usersDao, la cual nos servirá para utilizar en todos nuestros tests futuros.
// (3) Despues con beforeEach podremos colocar un tiempo máximo de resolución (por defecto son 2 segundos). Ya que estamos utilizando una base de datos, se recomienda colocar un tiempo de reesolución máximo más elevado. 
// (4) Con la palabra it, seremos capaces de describir qué es lo que se espera de la operación que se realizará en dicha prueba.
// (5) Utilizamos assert para ver si las operaciones cumplen o no.

// se ejecuta con: npx mocha test/dao/User.dao.test.js

