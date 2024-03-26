//archivo.test.js: la subextensión .test.js indica que el archivo será utilizado dentro de un contexto de testing

import {expect} from "chai"; //expect() recibe como parámetro el valor que estamos por testear, posterior a esto, hacemos conexiones de palabras con el fin de llegar a la pregunta final
import mongoose from "mongoose";
import { UsuarioServiceMongo } from "../../src/database/dao/mongo/services/usuarios.service.js";
import config from "../../src/config/config.js";

mongoose.connect(config.mongoUrlTest);

describe('Testing User Dao', function(){ //describe: función utilizada para definir diferentes contextos de testeo, podemos tener la cantidad de contextos que deseemos en un flujo de testing, siempre y cuando reflejen intenciones diferentes.
    before(function () { //before: Función que nos permite inicializar elementos antes de comenzar con todo el contexto de testeo.
        this.usuarioServiceMongo = new UsuarioServiceMongo();
    });

    beforeEach(function () { //beforeEach: Función que nos permite inicializar elementos antes de comenzar cada test dentro de un contexto particular
        this.timeout(5000) // time de espera ya que estamos usando una DB
        mongoose.connection.collections.usuarios.drop(); //Permitira limpiar la base de datos en la coleccion "usuarios" cada vez que se ejecute el test.
    });

    it('El dao debe devolver los usuarios en forma de arreglo', async function () { //it: unidad mínima de nuestro testing, en ella, definimos qué acción se está realizando y cuál será el resultado esperado.
        // Given
        const isArray = true;

        // Then
        const result = await this.usuarioServiceMongo.get();

        // Assert that
        expect(result).to.be.deep.equals(isArray);
        expect(result).deep.equals([]);
        expect(Array.isArray(result)).to.be.ok
        expect(Array.isArray(result)).to.be.equals(true);
        expect(result.length).to.be.deep.equals(isArray.length);
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
        expect(result._id).to.be.ok;
    });  

    afterEach(function () { //afterEach: Función que nos permite realizar alguna acción una vez finalizado cada test dentro del contexto particular.
        mongoose.connection.collections.usuarios.drop();
    });
})

// Descripcion: Chai es una librería de assertions, la cual nos permitirá realizar comparaciones de test más claras. Está pensado para que, las evaluaciones de test que se hagan en cada módulo, sean lo más legibles posibles, haciendo que sean lo más apegadas 
// al inglés, reduciendo el nivel de abstracción.  Chai trabaja en un modelo de assertion extendido también,sin embargo, en esta clase nos centraremos en aplicar el enfoque de comportamiento (BDD) a partir de su módulo de cadena de lenguaje.

// Chai permitirá conectar palabras del inglés, con el fin de poder realizar una prueba más entendible, algunos de estos conectores son:
//   ✓ to: conector inicial para armar la frase.
//   ✓ be: para identificar que el elemento sea algo en particular.
//   ✓ have: para corroborar que el valor a evaluar tenga algo.
//   ✓ and: para encadenar validaciones.

//Estas cadenas de lenguaje se conectan con operadores más específicos, como:
//   ✓ not: para realizar una negación.
//   ✓ deep: Para evaluaciones profundas.
//   ✓ equal: para hacer una comparación de igualdad.
//   ✓ property: para apuntar a alguna propiedad de un objeto

//Hay tres modelos para trabajar con chai: 
//   ✓chai.expect
//   ✓chai.should
//   ✓chai.assert


// se ejecuta con: npx mocha test/dao/Users.dao.chai.test.js