// function suma (num1, num2){ //Solo aplica en los primeros tres testers 
//     //                                                                     Test 1: Solo se define la funcion VACIA son las lineas de abajo (el test debe fallar)
//     if (typeof num1 != 'number' || typeof num2 != 'number') return null; //Test 2: La función debe devolver null si algun parametro no es numérico    
//     if (!num1 || !num2) return 0;                                        //Test 3: La funcion debe devolver 0 si no se pasa ningún parámetro:
//     return num1 + num2;                                                  //Test 4: La función debe poder realizar la suma correctamente.
// }


//Test 4: La función debe poder realizar la suma con cualquier cantidad de numeros.

function suma (...numbers){
    console.log("Entrando a la suma con arreglo de numeros: ", numbers);
    let result = 0;

    //Test 2: La funcion debe devolver 0 si no se pasa ningún parámetro
    if (numbers.length === 0) return 0;

    //Test 1: La función debe devolver null si algun parametro no es numérico
    // if (!numbers.every(num => typeof num === "number")) return null; //Refactor de Test 1
    for (let index = 0; index < numbers.length; index++){
        if (typeof numbers[index] != "number") return null;
    }

    //Test 3-4: La función debe poder realizar la suma correctamente.
    // result = numbers.reduce((prev, current) => prev + current); //Refactor de Test 3-4
    for (let index = 0; index < numbers.length; index++) {
        result += numbers[index];
    };

    console.log('Resultado de la suma: ', result);
    return result
};

export default suma;