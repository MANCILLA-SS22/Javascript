import config from "../config/config.js";
import { escenario1, escenario2, escenario3, escenario4 } from "../utils/escenarios.js";

function tests(){
    const executeTest = config.runTests; //Ejecutar --> nodemon run start --test true en la terminal 
    if (executeTest) {
        console.log("Ejecutando set de pruebas de func suma()");

        //Escenarios
        let testPasados = 0;
        testPasados = escenario1(testPasados); //Test 1: Debe devolver null si algun parametro no es numérico.
        testPasados = escenario2(testPasados); //Test 2: Debe devolver 0 si no se pasa ningún parámetro
        testPasados = escenario3(testPasados); //Test 3: Debe poder realizar la suma correctamente.
        testPasados = escenario4(testPasados); //Test 4: Debe poder realizar la suma con cualquier cantidad de numeros.
        console.log(`Test a ejecutar: 4, pasados: ${testPasados}`);
    }    
}

export {tests}