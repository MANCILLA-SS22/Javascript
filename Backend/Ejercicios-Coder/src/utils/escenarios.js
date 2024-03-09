import suma from "./suma.js"

// TODO: Escenarios
function escenario1(testPasados){
    console.log("Test 1: La función debe devolver null si algun parametro no es numérico. ");

    // Given 
    const numero1 = "2";
    const numero2 = 2;

    // Then 
    let result = suma(numero1, numero2)

    // Assert
    if (result === null) {
        console.log("Test 1: pasado!!");
        testPasados++
    } else {
        console.error(`Test 1: no paso, se recibio ${typeof result}, pero se esperaba un NULL`);
    }

    return testPasados;
}

function escenario2(testPasados){
    console.log("Test 2: La funcion debe devolver 0 si no se pasa ningún parámetro:");

    // Given 
    // const numero1 = "2";
    // const numero2 = 2;

    // Then 
    let result = suma()

    // Assert
    if (result === 0) {
        console.log("Test 2: pasado!!");
        testPasados++
    } else {
        console.error(`Test 2: no paso, se recibio ${result}, pero se esperaba un 0`);
    }

    return testPasados;
}

function escenario3(testPasados){
    console.log("Test 3: La función debe poder realizar la suma correctamente.");

    // Given 
    const numero1 = 3;
    const numero2 = 2;

    // Then 
    let result = suma(numero1, numero2)

    // Assert
    const expected = numero1 + numero2
    if (result === expected) {
        console.log("Test 3: pasado!!");
        testPasados++
    } else {
        console.error(`Test 3: no paso, se recibio ${result}, pero se esperaba un ${expected}`);
    }

    return testPasados;
}

function escenario4(testPasados){
    console.log("Test 4: La función debe poder realizar la suma con cualquier cantidad de numeros");

    // Given
    const numerosEntrada = [1, 2, 3, 4, 5];
    
    // Then
    let result = suma(...numerosEntrada)

    // Assert
    const expected = 15;
    if (result === expected) {
        console.log("Test 4: pasado!!");
        testPasados++
    } else {
        console.error(`Test 4: no paso, se recibio ${result}, pero se esperaba un ${expected}`);
    }

    return testPasados;
}

export {escenario1 , escenario2, escenario3, escenario4}