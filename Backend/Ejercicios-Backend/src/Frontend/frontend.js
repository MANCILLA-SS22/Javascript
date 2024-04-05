// node src/Frontend/frontend.js

//         $$$$$$$$$$$$$$$ Funciones $$$$$$$$$$$$$$$


/* //Ejemplo 1: Definicion de mi funcion
function saludar (){
    console.log("--> Hola !!");
}

 //Ejemplo 2: Llamado de mi funcion
for (let index = 0; index < 6; index++) {
    saludar();
} */

/* //Ejemplo 2: Definicion de mi funcion

function pedirNombre(){
    let nombreIngresado = prompt("Ingresar nombre");
    console.log("El nombre es: "+ nombreIngresado);
}

pedirNombre(); */

/* //Ejemplo 3: Como crear una funcion si necesito reiterar varias veces su funcionalidad

function pedirNombre(){
    let index = 0;
    let cantidad = 3;

    for (index; index < cantidad; index++) {
        let nombreIngresado = prompt("Ingresar nombre");
        alert("El nombre es: "+ nombreIngresado);
    }
}

pedirNombre(); */

/* //Ejemplo 4: Creacion de una funcion que recibe parametros
function verParametros(p1,p2){
    let res = p1 - p2;
    console.log("La resta es: ".concat(res));
}

let variable1 = parseFloat(prompt("Ingrese el valor de la variable 1: "));
let variable2 = parseFloat(prompt("Ingrese el valor de la variable 2: "));

verParametros(variable1, variable2); */

/* //Ejemplo 5: Creacion de una funcion que recibe parametros, esta calcula una resta aritmetica y devuelve su valor.
function resta(p1,p2){
    let res = p1 - p2;
    return res;
}

let variable1 = parseFloat(prompt("Ingrese el valor de la variable 1: "));
let variable2 = parseFloat(prompt("Ingrese el valor de la variable 2: "));

//let res = verParametros(variable1, variable2);
//console.log("El resultado es: " + res);

console.log("El resultado es: " + resta(variable1, variable2)); */

/* //Ejemplo 6: Uso de una funcion para validar una contrasena.

function passwordValidation(password, repeatPassword)
{
    if (password == "" || repeatPassword) 
    {
        console.log("Las contrasenas deben contener caracteres.");
    }

    if (password != repeatPassword) ;
    {
        console.log("Las contrasenas ingresadas no son iguales.");
    }

    if (password.length < 8);
    {
        console.log("La contrasena debe tener al menos 8 caracteres.");
    }

    if (password.length > 15);
    {
        console.log("La contrasena no debe tener mas de 15 caracteres.");
    }
} 

passwordValidation("123", "pass"); */

/* //Ejemplo 7: Uso del ambito de varaibles para cambiar el valor de variables globales
let res = 0;
function suma(num1, num2){
    res = num1 + num2;
}
suma(5,6);
console.log(res); */

/* //Ejemplo 8: Uso del ambito de varaibles para cambiar el valor de variables locales
let res = ""; //let resultado = undefined; let resultado = null;
function suma(num1, num2)
{
    let res = num1 + num2;
    return res; 
}
res = suma(5,6);
console.log(res); */

/* //Ejemplo 9: Creacion de variables anonimas y su uso.

const sum = function(a,b)
{
    return a + b;
};

const res = function(a,b)
{
    return a - b;
};

console.log( sum(15,20) );
console.log( res(15,5) ); */

/* //Ejemplo 10: Uso de finiciones flecha (Si es una funcion de una sola linea con retorno podemos evitar escribir el cuerpo.)

const add = (a, b) => {return a + b}; //Metodo 1 para utilizar flecha 
const subs = (a, b) => a - b;         //Metodo 2 para utilizar flecha

console.log( add(15,20));
console.log( subs(20,5));

//Ejemplo de practica - Si una funci�n es una sola l�nea con retorno y un par�metro puede evitar escribir los ().

const suma = (a,b) => a + b;
const resta = (a,b) => a - b;
const iva = x => x * 0.21;

let precioProducto = 500;
let descuento = 50;

let nuevoPrecio = resta( suma(precioProducto, iva(precioProducto)), descuento );
console.log(nuevoPrecio); */


//         $$$$$$$$$$$$$$$ Funciones de orde superior $$$$$$$$$$$$$$$


/* //Ejemplo 1: Desarrollo de una funcion para conseguir la abstraccion de la suma consecutiva de numeros dentro de un rango.

let total = 0;
function sumarRango(inicio, fin){
    for (let i = inicio; i <= fin; i++) {
        total += i;
    }
    return total;
}
console.log( sumarRango(1, 100) ) 
console.log("La suma total de 1 hasta 10 es: "+ total.toString()); */

/* //Ejemplo 2: Retorno de funciones y concepto sobre funciones con un esquema superior
function mayorQue(n) {
    return (m) => m > n
}

// Retorna    (m) => m>17     y nos queda     mayorDeEdad = (m) => m>17    donde (m) contendra el valor que le mandaremos desde la linea 28. En este caso, ahora la variable
// mayorDeEdad se convertira en una funcion, en la cual (m) sera el parametro al que le llegara el valor enviado desde la linea 32, que es 5.
let mayorDeEdad = mayorQue(17); 

// Como tenemos que \ mayorDeEdad = (m) => m>17 /. Entonces nos damos cuenta que en la funcion ahora tenemos el parametro (m) y no (n) como en la primera funcion, por lo que 
//ahora desde la linea 32 mandamos un 5, que se almacenara en ese variable (m) y obtendremos que  5>17, lo que resulta como un valor booleano, que se almacena en "res".
let numero = parseInt(5); 
let res = mayorDeEdad(numero); 

if (res) {
    console.log("El numero "+ numero+ " es mayor que 17."+ mayorDeEdad);
}else{
    console.log("El numero "+ numero+ " NO es mayor que 17."+ mayorDeEdad);
} */

/* //Ejemplo 3: Aplicacion de una funcion en CALL STACK
function multiply (x, y) {
 return x * y;
}
function printSquare (x) {
    let s = multiply(x,x);
    console.log(s);
}

printSquare(5); */

/* //Ejemplo 4: Retorno de funciones con un if.
function asignarOperacion (op) {
    if (op == "sumar") {
        return (a, b) => a + b
    }else if (op == "restar") {
        return (a, b) => a - b
    }
}
let suma = asignarOperacion ("sumar")
let resta = asignarOperacion ("restar")
console.log( suma(4, 6) ) // 10
console.log( resta(5, 3) ) // 2 */

/* //Ejemplo 5: Como podemos pasar por parametro una funcion (funcionalidad)
function porCadaElemento(elementos, funcionalidad){
    for (const unElemento of elementos) {
        funcionalidad(unElemento);
    }
}

function acumular(numero){
    total += numero;
}

let total = 0;
let numeros = [10, 20, 30, 40, 50];
porCadaElemento(numeros, console.log);
porCadaElemento(numeros, acumular);
console.log("El valor total de la suma de los elementos de "+ numeros.toString()+ " es: "+ total+"."); */

/* // Ejemplo 6.1: Default Parameters
const bookings = [];

const createBooking = function( flightNum, numPassengers = 1, price = (199*numPassengers) ){
    
    // Metodo utilizado en ES5 para establecer un valor inicial a esos parametros
    // numPassengers = numPassengers || 1;
    // price = price || 199
    const booking = {
        flightNum,
        numPassengers,
        price
    };
    console.log(booking);
    bookings.push(booking);
}

createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 5);
createBooking("LH123", undefined, 1000); */

/* // Ejemplo 6.2: How Passing Arguments Works: Value vs Reference
const flight = 'LH234';
const jonas = {name: 'Jonas Schmedtmann', passport: 24739479284};

const checkIn = function (flightNum, passenger) {
    flightNum = 'LH999';
    passenger.name = 'Mr. ' + passenger.name;

    if (passenger.passport === 24739479284) {
        console.log('Checked in');
    } else {
        console.log('Wrong passport!');
    }
};

checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas); //When we try to copy an object, we're really only copying the reference to that object in the memory heap. They are both the same object in the memory heap

const newPassport = function(person){
    person.passport = Math.trunc(Math.random()*10000000000)
}

newPassport(jonas);
checkIn(flight, jonas); */

/* // Ejemplo 6.3: Functions Accepting Callback Functions
const oneWord = function (str) {
    const res = str.replace('/ /g', '').toLowerCase(); //     / /g sirve para capturar todos los elementos globales y no solamente 1. En este casi, queremos todos los espacios en blanco, y si no usamos esto, unicamente obtendremos el primer espacio en blanco.
    return res;
};

const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' '); //El string tiene 4 palabras. Capturamos la 1era palabra con first, y las otras 3 las capturamos en una variable desestructurada (others), la cual devolvera un nuevo array con las 3 palabras restantes.
    const res = [first.toUpperCase(), ...others].join(' '); //Convertimos las letras de la 1era palabra a mayusculas, y a esa palabra, le unimos con ayuda del join(), las otras 3 que estan en el array generado con el split().
    return res;
};

// Higher-order function
const transformer = function (str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);
    console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

const high5 = function () {
    console.log('👋');
};
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5); */

/* // Ejemplo 6.4: Functions Returning Functions
const greet = function (greeting) {

    return function (name) {
        console.log(`${greeting} ${name}`);
    };
};

//Llamamos a la funcion greet y le mandamos "hey". Despues, esta funcion retorna otra funcion que se almacena en greeterHey. Entonces, cuando en la linea de abajo volvemos a llamar a la funcion greeterHey, ahora ejecutaremos la funcion pero que esta almacenada en esta variable. O sea, la funcion del return.
const greeterHey = greet('Hey');
greeterHey('there');
greet('Hey')('there'); //Esto es lo mismo que las dos lineas de arriba.

// Esto es lo mismo que el procedimiento de arriba pero con arrow functions.
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Hey')('there'); */

/* // Ejemplo 6.5: The call() method
const arr = [1,2,3,4,5]
const res1 = Object.prototype.toString.call(arr) // returns "[object Array]"
console.log("res1", res1)

const str = 'test'
str.toString() // returns 'test'
const res2 = Object.prototype.toString.call(str) // returns "[object String]"
console.log("res2", res2) */

/* // Ejemplo 6.7: The bind() Method
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',bookings: [],

    book: function(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    }
};

lufthansa.planes = 300;            // Agregamos una nueva propiedad a lufthansa
lufthansa.buyPlane = function (event){  // Agregamos un nuevo metodo a lufthansa
    event.preventDefault();
    this.planes++;                 // Ponemos el this para representar o llamar al objeto que dicha función está modificando.
    // console.log(this); 
    // console.log(this.planes);
};                                  // lufthansa.buyPlane(); Esto despliega exacamente lo que queremos ver una vez que precionamos el boton del addEventListener().

//Al hacer esto, entonces decimos que, al hacer click, el console.log(this); retornara el boton. La razon de esto es porque en un event handler function, el "this" siempre 
//apunta al elemento donde se adjunta el handler. Por lo tanto, lufthansa.buyPlane es el handler function, y esta adjunto a la parte del querySelector, que seria el 
//elemento padre. Por eso, el console.log(this), muestra el elemento del boton. Ahora bien, en el handler function, necesitamos que el this de lufthansa.buyPlane apunte
//objeto de lufthansa, y no a la parte del querySelector. Para ello, tenemos que definirlo ahi mismo como se muestra en la linea que le sigue, y la manera de hacerlo es pasarle
//la funcion (bind) y no llamarla (call) porque el bind nos retornara una nueva funcion. Y finalmente, ahora el this apuntara a lufthansa y NO al boton del querySelector
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));


// Dos formas de devolver una funcion utilizando bind() y de la forma tradicional (devolviendo una funcion dentro de otra).
function addTax (rate, value){
    let res = value + value * rate;
    console.log("rate", rate);
    console.log("value", value);
    console.log(res);
    return res;
};

// const addVAT = addTax.bind(0.23, null);
const addVAT = addTax.bind(null, 0.23); //El primer parametro del bind siempre debe ser lo que ahora sera el "this". Pero como no hay ninun this en la funcion, simplemente ponemos null
addVAT()
// console.log("The result of addVAT is: "+ addVAT(100));

const addTaxRate = function (rate) {
    return function (value) {
        return value + value * rate;
    };
};
const addVAT2 = addTaxRate(0.23);
console.log("The result of addVAT is: "+addVAT2(100)); */

/* // Ejemplo 6.5: The call(), apply() and bind() method
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book: function(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    }
};

const eurowings = {airline: 'Eurowings',iataCode: 'EW',bookings: []};
const swiss = {airline: 'Swiss Air Lines',iataCode: 'LX',bookings: []};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

// Call method: You can write a method that can be used on different objects. It takes arguments separately. No recive una lista de argumentos despues del this. Permitira que la palabra recerbada this apunte a eurowings.
const book = lufthansa.book; //Al hacer esto, ahora la funcion (metodo) del objeto lufthansa pasa a ser una funcion global, por lo que, no pudemos utilizarla asi nada mas y mandarle valores ya que esta funcion tiene "this", los cuales pertenecian al objeto lufthansa.
book.call(eurowings, 23, 'German mancilla'); 
book.call(lufthansa, 514, 'Chavez german');
// book(23, "res"); Esto NO funciona

// Apply method: You can write a method that can be used on different objects. It takes arguments as an array.
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
book.call(swiss, ...flightData);
console.log(swiss);

const bookEW = book.bind(eurowings); // Bind method: Allows us to manually set "this" for any function call. With the bind() method, an object can borrow a method from another object.
bookEW(23, "German Mancilla Chavez");

const bookEWX = book.bind(eurowings, 23);
bookEWX("German Mancilla Chavez"); */

/* // Ejemplo 6.8: Excercise with functions
// A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter 'poll' object below. Your tasks:
// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
// 1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this: 
// What is your favourite programming language?
// 0: JavaScript
// 1: Python
// 2: Rust
// 3: C++
// (Write option number)

// 1.2. Based on the input number, update the 'answers' array property. For example, if the option is 3, increase the value at position 3 of the array by one (1). Make sure 
// to check if the input is a number and if the number makes sense (e.g. answer 52 wouldn't make sense, right?)
// 2. Call this method whenever the user clicks the "Answer poll" button.
// 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 
// 'array', simply display the results array as it is, using cl(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
// 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.
// 5. Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll object!

// Test data for bonus: Data 1: [5, 2, 3]

const poll = {
    question: "What is your favourite programming language?",
    options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"], // This generates [0, 0, 0, 0]. More in the next section!
    answers: new Array(4).fill(0),

    registerNewAnswer(){ // (1)
        const res = Number(prompt(`${this.question}\n${this.options.join("\n")}\n (Write option number)`)); // (1.1)
        typeof res === "number" && res < this.answers.length && this.answers[res]++; // (1.2) Si el primer if es verdadero, pasamos al siguiente, pero cuando lleguemos a un false, se corta el condicional (&& representa un if)
        console.log("Imprimos el objeto: ", poll);
        console.log("Imprimos el arreglo: ", this.answers);
        console.log("Imprimos el num seleccionado: ", res);

        this.displayResults();         //(4)
        this.displayResults("array");  //(4)
        this.displayResults("string"); //(4) 
    },
    
    displayResults(type = "array"){  //(3)
        if(type === "array"){
            console.log("Imprimimos el array con los valores", this.answers);
        }else if(type === "string"){
            console.log(`Poll results are ${this.answers.join(", ")}`);
        }
    }
};

document.querySelector(".poll").addEventListener("click", poll.registerNewAnswer.bind(poll)) //(2)

//Usamos call() porque necesitamos un nuevo this. Es decir, usar la funcion de un objeto en otro. Despues, como this.answers necesita apuntar a otra direccion (ya que ahora 
//esta fuera de poll), dentro de los parentesis de call creamos y le pasamos un objeto con el mismo nombre (ya que sino aparece como undefined) y a ese objeto le añadimos el nuevo array 
//que queremos. Asi mismo, le pasamos un argumento para que se pueda ejecutar el condicional.
poll.displayResults.call({answers: [5, 2, 3]}, "string"); // (5) */

/* // Ejemplo 6.9: Immediately Invoked Function Expressions (IIFE)
//Se usa cuando queremos una funcion que se utilice de inmediato una vez, que no sea necesario guardarla ni darle yn nombre, y que finalmente desaparezca para no volverla a usar

const runOnce = function(){
    console.log("This will never run again");
};
runOnce();

(function(){ //Transformamos la declaracion que tenemos arriba, en una expresion.
    console.log("This will never run again");
})(); */

/* // Ejemplo 6.10: Closures
const secureBooking = function () {
    let passengerCount = 0;

    return function () {//Al momento de retornar esta funcion (hija), se tiene acceso a sus elementos o variables del padre. Em este caso, passengerCount, que es un global scope.
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    };
};

const booker = secureBooking();
booker();
booker();
booker();

console.dir(booker); */

/* // Ejemplo 6.11: More Closure Examples

//Example 1
let f; //Creamos una variable global que almacenara una funcion
const g = function () {
    const a = 23; //closure
    f = function () { //Podemos utilizar esta funcion repetidas ocaciones
        console.log(a * 2);
    };
};

const h = function () {
    const b = 777; //closure
    f = function () {
        console.log(b * 2);
    };
};

//Para poder acceder a f no podemos simplemente llamar a esa fucnion, ya que JS no la va a reconocer. Es decir, primero tenemos que llamar a su elemento padre y despues acceder a ella. En este caso, g y posteriormente h, son los padres de f.
g();
f();
console.dir(f);

h();
f();
console.dir(f);

//Example 2
const boardPassengers = function (n, wait) {
    const perGroup = n / 3;

    setTimeout(function () { //setTimeout necesita de dos parametros, en este caso usaremos una funcion y el otro debe ser el tiempo.
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);

    console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; //Si fijamos un valor en perGroup como variable global, de igual manera no se vera reflejado en el console.log porque al llamar la funcion, ejecutara la variable perGroup, la cual pisara a la que primero se creo con el valor de 1000.
boardPassengers(180, 3);


//Example 3
// Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the body element 
// is clicked. Do not select the h1 element again. Think about when exactly the callback function is executed, and what that means for the variables involved in this example.

(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';

    document.querySelector('body').addEventListener("click", function(){
        header.style.color = 'blue';
    });
})();  */


//         $$$$$$$$$$$$$$$ Objects, classes & OOP $$$$$$$$$$$$$$$


/* //Ejemplo 1: Definicion de caracteristicas para un objeto y como podemos ver los datos dentro del objeto
let unPaciente = {DNI: "11222333", apellidos: "Mancilla", nombre: "German", edad: 36, altura: 170, peso: 72, generoBiologico: "Masculino", tipoSangre: "A+"};
console.log("El objeto contiene estos datos: ", unPaciente);
console.log("El paciente se llama: ", unPaciente.nombre);         //Forma 1 de seleccionar una variable de un objeto
console.log("El paciente se apellida: ", unPaciente["apellidos"]);//Forma 2 de seleccionar una variable de un objeto */

/* //Elemplo 2: Aignacion de valores
let unPaciente = {DNI: "11222333", apellidos: "Mancilla", nombre: "German", edad: 36, altura: 170, peso: 72, generoBiologico: "Masculino", tipoSangre: "A+"};
unPaciente.apellidos = "res";
unPaciente.nombre = "SS22";
unPaciente.DNI = 44555666;
unPaciente["edad"] = 33;
console.log("Los datos actualizados son: ", unPaciente); */

/* //Ejemplo 3: Definicion de un objeto sin datos definidos para sus propiedades.
let unPaciente = {DNI: undefined, apellidos: undefined, nombre: undefined, edad: undefined, altura: undefined, peso: undefined, generoBiologico: undefined, tipoSangre: undefined};
unPaciente.apellidos = "res";
unPaciente.nombre = "SS22";
unPaciente.DNI = 44555666;
unPaciente["edad"] = 33;
console.log("Los datos actualizados son: ", unPaciente); */

/* //Ejemplo 4: Definicion de una funcion constructora para un objeto
function paciente(DNI, apellidos, nombre, edad, altura, peso, generoBiologico, tipoSangre){
this.DNI = DNI;
this.apellidos = apellidos;
this.nombre = nombre;
this.edad = edad;
this.altura = altura; 
this.peso = peso;
this.generoBiologico = generoBiologico;
this.tipoSangre = tipoSangre;
this.obraSocial = undefined;};

let paciente1 = new paciente("44555666","Cosme","Pricilla",undefined,183,65,"femenino",undefined);
console.log("Los datos actualizados son: ", paciente1); */

/* //Ejemplo 5: Ejemplo de aplicacion de metodos de un objeto
function producto(nombre, precio, cantidad){
    //propiedades
    this.nombre = nombre;
    this.precio = parseFloat(precio);
    this.cantidad = parseInt(cantidad);
    this.hayInventario = !!parseInt(cantidad); //this.hayInvenatrio = hayInventario; (ambas son correctas)
    
    //. !parseInt(cantidad) --> es un valor booleano, si el n�mero es 10, se convierte en false, si es 0 se convierte en true.
    //   Pero nosotros necesitamos el valor equivalente real, si ingres� 10 quiero que sea true, si ingres� 0 quiero que sea false. Por ello es que agregamos dos negaciones !!
    //. !!parseInt(cantidad) --> lo que conseguimos con la !! es consegui el inverso de un elemento inverso. O sea, el valor booleano true de un elemento.
    //   Podemos definir un par�metro como (hayInventario) y en este pasar desde la funci�n constructora a partir de la palabra reservada new. Tener en cuenta que esta segunda opci�n nos "obliga" a manejar este dato y su valor durante la carga de los datos que el usuario indique.    
    
    //metodos
    this.toString = function(){
        return this.nombre;
    };

    this.Stock = (cantidadIncrementada) => {
        return this.cantidad += this.cantidad + parseInt(cantidadIncrementada);
    };

    this.comprar = (cantidadComprada) => {
        return this.cantidad -= parseInt(cantidadComprada);
    };
};

let nombre = "Carne";
let precio = "200";
let cantidad = "5";
let unProducto1 = new producto(nombre, precio, cantidad);
console.log("Los valores que cargaste para el producto son: ", unProducto1); */

/* //Ejemplo 6: Uso de las construcciones IN y FOR-IN
function paciente(DNI, apellidos, nombre, edad){
this.DNI = DNI;
this.apellidos = apellidos;
this.nombre = nombre;
this.edad = edad;
};

let paciente1 = new paciente("44555666", "Cosme", "Pricilla", 24);

console.log("Existe la propiedad DNI dentro del objeto?", {resultado: "DNI" in paciente1});
//console.log("Existe la propiedad DNI dentro del objeto?", "DNI" in paciente1); //Esto es lo mismo que la linea de arriba

console.log("Existe la propiedad obraSocial dentro del objeto?", {resultado: "obraSocial" in paciente1});
//console.log("Existe la propiedad obraSocial dentro del objeto?", "obraSocial" in paciente1); //Esto es lo mismo que la linea de arriba

for(const iter in paciente1){ //Despues del const podemos poner cualquier nombre, el cual servira para iterar y buscar todas las propiedades del objeto.
    console.log("La propiedad ("+iter + ") tiene el valor de: "+ paciente1[iter]);
} */ 

/* //Ejemplo 7: Ejemplo practico con objetos y funciones 

const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYeah: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense: true,

    calcAge0: function (birthYeah) {
        return 2037 - birthYeah;
    },

    calcAge1: function () {
        return 3000 - this.birthYeah;
    },
    
    calcAge2: function () {
        return this.age = 4000 - this.birthYeah;
    },
    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge2() - this.birthYeah}years old ${jonas.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`
    //  return `${jonas.firstName} is a ${this.calcAge2()}-year old ${jonas.job}, and he has ${jonas.hasDriversLicense ? 'a' : 'no'} driver's license.`
    }
};

console.log(jonas);
console.log("res1: ",jonas.calcAge0(1991));
console.log("res2: ",jonas.calcAge1());
console.log("res3: ",jonas.calcAge2());
console.log("res4: ",jonas.age);
console.log("res5: ",jonas.getSummary()); 

const measureKelvin = function () {
    const measurement = {type: 'temp', unit: 'celsius', value: parseInt(100),};
    console.table(measurement);
    const kelvin = measurement.value + 273;
    return kelvin;
};

console.log(measureKelvin()); */

/* //Ejemplo 8: Definicion de una clase y uso de los metodos dentro de una clase

class producto{
    //Metodo constructor de una clase
    constructor(nombre, precio, cantidad){
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        this.hayInventario = !!parseInt(cantidad); //this.hayInvenatrio = hayInventario; (ambas son correctas)
    };

    //Metodos y funciones
    nombreProducto() {
        return this.nombre;
    }

    incrementarStock(cantidadIncrementada) {
        this.cantidad = this.cantidad + parseInt(cantidadIncrementada);
    }

    comprar(cantidadComprada){
        this.cantidad = this.cantidad - parseInt(cantidadComprada);
    }
}

let unProducto = new producto("Papa", 400, 50);
console.log("Los datos del producto son: ", unProducto);
console.log("El nombre del producto es: "+ unProducto.nombreProducto());

unProducto.incrementarStock(10);
console.log("Compre 10 kilos mas de papa y ahora tengo: ", unProducto);
unProducto.comprar(40); 
console.log("Compre 40 kilos mas de papa y ahora tengo:", unProducto); */

/* //Ejemplo 9: Literales de objeto mejoradas

const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const openingHours = {
        [weekdays[3]]: {open: 12,close: 22,},
        [weekdays[4]]: {open: 11,close: 23,},
        [weekdays[5]]: {open: 0,close: 24,},
    };

    console.log(openingHours);

const restaurant = {
    Name: 'Classico-Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic-Bread', 'Caprese-Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    info: [
        {id: 1, nombre: "german"},
        {id: 2, nombre: "mancilla"}
    ],
    fecharegistro: new Date(),
    poseeTaarjetaCredito: false, 
    poseeVehiculo: true,

    openingHours, //openingHours: openingHours,    Ambas son lo mismo

    order(starterIndex, mainIndex){  //order: function(starterIndex, mainIndex){   Ambas son lo mismo
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    orderDelivery({time, address, mainIndex, starterIndex}){
        return console.log(`Desestructuracion de un objecto usando funcion --> Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    },

    orderDeliveryX2({time="20:00", address, mainIndex=0, starterIndex=1}){
        return console.log(`Desestructuracion de un objecto usando funcion X2--> Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    }
}; */

/* //Ejemplo 10: Registrador de tickets de eventos
// Se creará una clase que permitirá llevar una gestión completa de usuarios que deseen acceder a dichos eventos.
//     ✓ Definir clase TicketManager, el cual tendrá un arreglo de eventos que iniciará vacío
//     ✓ La clase debe contar con una variable privada “precioBaseDeGanancia”, la cual añadirá un costo adicional al precio de cada evento.
//     ✓ Debe contar con el método “getEventos” El cual mostrará los eventos guardados.
//     ✓ Debe contar con el método “agregarEvento” El cual recibirá los siguientes parámetros:
//         ○ nombre
//         ○ lugar
//         ○ precio (deberá agregarse un 0.15 del valor original)
//         ○ capacidad (50 por defecto)
//         ○ fecha (hoy por defecto)
        
//         El método deberá crear además el campo id autoincrementable y el campo “participantes” que siempre iniciará con un arreglo vacío.
//      ✓ Debe contar con un método “agregarUsuario” El cual recibirá:
//         ○ id del evento (debe existir, agregar validaciones)
//         ○ id del usuario
//      El método debe evaluar que el evento exista y que el usuario no haya estado registrado previamente (validación de fecha y capacidad se evitará para no alargar el reto)
//      Si todo está en orden, debe agregar el id del usuario en el arreglo “participantes” de ese evento.
//      
//      ✓ Debe contar con un método “ponerEventoEnGira” El cual recibirá:
//         ○ id del evento
//         ○ nueva localidad
//         ○ nueva fecha
//      El método debe copiar el evento existente, con una nueva localidad, nueva fecha, nuevo id y sus participantes vacíos (Usar spread operator para el resto de las propiedades)

class TicketManager{
    #precioBaseDeGanancia = 0.15;

    constructor(){
        this.eventos = [];
    }

    getEventos(){
        return this.eventos;
    }

    agregarEvento(evento){
        evento.precio = evento.precio + (evento.precio * this.#precioBaseDeGanancia);

        if(this.eventos.length === 0){
            evento.id = 1;
        }else{
            evento.id = this.eventos[this.eventos.length - 1].id + 1;
        }

        this.eventos.push(evento);
    }

    agregarUsuario(idEvento, idUsuario){
        const evento = this.eventos.find(evento => evento.id === idEvento);

        if(!evento) return console.log("No existe el evento");
        
        if(!evento.participantes.includes(idUsuario) ){
            evento.participantes.push(idUsuario)
        }else{
            return console.log("El usuario ya existe");;
        } 
    }

    ponerEventoEnGira(idEvento, nuevaLocalidad, nuevaFecha){
        const evento = this.eventos.find(evento => evento.id === idEvento);

        if(!evento) return "No existe el evento"

        const newEvento = {
            ...evento,
            lugar: nuevaLocalidad,
            fecha: nuevaFecha,
            id: this.eventos[this.eventos.length - 1].id + 1,
            participantes: []
        }

        this.eventos.push(newEvento);
    }
}

class Evento{
    constructor(nombre, lugar, precio, capacidad, fecha = new Date().toLocaleString(), participantes){
        this.nombre = nombre;
        this.lugar = lugar;
        this.precio = precio;
        this.capacidad = capacidad;
        this.fecha = fecha;
        this.participantes = [];
    }
}

//Pruebas
const manejadorEventos = new TicketManager();

console.log("agregando Evento coder 1 para Argentina, precio: 200, para 50 participantes");
manejadorEventos.agregarEvento(new Evento("Evento coder 1", "Argentina", 200, 50));

console.log("agregando al evento con id 1 la participacion del usuario con id 2");
manejadorEventos.agregarUsuario(1, 2);

// console.log("creando una copia vacía del evento 1 pero en mexico y para el 2024");
// manejadorEventos.ponerEventoEnGira(1, "Mexico", "30/11/2024");

console.log(manejadorEventos.getEventos()); */

/* //Ejemplo 11: Clases con ECMAScript y ECMAScript avanzado
// ✓ Realizar una clase “ProductManager” que gestione un conjunto de productos.
// ✓ Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío
// ✓ Cada producto que gestione debe contar con las propiedades:
//    - title (nombre del producto)
//    - description (descripción del producto)
//    - price (precio)
//    - thumbnail (ruta de imagen)
//    - code (código identificador)
//    - stock (número de piezas disponibles)
// ✓ Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
//    - Validar que no se repita el campo “code” y que todos los campos sean obligatorios
//    - Al agregarlo, debe crearse con un id autoincrementable
// ✓ Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento.
// ✓ Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id. En caso de no coincidir ningún id, mostrar en consola un error “Not found”.

class ProductManager{

    #products;

    constructor(){
        this.#products = [];
    }

    getProducts(){
        return this.#products;
    }
    
    addProduct(product){
        const parametersExist = product.hasOwnProperty("title") && product.hasOwnProperty("description")&& product.hasOwnProperty("price")&& product.hasOwnProperty("thumbnail")&& product.hasOwnProperty("code")&& product.hasOwnProperty("stock");
        const verifyExistence = this.#products.some((e) => e.code === product.code)
        if(!verifyExistence){
            if(!parametersExist || (product.title === "" ||  product.description === "" ||  product.price === null ||  product.thumbnail === "" ||  product.code === "" ||  product.stock === null) ){
                return console.error("Not enough information");
            }else{
                this.#products.push({
                    ...product,
                    id: this.#products.length === 0 ? product.id = 1 : product.id = this.#products[this.#products.length - 1].id + 1
                });
                
            }
        }else{
            return console.error("Same code is registered")
        }
    }

    getProductById(id){
        const res = this.#products.find(event => event.id === id);
        if (res) {
            return res;
        }else{
            console.error("Not found")
        }
    }
}

class GestionDeProductos{
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title || "";
        this.description = description || "";
        this.price = price || null;
        this.thumbnail = thumbnail || "";
        this.code = code || "";
        this.stock = stock || null;
    }
}

const Product = new ProductManager();

//Obtenemos el array vacio
// console.log(Product.getProducts());

//Agregamos productos al arreglo vacio
const producto1 = Product.addProduct(new GestionDeProductos(
    "AK-47", 
    "Assault riffle", 
    9, 
    "https://www.therange702.com/wp-content/uploads/2021/09/AK47-768x513-1.jpg.webp",
    "SS-1998",
    5
));

const producto2 = Product.addProduct(new GestionDeProductos(
    "P-90", 
    "Sub machine gun", 
    6, 
    "https://www.therange702.com/wp-content/uploads/2022/12/fn-p90-sqsh.jpg.webp",
    "SS-1999",
    5
));

const producto3 = Product.addProduct(new GestionDeProductos(
    "Saiga-12", 
    "Shotgun", 
    10, 
    "http://dissidentarms.com/wp-content/uploads/2016/12/20210201_181025-scaled.jpg",
    "SS-2000",
    5
));

//Mostramos el array con los productos anadidos
console.log(Product.getProducts());

// //Comprobamos que no se debe agregar un producto con mismos parametros
// const producto5 = Product.addProduct(new GestionDeProductos(
//     "AK-47", 
//     "Assault riffle", 
//     9, 
//     "https://www.therange702.com/wp-content/uploads/2021/09/AK47-768x513-1.jpg.webp",
//     "SS-1998",
//     5
// ));

// //Recuperamos el id de un producto existente
// console.log(Product.getProductById(3));

// //En caso de no existir el id solicitado, se retorna un mensaje de error
// console.log(Product.getProductById(4)); */


/* //Ejemplo 12: Creacion de un contador
class Contador {
    static contadorGlobal = 0;

    constructor(responable, inicial) {
        this.responable = responable;
        this.contadorInicial = inicial;
    }

    getResponsable() {
        return `${this.responable}`;
    }

    contar() {
        this.contadorInicial++;
        Contador.contadorGlobal++;
    }

    getCuentaIndividual() {
        return this.contadorInicial;
    }

    getCuentaGlobal() {
        return Contador.contadorGlobal;
    }
}

// Pruebas
const contador1 = new Contador("Fulanito", 0);
const contador2 = new Contador("Arturito", 0);

// Contamos
contador1.contar();
contador2.contar();
contador1.contar();
contador1.contar();
contador2.contar();
contador1.contar();
contador2.contar();
contador1.contar();

// Cuenta individual
console.log(contador1.getResponsable(), contador1.getCuentaIndividual());
console.log(contador2.getResponsable(), contador2.getCuentaIndividual());

// Cuenta global
console.log(contador1.getCuentaGlobal());
console.log(contador2.getCuentaGlobal()); */

/* //Ejemplo 13: Constructor Functions, the "new" and the "this" Operator (do this)

// 1. New {} is created. We create a new instance (a new empty object) of the Person function.
// 2. function is called, this = {}. The this keyword will be set to this newly created object. That's to say, the "this" keyword points to the new empty object.
// 3. {} linked to prototype
// 4. function automatically return {} that empty object from the constructor function 

// NEVER DO THIS!
// function Person(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;

//     this.calcAge = function () {
//         console.log(2037 - this.birthYear);
//     };
// };

function Person(firstName, birthYear) { //Constructor function
    this.firstName = firstName;
    this.birthYear = birthYear;
};

Person.prototype.calcAge = function () { //We create a new calcAge method with the prototype keyword to the Person object. So, we can use this method on the german or karla object even though it isn't on the object itself. The reason why we create this method outsite the constructor function, is becuase when creating it inside, this method is added to all the object created. So, it's best to add this method to every object just when necessary.
    console.log("My age is: ", 2037 - this.birthYear);
}; 

const german = new Person('German', 1991);
const karla = new Person('Karla', 2017);

german.calcAge();
karla.calcAge();

console.log("german is an instance of Person? ", german instanceof Person);
console.log(german, karla);    //Although we created a new calcAge method in both objects, they don't contain this method but we have access to it because of prototypal inherencce.

// Prototypal Inheritance on Built-In Objects
console.log("Person.prototype ", Person.prototype); //"prototype" let you to add properties and methods to JavaScript objects (in this case, the Person object). All the objects that are created through this function constructor function (Person), will inherit. So they will get access to all the methods and properties that arre defined on this prototype property.
console.log("german.__proto__ ", german.__proto__); //This is the prototype of german (not the prototype porperty) It is the same as: console.log(Person.prototype); 
console.log(german.__proto__.__proto__);            //It is the prototype property of object
console.log(german.__proto__ === Person.prototype); //It's true because the prototype of the german object is essentially the prototype property of the constructor function. (Person.prototype is actually not the prototype of Person, but it is what's gonna be used as the prototype of all the objects that are created with the person constructor function. )
console.dir(Person.prototype.constructor);

console.log(Person.prototype.isPrototypeOf(german));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Homo Sapiens';

console.log(german.species, karla.species);      //Both objects will inherit and will get access to this property from the prototype.
console.log(german.hasOwnProperty('firstName')); //This is true because "firstname" was created directly in the constructor function
console.log(german.hasOwnProperty('species'));   //This is false because the species property isn't directly in the object because of it's not its own property (the ones that are declared directly on the object itself, and not including the inherited properties).


const arr = [3, 6, 6, 5, 6, 9, 9]; //  new Array === []  whenever we create an array like this, it is indeed created by the array constructor.
console.log("Array.prototype ", Array.prototype)
console.log("arr.__proto__ ", arr.__proto__);
console.log(arr.__proto__.__proto__);
console.log(arr.__proto__ === Array.prototype); 

Array.prototype.unique = function () { //We create a new method (unique) into the object Array. Some methods like this are filter, some, map, etc.
    return [...new Set(this)];
};

console.log(arr.unique()); //Seeing in the MDN documentation, we can realize that every method (function) when using arrays, have the following sintaxis: Array.prototype.map().

const h1 = document.querySelector('h1'); console.dir(h1)
console.dir(function funciones(x){x + 1}); */

/* //Ejemplo 14: classes, Setters and Getters (assessors properties), static method and Object.create

//We need to create a constructor function. Whenever we create a new object (like a new instance using the new operator), this constructor will automatically be called.
class PersonCl{
    constructor(fullName, birthYear){ 
        this.fullName = fullName;
        this.birthYear = birthYear;
    }; 

    //Instance methods (Methods will be added to .prototype property and all instances can have access to them)
    calgAge(){ //All the methods that we write in the class (outside of the constructor), will be on the prototype on the object and not on the objects themselves.
        console.log("calgAge: ", 2037 - this.birthYear);
    };

    greet(){
        console.log(`greet:  ${this._fullName}`)
    }

    get age(){
        return `age: ${2037 - this.birthYear}`;
    }
    
    //Set a property that already exists.
    set fullName(name){ 
        //We're creating a setter for a property name that does already exists. So, fullName is already a property to set in the constructor function, but then we also have a 
        //setter here. Now what's gonna happen is that each time the constructor function is executed, so whenever we set the fullName on the this keyword, then actually the 
        //method (set fullName) is gonna be executed. And, that name that we pass in as fullName (German mancilla) will then become this name.
        //Now, When we're using setters which is trying to set a property that already exists, both the setter function here and the construction function have the exact same 
        //property name (fullName), and will get an error. So, to fix that, we need to create a new property name, that's to say, "fullName" must be a different name.
        //Having done so, then the "fullName" property in the object german won't exists, but the "_fillname" property will. If we aren't going to setter for a property name 
        //that does already exists, then there's no need to change the name of this variable.
        console.log("name ", name);
        name.includes(" ") ? this._fullName = name : `${name} is not a full name!`
    }

    get fullName(){
        return this._fullName;
    }

    static hey(){ //Static class methods are defined on the class itself. Staic are not available on instances
        console.log("Hello world");
        console.dir(this);
    }
    
}

const german = new PersonCl("German mancilla", 1998); //We use the this keyword as before, and will be set to the newly created empty object. So, when we create a new instance here, then the constructor function is gonna be called and that will return a new object and then that will be stored in "dani".

// This method is NOT inherited. So, we couldn't call the from method on an array like german.hey(); because it isn't in the prototype of the german object.
// PersonCl.hey = function(){
//     console.log("Hello world");
//     console.log(this)
// }
// german.hey(); //We will get an error because german doesn't inherit the hey() method

console.log(german);
console.dir(PersonCl);
german.calgAge();
german.greet();
console.log(german.age);
PersonCl.hey(); //That's exactly the object that is calling the method. So, whatever object is calling the method, will be the this keyword inside of that funcion. And here the this keyword  is simply the entire constructor function.
console.dir(PersonCl.hey)

console.log(german.__proto__);
console.log(german.__proto__ === PersonCl.prototype);

// 1. Classes are not hoisted even if they're class declarations. Functions declarations are hoisted, which means we can use them before they're declared in the code. With classes tgat doesn't work.
// 2. Class are first-class citizens. This means that we can pas them into functions and also return them from functions. (classes are just a special kind of functions behind the scenes)
// 3. Classes are executed in strict mode. And so even if we didn't activate it for our entire script, all the code that is in the class will be executed in strict mode.

const account = {
    owner: 'Jonas',
    movements: [200, 530, 120, 300],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    set latest(mov) {
        this.movements.push(mov);
    },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);

//Object.create 
// --> Here there's still the idea of prototypal inheritance. However, there are no prototypal properties involved and also no constructor funcionds and no new operator. So, we can use Object.create to manually set the prototype of an object to any other object that we want.
const PersonProto = {
    init(firstName, birthYear){ //This looks like the constructor function that we created in the last methods, but here this is isn't the case becasue we don't use the new operator to call this.
        this.firstName = firstName; //The this keyword will point to the mancilla object, and it does so because we explicitly called   mancilla.init("German", 1998);
        this.birthYear = birthYear;
        console.log(this); // === console.log(mancilla);
    },

    calgAge(){ //All the methods that we write in the class (outside of the constructor), will be on the prototype on the object and not on the objects themselves.
        console.log("calgAge: ", 2037 - this.birthYear);
    },
}

const mancilla = Object.create(PersonProto); //This will return a brand new object that is linked to the prototype that we passed in here. So, mancilla is right now an empty object and it'll be linked to the PersonProto object. PersonProto should be the prototype of mancilla.

console.log(PersonProto);
console.log(mancilla.__proto__);
console.log(mancilla.__proto__ === PersonProto);

// mancilla.name = "chavez"; //We can create properties manually like this
// mancilla.year = 2002;

mancilla.init("German", 1998);
mancilla.calgAge(); //The calcAge() method is called on an object, for example, on the mancilla object. This means that the 'this' keyword inside of the calcAge() method will reference mancilla object. The mancilla object has a property called birthYear, so this.birthYear inside of calcAge() will translate to mancilla.birthYear . */

/* //Ejemplo 15: Inheritance Between "Classes": Constructor Functions
function Person(firstName, birthYear) { //Constructor function
    this.firstName = firstName;
    this.birthYear = birthYear;
};

Person.prototype.calcAge = function () { //We create a new calcAge method with the prototype keyword to the Person object. So, we can use this method on the german or karla object even though it isn't on the object itself. The reason why we create this method outsite the constructor function, is becuase when creating it inside, this method is added to all the object created. So, it's best to add this method to every object just when necessary.
    console.log("My age is: ", 2037 - this.birthYear);
}; 
                    
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function Student(firstName, birthYear, course){ //Child function of the Person function, and it will inherit everything of its parent funciton.
    //Person(firstName, birthYear); //❌❌❌ If we would want to avoid duplicating code (in this case, re-write firstName and birthYear in Student), the problem here is that we are now actually calling this person constructor function as a regular function call. So we are not using this new operator to call this person function constructor. And so therefore this function call here is simply a regular function call. And remember that in a regular function call, the this keyword is set to undefined. And so therefore that's why we get this error here, that it cannot set first name on undefined. So instead of simply calling the person function here, we need to manually set the this keyword as well.
    Person.call(this, firstName, birthYear); // ✔✔✔ We need to call the function and at the same time set the this keyword inside that function. To do that, we can simply use the call method, which will call the function but we'll be able to specify the this keywords as the first argument in the function. In the next line, we can the this keyword inside the Person function so simply be the this keyword inside this funcion. Now, the this keyword (Person.call) is going to be in the beggining, the empty object (german) that is being created by the new operator. And so it is on that new object where we want to set the first name and the birthYear property.
    this.course = course;
}

//Student.prototype = Person.prototype; //❌❌❌ We must not do this because if so, we're saying that the student's prototype property and the person's prototype property should be the exact same object.
Student.prototype = Object.create(Person.prototype); // ✔✔✔ We want to make Person.prototype the prototype of Student.prototype (inherit from it and should not be the same object). So, to link the two prototype objects, we do the following. That's because Object.create defines prototypes manually. Now, the Student.prototype object is an object that inherits from Person.prototype. We have to do this before any we add any more methods to the prototype object of student because Object.create, will return a new empty object.

Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}; 

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const german = new Student("German", 2023, "Computer science");

german.introduce();
german.calcAge(); //This function from Person works in Student as well because this last one inherit the function from Person by using Student.prototype = Object.create(Person.prototype);
console.log(german.__proto__);
console.log(german.__proto__.__proto__);

console.log(german instanceof Student); //true
console.log(german instanceof Person);  //true. If we didn't have Student.prototype = Object.create(Person.prototype), then it should be false because german wouldn't inherit from Person but Student.
console.log(german instanceof Object);  //true. It is also an instance of Object because this is also in its prototype chain.

console.log(german); //We must realize that when open up the [[Prototype]] element, we'll see that is says Person instead of Student, but german is actually of the type Student. 
console.dir(Student); //This is the real prototype property of Student.
Student.prototype.constructor = Student;  
console.dir(Student.prototype.constructor); //Student.prototype.constructor is pointing back to Person, and the reason for that we set the prototype property of the student using Object.create(). So this make it so that the constructor of Student.prototype is still Person. (This will be best viewed using Firefox) */

/* //Ejemplo 16: Inheritance Between "Classes": ES6 Classes
class PersonCl{
    constructor(fullName, birthYear){ 
        this.fullName = fullName;
        this.birthYear = birthYear;
    }; 

    //Instance methods (Methods will be added to .prototype property and all instances can have access to them)
    calgAge(){ //All the methods that we write in the class (outside of the constructor), will be on the prototype on the object and not on the objects themselves.
        console.log("calgAge: ", 2037 - this.birthYear);
    };

    greet(){
        console.log(`greet:  ${this._fullName}`)
    }

    get age(){
        return `age: ${2037 - this.birthYear}`;
    }
    

    set fullName(name){  //Set a property that already exists.
        console.log("name ", name);
        name.includes(" ") ? this._fullName = name : `${name} is not a full name!`
    }

    get fullName(){
        return this._fullName;
    }

    static hey(){ //Static class methods are defined on the class itself. Staic are not available on instances
        console.log("Hello world");
        console.dir(this);
    }
}

class StudentCl extends PersonCl{
    constructor(fullName, birthYear, course){
        super(fullName, birthYear); //Always neets to happen first. super is basically the constructor function of the parent class. This is similar to use the "call" method in the Constructor Functions. We don't need to specify the name of the parent class again because that already happened in "extends PersonCl". Finally, we have to pass in the arguments for the constructor of the parent class (the parameters in the constructor funcion of PersonCl)
        this.course = course;
    }

    inroduce(){
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }

    calgAge(){
        console.log("Hello world");
    }
}

const german = new StudentCl("German mancilla", 1998, "Computer science");
console.log(german);
german.inroduce();
german.calgAge(); */

/* //Ejemplo 17: Inheritance Between "Classes": Object.create
const PersonProto = {
    init(firstName, birthYear){     //This looks like the constructor function that we created in the last methods, but here this is isn't the case becasue we don't use the new operator to call this.
        this.firstName = firstName; //The this keyword will point to the mancilla object, and it does so because we explicitly called   mancilla.init("German", 1998);
        this.birthYear = birthYear;
        // console.log(this);
    },

    calgAge(){ //All the methods that we write in the class (outside of the constructor), will be on the prototype on the object and not on the objects themselves.
        console.log("My age is: ", 2037 - this.birthYear);
    },
}

const mancilla = Object.create(PersonProto);
const SudentProto = Object.create(PersonProto);

SudentProto.init = function(firstName, birthYear, course){
    PersonProto.init.call(this, firstName, birthYear); //We do this so that we can avoid writing the same code (this.firstName = firstName and this.birthYear = birthYear).
    this.course = course;
}

SudentProto.introduce = function(){
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}

const karla = Object.create(SudentProto);
karla.init("Karla Marquez", 1998, "Computer science");
karla.introduce();
karla.calgAge();
console.log(karla); */

/* //Ejemplo 18: Another Class Example
class Account{
    constructor(owner, currency, pin, movements){
        this.owner = owner;
        this.currency = currency;
        this.pin = pin;
        this.locale = navigator.language;
        this.movements = []; //We can create even more properties on any instance and properties tjat are not based on any inputs. 

        console.log(`Thanks for opening an account, ${owner}`); //We can even execute any code here in this constructor that we want. When someone opens a new account then will recieve this message. 
    }

    //The reason why we defined deposit and withdraw inside the class Account is because we want these two methods to be inherited by all the instances of the Account class. 
    //Methods put outside of the constructor(), but inside of the class's body are put in the prototype meaning they will be inherited by all of the instances of that class.
    deposit(val){
        this.movements.push(val)
    }

    withdraw(val){
        this.deposit(-val); //We can call other methods inside of a certain one. But we forcelly need to use the this keyword to be able to access this other method.
    }

    aproveLoan(){
        return true;
    }

    requestLoan(val){
        if (this.aproveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved for ${val}$`);
        }
    }
}

const acc1 = new Account("German", "EUR", 1111);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1); */

/* //Ejemplo 19: Encapsulation, Protected Properties and Methods
//Encapsulation basically means to keep some properties and methods private inside the class so that they are not accessible from outside of the class.
class Account{
    constructor(owner, currency, pin){
        this.owner = owner;
        this.currency = currency;
        this.locale = navigator.language;
        
        //Protected propertyes
        this._pin = pin;
        this._movements = []; //We can create even more properties on any instance and properties that are not based on any inputs. This doen't actually make the property truly private because it's just a convention

        console.log(`Thanks for opening an account, ${owner}`); //We can even execute any code here in this constructor that we want. When someone opens a new account then will recieve this message. 
    }

    //Public interface
    getMovements(){ //if we still wanted to give access to the movements array from the outside then we would have to implement a public method for that
        return this._movements;
    }

    //The reason why we defined deposit and withdraw inside the class Account is because we want these two methods to be inherited by all the instances of the Account class. 
    //Methods put outside of the constructor(), but inside of the class's body are put in the prototype meaning they will be inherited by all of the instances of that class.
    deposit(val){
        this._movements.push(val)
    }

    withdraw(val){
        this.deposit(-val); //We can call other methods inside of a certain one. But we forcelly need to use the this keyword to be able to access this other method.
    }

    _aproveLoan(){ //This method shouldn't be part of the public API, but all the others should be.
        return true;
    }

    requestLoan(val){
        if (this._aproveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved for ${val}$`);
        }
    }
}

const acc1 = new Account("German", "EUR", 1111);

acc1._movements.push(250);
acc1._movements.push(-140);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements()); //Someone can access the movements but they can't overwrite them.
console.log(acc1); */

/* //Ejemplo 20: Encapsulation: Private Class Fields and Methods

//Encapsulation basically means to keep some properties and methods private inside the class so that they are not accessible from outside of the class.
class Account{
    
    // 1) Public fields (instances). These public fields are gonna be presened on all the instances that we are creating through the class. (They're referenceable by the this keyword). So they're not on the prototype. Finally, these two instances are the same as the two ones on the Protected properties.
    locale = navigator.language;

    // 2) Private fields (instances). With this, properites are really truly not accessible from the outside.
    #movements = [] //The # makes a field private
    #pin;           //We cannot define a field in the constructor

    constructor(owner, currency, pin){
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;

        console.log(`Thanks for opening an account, ${owner}`); //We can even execute any code here in this constructor that we want. When someone opens a new account then will recieve this message. 
    }

    // 3) Public methods
    getMovements(){
        return this.#movements;
    }

    deposit(val){
        this.#movements.push(val)
        return this; //deposit returns undefined because we're not returning anything explicitly here. So, to fix that, we need to return this, because the this keyword here is the current object. This line of code will make the method chainable. Finally, you must keep in mind that we have to do the same thing in deposit(), withdraw() and requestLoan() because the three of them deal with a private property (#movements).
    }

    withdraw(val){
        this.deposit(-val); //We can call other methods inside of a certain one. But we forcelly need to use the this keyword to be able to access this other method.
        return this;
    }

    requestLoan(val){
        if (this.#aproveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved for ${val}$`);
            return this;
        }
    }

    static helper(){
        console.log("Hello world!")
    }

    // 4) Private methods. This is very useful to hide the implementations details from the outside.
    #aproveLoan(){ //This method shouldn't be part of the public API, but all the others should be.
        return true;
    }
}

const acc1 = new Account("German", "EUR", 1111);

// acc1._movements.push(250);
// acc1._movements.push(-140);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements()); //Someone can access the movements but they can't overwrite them 
console.log(acc1); 
Account.helper();
// console.log(acc1.#movements); //We'll get an error because this is private.

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements()); */

/* //Ejemplo 21: Ejercicio de repaso numero 1: using constructor Functions, the "new" and the "this" Operator
// 1. Use a constructor function to implement a 'Car'. A car has a 'brand' and a 'speed' property. The 'speed' property is the current speed of the car in km/h
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console
// 4. Create 2 'Car' objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them

//GOOD PRACTICE
function Car(brand, speed){
    this.brand = brand;
    this.speed = speed;
}

Car.prototype.accelerate = function(){
    this.speed = this.speed + 10;
    console.log(`${this.brand} is going at ${this.speed} km/h`)
}

Car.prototype.brake = function(){
    this.speed = this.speed - 5;
    console.log(`${this.brand} is going at ${this.speed} km/h`)
}

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.brake();

//BAD PRACTICE
// function Car(brand, speed){
//     this.brand = brand;
//     this.speed = speed;

//     this.accelerate = function () {
//         this.speed = this.speed + 10;
//         console.log(`${this.brand} is going at ${this.speed} km/h`)
//     };

//     this.brake = function () {
//         this.speed = this.speed - 5;
//         console.log(`${this.brand} is going at ${this.speed} km/h`)
//     };
// }

// const bmw = new Car("BMW", 120);
// const mercedes = new Car("Mercedes", 95);

// bmw.accelerate();
// bmw.accelerate();
// bmw.accelerate();
// bmw.brake(); */

/* //Ejemplo 21: Ejercicio de repaso numero 2: using classes, Setters and Getters
// 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6)
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6) methods, and with the getter and setter.
// § Data car 1: 'Ford' going at 120 km/h

class CarCl {
    constructor(brand, speed){
        this.brand = brand;
        this.speed = speed;
    }
    
    accelerate(){
        this.speed = this.speed + 10;
        console.log(`${this.brand} is going at ${this.speed} km/h`)
    }
    
    brake(){
        this.speed = this.speed - 5;
        console.log(`${this.brand} is going at ${this.speed} km/h`)
    }

    get speedUS(){
        return this.speed / 1.6;
    }

    set speedUS(speed){
        this.speed = speed*1.6;
    }
}

const ford = new CarCl("Ford", 120);
console.log(`${ford.speedUS} mi/h`);
ford.accelerate();
ford.speedUS = 50;
console.log(ford); */

/* //Ejemplo 22: Ejercicio de repaso numero 3: using Inheritance Between "Classes": Constructor Functions
1. Use a constructor function to implement an Electric Car (called 'EV') as a child "class" of 'Car'. Besides a make and current speed, the 'EV' also has the current
   battery charge in % ('charge' property)
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo'
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 
   'Tesla going at 140 km/h, with a charge of 22%'
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'!

function Car(brand, speed){
    this.brand = brand;
    this.speed = speed;
}

Car.prototype.accelerate = function(){
    this.speed = this.speed + 10;
    console.log(`${this.brand} is going at ${this.speed} km/h`)
}

Car.prototype.brake = function(){
    this.speed = this.speed - 5;
    console.log(`${this.brand} is going at ${this.speed} km/h`)
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function EV(brand, speed, charge){
    Car.call(this, brand, speed);
    this.charge = charge;
}

EV.prototype = Object.create(Car.prototype); //We want to make Car.prototype the prototype of EV.prototype (inherit from it and should not be the same object). So, to link the two prototype objects, we do the following. That's because Object.create defines prototypes manually. Now, the ev.prototype object is an object that inherits from Car.prototype. We have to do this before any we add any more methods to the prototype object of EV because Object.create, will return a new empty object.

EV.prototype.chargeBattery = function(chargeTo){ //We create a new method
    this.charge = chargeTo;
}

EV.prototype.accelerate = function(){ //We create a new method.
    this.speed += 20; 
    this.charge--;
    console.log(`Tesla going at ${this.speed}, with a charge of ${this.charge}`)
}

const tesla = new EV("Tesla", 129, 23);  
tesla.brake(); //Having used the Object.create(), now we can also access to the methods in the constructor function (car), from the EV function. If we don't use EV.prototype = Object.create(Car.prototype), then we won't be able to access to this method in Car.
tesla.chargeBattery(90);
tesla.accelerate(); // There are two methods with the same name (accelerate). So, the first one is in the tesla's object, and the second one in the constructor function (Car). When there are two or more methods or properties with the same name in a prototype chain, then JS will always use the first one. Finally, a child class can overwrite a methid that inherited from the parent class.

EV.prototype.constructor = EV;
console.log(tesla);
console.dir(EV.prototype.constructor); */

/* //Ejemplo 23: Ejercicio de repaso numero 4: using Inheritance Between "Classes": ES6 Classes and Object.create(), and using encapsulation.
// 1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
// 2. Make the 'charge' property private
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. Then experiment with chaining!
// Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%

class CarCl{
    constructor(brand, speed){
        this.brand = brand;
        this.speed = speed;
    }
    accelerate(){
        this.speed = this.speed + 10;
        console.log(`${this.brand} is going at ${this.speed} km/h`);
        return this;
    }
    
    brake(){
        this.speed = this.speed - 5;
        console.log(`${this.brand} is going at ${this.speed} km/h`);
        return this;
    }

    get speedUS(){
        return this.speed / 1.6;
    }

    set speedUS(speed){
        this.speed = speed*1.6;
    }
}

class EVCl extends CarCl{
    #charge

    constructor(brand, speed, charge){
        super(brand, speed);
        this.#charge = charge;
    }
        
    chargeBattery(chargeTo){ //We create a new method
        this.#charge = chargeTo;
        return this;
    }
    
    accelerate(){ //We create a new method.
        this.speed += 20; 
        this.#charge--;
        console.log(`Tesla going at ${this.speed}, with a charge of ${this.#charge}`);
        return this;
    }
}

const rivian = new EVCl("Rivian", 120, 23);
console.log(rivian);
rivian.accelerate().accelerate().accelerate().brake().chargeBattery(50).accelerate();
console.log(rivian.speedUS); */

/* //Ejemplo 24: Uso de set y get en las clases y como utilizarlas (protected variables)
class CoffeeMachine {
    _waterAmount = 0;

    set waterAmount(value) {
        if (value < 0) value = 0;
        this._waterAmount = value;
    }

    get waterAmount() {
        return this._waterAmount;
    }

    constructor(power) {
        console.log("power: ", power)
        this._power = power;
    }
}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);
const res1 = coffeeMachine.waterAmount; //If we call  the methid without seting equal to the variable, then we'll use the "get" method in the class
console.log("Get", res1);

// add water
const res2 = coffeeMachine.waterAmount = -10; //If we set equal to the variable, then we'll use the "set" method in the class
console.log("Set: ", res2); */

/* //Ejemplo 25: Uso get en las clases (protected variables & Read-only)
class CoffeeMachine {
  // ...

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }

}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

alert(`Power is: ${coffeeMachine.power}W`); // Power is: 100W

coffeeMachine.power = 25; // Error (no setter) */

/* //Ejemplo 26: private variables
class CoffeeMachine {
  #waterLimit = 200;

  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }

}

let coffeeMachine = new CoffeeMachine();

// can't access privates from outside of the class
coffeeMachine.#fixWaterAmount(123); // Error
coffeeMachine.#waterLimit = 1000; // Error */

/* //Ejemplo 27: Public Class Members
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName; // public field
    this.lastName = lastName; // public field
  }

  // public getter
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // public setter
  set fullName(value) {
    const parts = value.split(" ");
    this.firstName = parts[0];
    this.lastName = parts[1];
  }

  // public method
  introduceYourselfTo(other) {
    const name = other.firstName ?? other;
    console.log(`Hello ${name}! My name is ${this.fullName}.`);
  }

  // public static getter
  static get typeName() {
    return "Person";
  }

  // public static method
  static fromJSON(json) {
    return new Person(json.firstName, json.lastName);
  }
}

const john = new Person("John", "Doe");
const jane = Person.fromJSON({ firstName: "Jane", lastName: "Doe" });

john.introduceYourselfTo(jane); */

/* //Ejemplo 28: Private Class Members
class Person {
  #firstName; // private field
  #lastName; // private field

  constructor(firstName, lastName) {
    this.#firstName = firstName;
    this.#lastName = lastName;
  }

  get firstName() { return this.#firstName; }
  get lastName() { return this.#lastName; }
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  introduceYourselfTo(other) {
    const name = other.firstName ?? other;
    console.log(`Hello ${name}! My name is ${this.fullName}.`);
  }

  static fromJSON(json) {
    return new Person(json.firstName, json.lastName);
  }
}

const john = new Person("John", "Doe");
const jane = Person.fromJSON({ firstName: "Jane", lastName: "Doe" });

john.introduceYourselfTo(jane); */

/* //Ejemplo 29: Private Constructors
class SomeSingletonService {
  static #key = {};
  static instance = new SomeSingletonService(this.#key);
 
  constructor(key) {
    if (key !== SomeSingletonService.#key) {
      throw new TypeError("SomeSingletonService is not constructable.");
    }
  }
}
 */

/* //Ejemplo 30: Protected Class Members
// superclass
function Question(key) {
  return class {
    #answer = 42;

    answer(shareKey) {
      if (shareKey === key) {
        return this.#answer;
      }

      throw new TypeError("Access Denied");
    }
  }
}

const key = {};

// subclass
class DeepThought extends Question(key) {
  get #answer() { 
    return this.answer(key);
  }

  tellMeTheAnswer() {
    console.log(this.#answer);
  }
}

const dm = new DeepThought();
dm.tellMeTheAnswer(); */



//         $$$$$$$$$$$$$$$ Arrays $$$$$$$$$$$$$$$


/* //Ejemplo 0: map behind the scenes & callbacks
function mapCustom(array, callback) {
    let nuevoArray = [];

    for (let i = 0; i < array.length; i++) {
        let nuevoValor = callback(array[i]);
        nuevoArray.push(nuevoValor);
    }

    return nuevoArray;
}

const numeros = [2, 3, 4, 5, 6];
const nuevoArr = mapCustom(numeros, function(valor){
    return valor * 2;
});

console.log(nuevoArr);

const sumar = (numero1, numero2) => numero1 + numero2;
const restar = (numero1, numero2) => numero1 - numero2;
const multiplicar = (numero1, numero2) => numero1 * numero2;
const dividir = (numero1, numero2) => numero1 / numero2;

function calcular(numero1, numero2, callback) {
    return callback(numero1, numero2);
}

console.log(calcular(2, 3, sumar));
console.log(calcular(2, 3, restar));
console.log(calcular(2, 3, multiplicar));
console.log(calcular(2, 3, dividir)); */

/* //Ejemplo 1: Declaracion y manejo de un array con numeros que vamos a operar entre ellos

const VECTOR_DE_CADENAS = ["german", "mancilla", "chavez"]; console.log("Los datos del vector son: ", VECTOR_DE_CADENAS);
const VECTOR_DE_BANDERAS = [true, false, true, false];console.log("Los datos del vector son: ", VECTOR_DE_BANDERAS);
const VECTOR_HETEROGENEO = [2023, "german", true, 22]; console.log("Los datos del vector son: ", VECTOR_HETEROGENEO);
const MI_ARRAY_DE_NUMEROS = [10, 20, 50, 80]; console.log("Los datos del vector son: ", MI_ARRAY_DE_NUMEROS);

const res1 = MI_ARRAY_DE_NUMEROS[2] + MI_ARRAY_DE_NUMEROS[3]; console.log("El resultado es: "+ res1);
const res2 = VECTOR_DE_CADENAS[0] + " " + VECTOR_DE_CADENAS[2]; console.log("Los datos del vector son: ", res2);
const res3 = MI_ARRAY_DE_NUMEROS[0] + VECTOR_DE_CADENAS[2]; console.log("El resultado es: ", res3); */

/* //Ejemplo 2: Como recorremos un array
const VECTOR_DE_CADENAS = ["german", "mancilla", "chavez"];
//for (let i = 0; i < VECTOR_DE_CADENAS.["length"]; i++) {
for (let i = 0; i < VECTOR_DE_CADENAS.length; i++) {
    console.log("El elemento en la posicion " + i + " es el nombre: "+ VECTOR_DE_CADENAS[i])    
} */

/* //Ejemplo 3: Como anadir elementos en x posicion sustituyendo el de esa misma posicion
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let nombre = "karla";
VECTOR_DE_CADENAS[2] = nombre;
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS); */

/* //Ejemplo 4: Recorrer un array con |for-of|
const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    openingHours: {
        thu: {open: 12,close: 22,},
        fri: {open: 11,close: 23,},
        sat: {open: 0, close: 24,}, // Open 24 hours
    },
};

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// for (const res of menu) {
//     console.log(res);
// }

// for (const item of menu.entries()) {
//     console.log(item);
// }

for (const item of menu.entries()) {
    console.log(`${item[0] + 1}: ${item[1]}`);
}

console.log("\n");

for (const [i, el] of menu.entries()) {
    console.log(`${i + 1}: ${el}`);
} */

/* //Ejemplo 5: Conocer la cantidad de elementos que tiene nuestro array con  |.length()|
const VECTOR_DE_CADENAS = ["german", "mancilla", "chavez"];
console.log("Cuantos elementos tengo en mi array?", VECTOR_DE_CADENAS.length);
console.log("Cual es la posicion de mi ultimo elemento dentro de mi array?", VECTOR_DE_CADENAS.length-1) */

/* //Ejemplo 6: Como anadir elementos a un array con  |.push()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez"];
let nombre = "karla";
VECTOR_DE_CADENAS.push(nombre);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS); */

/* //Ejemplo 7: Como anadir elementos al principio de un array con |.unshift()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez"];
let nombre = "karla";
VECTOR_DE_CADENAS.unshift(nombre);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS); */

/* //Ejemplo 8: Como eliminar elementos en la primer posicion de un array con |.shift|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let elementoRecuperado = VECTOR_DE_CADENAS.shift();
console.log("El elemento recuperado es: ",elementoRecuperado);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS); */

/* //Ejemplo 9: Como eliminar elementos en la ultima posicion de un array con |.pop()|

let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let elementoRecuperado = VECTOR_DE_CADENAS.pop();
console.log("El elemento recuperado es: ",elementoRecuperado);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS); */

/* //Ejemplo 10: Como eliminar uno o mas elementos de un array con |.splice()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let elementoRecuperado = VECTOR_DE_CADENAS.splice(1,2); //1 = la posicion - 2 = cantidad de numeros a eliminar a partir de 1
console.log("Los elementos removidos dentro del array son ",elementoRecuperado);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS);

console.log("\n");

let VECTOR_DE_CADENAS1 = ["german", "mancilla", "chavez", "junior"];
let elementoRecuperado1 = VECTOR_DE_CADENAS1.splice(1,0, "karla", "res"); //1 = la posicion - 0 = cantidad de numeros a eliminar a partir de 1
//let elementoRecuperado1 = VECTOR_DE_CADENAS1.splice(1,0, ["marquez", "beatriz"]);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS1);
console.log("Los elementos removidos dentro del array son ", elementoRecuperado1); */

/* //Ejemplo 11: Tomar un conjunto de elementos de dentro de un array y generar un nuevo array con ellos con |.slice()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior", "karla"];
console.log([...VECTOR_DE_CADENAS]);
let resultadoDelSlice = VECTOR_DE_CADENAS.slice(2, 5); //2 = esta posicion no se toma, sino la siguiente. 5 = limite que se toma en cuenta
console.log("La cadena generada con nombres es: ",resultadoDelSlice); */

/* //Ejemplo 12: Obtener una cadena con cada uno de sus elementos concatenados, separados con un caracter o cadena especial con |.join()|.
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let resultadoDelJoin = VECTOR_DE_CADENAS.join(", ");
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS);
console.log("La cadena generada con nombres es: ",resultadoDelJoin); */

/* //Ejemplo 13: Combinar los elementos de dos arrays con |.concat()|
let VECTOR_DE_CADENAS1 = ["german", "mancilla", "chavez"], VECTOR_DE_CADENAS2 = ["Karla", "beatriz", "marquez"];
let resultadoDelJoin = VECTOR_DE_CADENAS1.concat(VECTOR_DE_CADENAS2);
console.log("La cadena generada con nombres es: ",resultadoDelJoin); */

/* //Ejemplo 14: Conocer la posicion de un elemento dentro de un array (si existe o no) con |.indexof()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let posicionDeMancilla = VECTOR_DE_CADENAS.indexOf("chavez");
console.log("La cadena generada con nombres es: ",posicionDeMancilla);

let posicion = VECTOR_DE_CADENAS.indexOf("karla");
posicion != -1 ? console.log("El nombre esta en la posicion: ", posicion) : console.log("El nombre NO existe"); */

/* //Ejemplo 15: Conocer si existe o no un elemento dentro de un array (Valor booleano) con |.includes()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let nombre = "mancilla"
let existe = VECTOR_DE_CADENAS.includes(nombre);

existe ? console.log("El nombre SI existe") : console.log("El nombre NO existe"); */

/* //Ejemplo 16: Tomar al array e invertir el orden de sus elementos con |.reverse()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
VECTOR_DE_CADENAS.reverse();
console.log("--> El array con los nombres cambiados de lugar es", VECTOR_DE_CADENAS); */

/* //Ejemplo 17: Retornar el elemento indexado de un array o el elemento contenido en x posicion |.at()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
console.log(VECTOR_DE_CADENAS.at(3).at(1)); //Obtenemos el elemento contenido en el array (Junior), y en el siguiente at, obtenemos la posicion de la letra. */

/* //Ejemplo 18: Retornar el indice del primer elemento de una array que cumpla con una caracteristica especifica, on |.findIndex()|
const array1 = [5, 12, 8, 130, 44];

function isLargeNumber (element){
    return element > 13;
}

console.log(array1.findIndex(isLargeNumber)); */

/* //Ejemplo 19: Concatenar subelementos de un array en un solo array con |.flat()|
const arr1 = [0, 1, 2, [3, 4]];

console.log(arr1.flat()); // expected output: Array [0, 1, 2, 3, 4]

const arr2 = [ 0, 1, [2, [3, [4, 5]]] ];

console.log(arr2.flat()); // expected output: Array [0, 1, 2, Array [3, Array [4, 5]]]

console.log(arr2.flat(2)); // expected output: Array [0, 1, 2, 3, Array [4, 5]]

console.log(arr2.flat(Infinity)); // expected output: Array [0, 1, 2, 3, 4, 5] */

/* //Ejemplo 20: Metodo |.fill()| para llenar un array con cualquier tipo de dato
const array1 = [1, 2, 3, 4];
console.log(array1.fill(0, 2, 4)); // Fill with 0 from position 2 until position 4  --> [1, 2, 0, 0]
console.log(array1.fill(5, 1));    // Fill with 5 from position 1 --> [1, 5, 5, 5]
console.log(array1.fill(6));       //Fill the array with only "6" --> [6, 6, 6, 6] */

/* //Ejemplo 21: Uso del metodo |new Array| para crear un arreglo de x cantidad de numeros y el metodo |Array.from()| para crear un array a partir de un objeto.
const res = new Array(1, 2, 3, 4, 5, 6, 7); // const res = [1, 2, 3, 4, 5, 6, 7];
const x = new Array(7); //Creamos un array vacio de 7 espacios de memoria.
x.fill(1);              //LLenamos el arreglo con puros "1".
console.log(x);

// Array.from(object, mapFunction, thisValue)
const y = Array.from({length: 7}, function(){
    return 1;
}); console.log(y);

const z = Array.from({length: 7}, function(_, i){
    return i + 1;
}); console.log(z); */

/* //Ejemplo 22: como iterar sobre los elementos de un array, no importa si posee valores simples u objetos, con |.foreach()|
class producto{
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
    }

    convertirEnString () {
        return this.id + ". " + this.nombre.toUpperCase() +" ($"+ this.precio.toFixed(2) +")"
    };

    // convertirEnString = () => {
    //     return this.id + ". " + this.nombre +" ($"+ this.precio.toFixed(2) +")"
    // };
};

let misProductos = [
    new producto (1, "azucar", 283.25),
    new producto (2, "cafe", 340.33),
    new producto (3, "Mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galletad de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
];

misProductos.forEach( function(mov, i, arr) { //El primer parametro siempre sera el contenido de ese array (mov), el segundo la posicion (i) y el tercero el array (arr)
    return console.log( "--> "+ mov.convertirEnString()+ " en la posicion "+ (i+1));
});

//Ejemplo aplicado a Map()
const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map){ //En el caso de usar Map(), los tres parametros principales son el valor, la clave y al final el map (array).
    console.log(`${value}: ${key}`);
});

//Ejemplo aplicado a Set()
const currenciesIsUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]); //En el caso de Set(), no existe una clave, por eso se pone "_". lo que indica una variable innecesaria.
currenciesIsUnique.forEach(function(value, _, map){
    console.log(`${value}: ${value}`);
}); */

/* //Ejemplo 23: como hallar un elemento dentro de la coleccion (el PRIMER elemento), con |.find()|
class producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }

    convertirEnString () {
        return this.id + ". " + this.nombre +" en $"+ this.precio.toFixed(2)
    };
};

let misProductos = [
    new producto (1, "azucar", 283.25),
    new producto (2, "cafe", 340.33),
    new producto (3, "Mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galletad de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
];

// let nombreBuscado = "mermelada";
// let unProductoBuscado1 = misProductos.find(unProducto => {
//     return unProducto.nombre.includes( nombreBuscado.toUpperCase()); //El metodo includes() retorna true o false si existe algo en el array, y este seguira iterando aunque ya haya retornado algo. Ahora bien, con el includes, unicamente  retornara un elemento, puesto que es la funcion principal de find(), retornar lo primero que encuentre nada mas.    
// });

let nombreBuscado = "pan lactal";
let unProductoBuscado1 = misProductos.find(unProducto => unProducto.nombre === nombreBuscado.toUpperCase());

unProductoBuscado1 !== undefined ? console.log("El producto buscado es: "+ unProductoBuscado1.convertirEnString()) : console.log("No encontramos el producto con nombre: "+ nombreBuscado); */

/* //Ejemplo 24: como hallar todos los elementos dentro de la coleccion que cumplan con una condicion, con |.filter()|
class producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }

    convertirEnString () {
        return this.id + ". " + this.nombre +" en $"+ this.precio.toFixed(2)
    };
};

let misProductos = [
    new producto (1, "azucar", 283.25),
    new producto (2, "cafe", 340.33),
    new producto (3, "Mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galletad de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
    new producto (9, "Mermelada de naranja", 189.88),
    new producto (10,"Mermelada de fresa", 356.24),
];

let nombreBuscado = "Mermelada";
let productoHallados = misProductos.filter( function(unProducto){     // let productoHallados = misProductos.filter( (unProducto) => unProducto.nombre.includes( nombreBuscado.convertirEnString() ));
    return unProducto.nombre.includes( nombreBuscado.toUpperCase() ); //Si el nombre buscado posee unicamente la palabra "Mermelada", entonces entonces retorna un true. Esto indica que no hay necesidad de tener que escribir "Mermelada de naranja" o similares.
});
console.log("Numero de productos hallados con el nombre "+ "'"+`${nombreBuscado}`+"'" +" son: "+ productoHallados.length+ " y tienen los siguientes nombres: ", productoHallados);

let preciosMayores = misProductos.filter( function(evento){
    return evento.precio > 400;
});
console.log("Los precios mayores a $400 son: preciosMayores", preciosMayores); */

/* //Ejemplo 25: como saber si un elemento dentro de la coleccion existe o no, con |.some()|

class producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }

    convertirEnString () {
        return this.id + ". " + this.nombre +" en $"+ this.precio.toFixed(2)
    };
};

let misProductos = [
    new producto (1, "azucar", 283.25), 
    new producto (2, "cafe", 340.33),
    new producto (3, "mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galletad de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
    new producto (9, "mermelada de naranja", 189.88),
    new producto (10,"mermelada de fresa", 356.24),
];

let nombreBuscado = "AZUCAR";
let existe = misProductos.some( (unProducto) => {
    return unProducto.nombre === nombreBuscado.toUpperCase();
});

if (existe) {
    console.log("El producto buscado SI existe");
} else {
    console.log("El producto buscado NO existe");
} */

/* //Ejemplo 26: como saber si un elemento dentro de la coleccion existe o no, y que devuelva true o false si todo cumple la condicion. Con |.every()|
movements1 = [200, 450, 400, -3000, 650, 0, 70, 1300];  //false
movements2 = [200, 450, 100, 3000, 650, 130, 70, 1300]; //true
console.log(movements1.every(mov => mov > 0)); //
console.log(movements2.every(mov => mov > 0)); */

/* //Ejemplo 27: como enlistar solamente los nombres de los productos, con |.map()|
class producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }

    convertirEnString () {
        return this.id + ". " + this.nombre +" en $"+ this.precio.toFixed(2);
    };
};

let misProductos = [
    new producto (1, "azucar", 283.25), 
    new producto (2, "cafe", 340.33),
    new producto (3, "mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galletad de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
    new producto (9, "mermelada de naranja", 189.88),
    new producto (10,"mermelada de fresa", 356.24),
];

let nombres, preciosIncrementados;

nombres = misProductos.map( function(unProducto){
    return unProducto.nombre;
});
console.log("1. Los nombres del array son: ", nombres);

preciosIncrementados = misProductos.map( function(unProducto) {
    return incrementarPrecio(unProducto.precio, 10)
});
console.log("2. Los precios incrementados seran: ", preciosIncrementados);

preciosIncrementados = misProductos.map(function(unProducto) {
    return new producto (unProducto.id, unProducto.nombre, incrementarPrecio(unProducto.precio, 10));
});
console.log("3. Los precios incrementados en forma de array seran: ", preciosIncrementados);

preciosIncrementados = misProductos.map( function(unProducto) {
    return {id: unProducto.id, nombre: unProducto.nombre, precio: incrementarPrecio(unProducto.precio, 10)}
});
console.log("4. Los precios incrementados forma de objeto seran: ", preciosIncrementados);

function incrementarPrecio(precio, porcentaje){
    return precio + (precio * (porcentaje/100) )
} 

const numbers = [65, 44, 12, 4];
const newArr = numbers.map(myFunction);

document.getElementById("demo").innerHTML = newArr;

function myFunction(num) {
  return num * 10;
}


*/

/* //Ejemplo 28: como calcular el valor total de una compra, con |.reduce()|
class producto{
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }
};

let misProductos = [
    new producto (1, "azucar", 283.25), 
    new producto (2, "cafe", 340.33),
    new producto (3, "mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galleta de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
    new producto (9, "mermelada de naranja", 189.88),
    new producto (10,"mermelada de fresa", 356.24),
];

let preciosTotales = misProductos.reduce( function(acumulador, unProducto){    //let preciosTotales = misProductos.reduce( (acumulador, unProducto) => acumulador + unProducto.precio, 0);
    return acumulador + unProducto.precio
}, 0);

console.log("El total de la suma es: "+ preciosTotales.toFixed(2));

//Valor maximo
const max = misProductos.reduce(function(acc, mov){
    return acc > mov.precio ? acc : mov.precio;
})
console.log(max); */

/* //Ejemplo 29: como re-ordenar nuestro array (es DESTRUCTIVO, cambia su posicion), con |.sort()|

class producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }

    convertirEnString () {
        return this.id + ". " + this.nombre +" en $"+ this.precio.toFixed(2)
    };
};

let misProductos = [
    new producto (1, "azucar", 283.25), 
    new producto (2, "cafe", 340.33),
    new producto (3, "mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galleta de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
    new producto (9, "mermelada de naranja", 189.88),
    new producto (10,"mermelada de fresa", 356.24),
];

// Utilizar una de las 6 opciones a la vez porque todas al mismo tiempo no funcionaran.
// misProductos.sort( (first, second) => first.id - second.id);                        console.log("Forma ascendente: ", misProductos);
// misProductos.sort( (first, second) => second.id - first.id);                        console.log("Forma descendente: ", misProductos);
// misProductos.sort( (first, second) => first.nombre.localeCompare(second.nombre));   console.log("Forma ascendente: ", misProductos);
// misProductos.sort( (first, second) => second.nombre.localeCompare(first.nombre));   console.log("Forma descendente: ", misProductos);
// misProductos.sort( (first, second) => first.precio - second.precio);                console.log("Forma ascendente: ", misProductos);
// misProductos.sort( (first, second) => second.precio - first.precio);                console.log("Forma descendente: ", misProductos); */

/* //Ejemplo 30: como crear una nueva matriz con todos los elementos de sub-array concatenados con |.flat()| y como mapear todos los elementos del array y crear un nuevo flat array con |.flatMap()|
const acc1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const acc2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const acc3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const acc4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const allAccounts = [acc1, acc2, acc3, acc4];

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [ [[1, 2], 3], [4, [5, 6]], 7, 8 ];
console.log(arrDeep.flat(2));

//flat ()
const overalBalance = allAccounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//flatMap()
const overalBalance2 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2); */

/* //Ejemplo 31: Ejercicio practico #1
// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are 
// just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old. Your tasks:
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
// 1. Julia found out that the owners of the first and the last two dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
// ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy")
// 4. Run the function for both test datasets

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

function checkDogs(dogsJulia, dogsKate){
    const dogsJuliaCorrected = dogsJulia.slice(); //We creat a new array (By setting the empty parenthesis) because we must not mutate the original array.
    // dogsJulia.slice(1, 3); Podemos usar esto tambien y obtendremos lo mismo que abajo
    dogsJuliaCorrected.splice(0, 1); //Borramos en la posicion 0, 1 elemento.
    dogsJuliaCorrected.splice(-2); //Borramos los ultimos dos elementos
    console.log(dogsJuliaCorrected);

    const newArray = dogsJuliaCorrected.concat(dogsKate);
    console.log(newArray);

    newArray.forEach(function(mov, key){
        const res = mov >=3 ? `Dog number ${key} is an adult, and is ${mov} years old` : `Dog number ${key+1} is still a puppy`
        console.log(res);
    });

}

checkDogs(dogsJulia, dogsKate); */

/* //Ejemplo 32: Ejercicio practico #2
// Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little. Eating too much means the dog's current food portion is 
// larger than the recommended portion, and eating too little is the opposite. Eating an okay amount means the dog's current food portion is within a range 10% above and 
// 10% below the recommended portion. Your tasks:
// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do not create a new 
// array, simply loop over the array. Forumla: recommendedFood = weight^0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. Hint: Some dogs have multiple owners, so you first need to find Sarah in the owners 
// array, and so this one is a bit tricky (on purpose)
// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// 5. Log to the console whether there is any dog eating exactly the amount of food that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an okay amount of food (just true or false)
// 7. Create an array containing the dogs that are eating an okay amount of food (try to reuse the condition used in 6.)
// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects ).

// Hints:
// Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended *1.10). Basically, the current portion 
// should be between 90% and 110% of the recommended portion.

const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1
dogs.forEach(function(evento){
    evento.recFood = Number((evento.weight ** 0.75 * 28).toFixed(4));
});

//2
const dogSarah = dogs.find(function(evento){
    return evento.owners.includes("Sarah");
});
console.log(`Sarah's dog is eating too ${dogSarah.curFood > dogSarah.recFood ? "much" : "little"}`);

//3 
// const ownersEatTooMuch = dogs.filter(evento => evento.curFood > evento.recFood).map(evento => evento.owners).flat();
const ownersEatTooMuch = dogs.filter(evento => evento.curFood > evento.recFood).flatMap(evento => evento.owners);
const ownersEatTooLittle = dogs.filter(evento => evento.curFood < evento.recFood).flatMap(evento => evento.owners);

//4
console.log(`${ownersEatTooMuch.join(" and ") }'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(" and ") }'s dogs eat too much!`);

//5
console.log(dogs.some(evento => evento.curFood === evento.recFood));

//6. 
function checkEatingOkey(evento){
    return evento => evento.curFood > evento.recFood * 0.9 && evento.curFood < evento.recFood * 1.1;
}
let ss = dogs.some(checkEatingOkey)
console.log(ss);

//7.
let res = dogs.filter(checkEatingOkey)
console.log(res);

//8.
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted); */

/* //Ejemplo 33: Ejercicio practico con foreach(), split() y join().
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

function createUserNames (accs){
    accs.forEach(function(num_acc){
        num_acc.username = num_acc.owner.toLowerCase().split(" ").map(name => name[0]).join(""); // We create a new element (num_acc.username) that will contain the lower case letters of each owner's name
    })
}

createUserNames(accounts);
console.log(accounts); */

/* //Ejemplo 34: Ejercicio practico con map(), filter() y reduce() y otros elementos de arrays
// Let's go back to Julia and Kate's study about dogs. This time they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4
// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages)
// 4. Run the function for both test datasets
// Test Data 1: [5, 2, 4, 1, 15, 8, 3]

let array = [5, 2, 4, 1, 15, 8, 3];

function calcAverageHumanAge(res){
    let newArray = res.map(function(event){
        if (event <= 2) {
            return 2 * event;
        }else if (event > 2) {
            return 16 + (event * 4);
        }
    });
    return newArray;
}


let newArray = calcAverageHumanAge(array);
console.log("The new array in human age is: ", newArray);

let arrayLess18 = newArray.filter(function(evento){
    return evento > 18;
});
console.log("The new array with dogs that are less than 18 is: ", arrayLess18);

let averageAge = arrayLess18.reduce(function(acc, mov, i){
    return (acc + mov);
}, 0);
console.log("The average human age of adult dogs is: ", (averageAge/arrayLess18.length)); */

/* //Ejemplo 35: Mas ejemplos con arrays
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};
const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};
const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};
const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};
const accounts = [account1, account2, account3, account4]; //Almacenamos la informacion de los 4 objetos en un array.
const mapa = accounts.map(function(evento){
    return evento.movements;
}); //console.log(mapa);

// 1.
const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((sum, cur) => sum + cur, 0);
// console.log(bankDepositSum);

// 2.
//const numDeposits1000 = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length;
const numDeposits1000 = accounts.flatMap(acc => acc.movements).reduce((count, cur) => (cur >= 1000 ? ++count : count), 0); //Debemos colocar ++count porque si no, el numero siempre se mantendra en 0.
// console.log(numDeposits1000);

// 3.
const { deposits, withdrawals } = accounts.flatMap(acc => acc.movements).reduce((acc, cur) => {        
        acc[cur > 0 ? 'deposits' : 'withdrawals'] += cur;  //cur > 0 ? (acc.deposits += cur) : (acc.withdrawals += cur);
        return acc;
    },{ deposits: 0, withdrawals: 0 });

//console.log(deposits, withdrawals);

// 4.
// this is a nice title -> This Is a Nice Title
function convertTitleCase(title) {
    
    function capitzalize(str){
        return str[0].toUpperCase() + str.slice(1); //En la posicion 0, cambiamos la letra a mayuscula, y luego concatenamos con el "+", el resto de la palabra en la posicion [1]
    }
    
    const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

    const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(evento => (exceptions.includes(evento) ? evento : capitzalize(evento)))
    .join(' ');
    return capitzalize(titleCase);
};

console.log(convertTitleCase('and here is another title with an EXAMPLE'));
console.log(convertTitleCase('this is a LONG title but not too long')); */

/* //Ejemplo 36: Mas ejemplos con arrays x2
const objetos =  [
	{manzanas:3, peras:2, carne:1, jugos:5, dulces:2},
	{manzanas:1, sandias:1, huevos:6, jugos:1, panes:4}
];

const productos = [];
objetos.forEach((objeto) => {
    const keys = Object.keys(objeto);
    keys.forEach((key) => {
        if (!productos.includes(key)) productos.push(key);
    });
});

let totalVendidos = 0;
objetos.forEach((objeto) => {
    let keyValues = Object.values(objeto); //console.log(keyValues);
    totalVendidos += keyValues.reduce((acc, curr) => acc + curr, 0);
});

console.log(productos);
console.log(totalVendidos); */

/* //Ejemplo 37: Desestructurando un array de objetos
const data = [
    {
        "id": 101,
        "title": {
            "rendered": "CTC20180018"
        },
        "acf": {
            "fielda": "valuea",
            "fieldb": "valueb",
            "fieldc": "valuec"
        }
    },
    {
        "id": 102,
        "title": {
            "rendered": "D2021063365"
        },
        "acf": {
            "fielda": "valuea",
            "fieldb": "valueb",
            "fieldc": "valuec"
        }
    }
]

const result = data.map(({id,title,acf}) => ({
    id: id,
    title: title.rendered,
    ...acf
}));

console.log(result); */

/* //Ejemplo 38: Write a JavaScript program to convert an array of objects to a single object keyed by id (with map and filter)
const users = [
    { id: 1, email: 'dcontreras@email.tld' },
    { id: 2, email: 'afeher@email.tld' },
    { id: 3, email: 'odj@email.tld' },
];

const profiles = [
    { userId: 1, firstName: 'Danielle', lastName: 'Contreras' },
    { userId: 2, firstName: 'Alfredas', lastName: 'Fehér' },
    { userId: 3, firstName: 'Orpheus', lastName: 'De Jong' },
];

const usersWithProfiles = users.map((user) => {
    const profile = profiles.find((profile) => (user.id === profile.userId));
    return { ...user, profile };
}); */

/* //Ejemplo 39: Write a JavaScript program to Remove empty elements from an array in Javascript

//Metodo 1
// var arr = [1,2,,3,,-3,null,,0,,undefined,4,,4,,5,,6,,,,];
// arr.filter(n => n);      // [1, 2, 3, -3, 4, 4, 5, 6]
// arr.filter(Number);      // [1, 2, 3, -3, 4, 4, 5, 6]
// arr.filter(Boolean);     // [1, 2, 3, -3, 4, 4, 5, 6]
// arr.join('').split('');  // ["1","2","3","4","5"]

//Metodo 2
// var arr = [1,2,null, undefined,3,,3,,,0,,,[],,{},,5,,6,,,,]
// for(let i = 0; i < arr.length; i++ ){
//     arr[i] && arr.push(arr[i]);  // copy non-empty values to the end of the array
// }

// arr.splice(0 , len);  // cut the array and leave only the non-empty values

//Metodo 3
// function cleanArray(actual) {
//   var newArray = new Array();
//   for (var i = 0; i < actual.length; i++) {
//     if (actual[i]) {
//       newArray.push(actual[i]);
//     }
//   }
//   return newArray;
// }

// cleanArray([1, 2,, 3,, 3,,,,,, 4,, 4,, 5,, 6,,,,]);

//Metodo 4
// var array = [0, 1, null, 2, "", 3, undefined, 3,,,,,, 4,, 4,, 5,, 6,,,,];

// var filtered = array.filter(function (el) {
//     return el != null;
// });

// console.log(filtered); */

/* //Ejemplo 40: Write a JavaScript program to find largest integer in an array in JavaScript [duplicate]

//Metodo 1
// var arr = [3, 6, 2, 56, 32, 5, 89, 32];
// var largest = arr[0];

// for (var i = 0; i < arr.length; i++) {
//     if (arr[i] > largest ) {
//         largest = arr[i];
//     }
// }
// console.log(largest);

//Metodo 2
// var array = [3 , 6, 2, 56, 32, 5, 89, 32],
// largest = array.sort((a,b)=>a-b).reverse()[0]; //largest = array.sort((a,b)=>a-b)[array.length - 1]; */

/* //Ejemplo 41: Write a JavaScript program to convert an Object {} to an Array [] of key-value pairs in JavaScript

//Metodo 1
// const obj = {"1":5,"2":7,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0};
// var result = Object.keys(obj).map((key) => [key, obj[key]]);   
// var result = Object.entries(obj);
// console.log(result);

//Metodo 2 
// const obj = {"1":5,"2":7,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0};

// const toNumericPairs = input => {
//     const entries = Object.entries(input);
//     return entries.map(entry => Object.assign(entry, { 0: +entry[0] })); //We can switch map with forEach
// }

// console.log(toNumericPairs(obj)); */

/* //Ejemplo 42: Write a JavaScript function to check whether an `input` is an array or not.

//Metodo 1
// const array = [1,2,3];
// const val = "hi";

// isArray(val);
// isArray(array);

// function isArray(res){
//     typeof res !== "object" ? console.log("It is NOT an array") : console.log("It is an array");
// }

//Metodo 2
// function is_array(input) {
//     if (Object.prototype.toString.call(input) === "[object Array]") return true;
//     return false;   
// };

// console.log(is_array('w3resource'));
// console.log(is_array([1, 2, 4, 0])); */

/* //Ejemplo 43: Write a JavaScript function to clone an array.

//Metodo 1
// function array_Clone(res){
//     const clone = res.slice();
//     console.log("The cloned array is: ", clone);
// }

// array_Clone([1, 2, 4, 0]);
// array_Clone([1, 2, [4, 0]]);

//Metodo 2
// let x = [1,2,3];
// let y = [...x];

//Metodo 3
// let x = [1,2,3];
// let y = Array.from(x);

//Metodo 4
// let x = [1,2,3];
// let y = x.slice();

//Metodo 5
// let x = [1,2,3];
// let y = x.map(event => event);

//Metodo 6
// let x = [1,2,3];
// let y = x.filter(() => true); */

/* //Ejemplo 44: Write a JavaScript function to get the first element of an array. Passing the parameter 'n' will return the first 'n' elements of the array.
function first(array, n){
    if(n === undefined) return array[0];
    if(array === null)  return void 0; // void 0  -->  undefined
    if(n < 0)           return [];

    return array.slice(0, n);
}

console.log(first([7, 9, 0, -2]));
console.log(first([],3));
console.log(first([7, 9, 0, -2],3));
console.log(first([7, 9, 0, -2],6));
console.log(first([7, 9, 0, -2],-3));
console.log(first(3)); */

/* //Ejemplo 45: Write a JavaScript function to get the last element of an array. Passing the parameter 'n' will return the last 'n' elements of the array.
function last(array, n){
    if(n === undefined) return array[array.length-1];
    if(array === null)  return void 0; // void 0  -->  undefined

    return array.slice( Math.max(array.length-n, 0) );
}

console.log(last([7, 9, 0, -2]));
console.log(last([7, 9, 0, -2],3));
console.log(last([7, 9, 0, -2],6)); */

/* //Ejemplo 46: Write a simple JavaScript program to join all elements of the following array into a string. "Red,Green,White,Black" "Red,Green,White,Black" "Red+Green+White+Black"
const myColor = ["Red", "Green", "White", "Black"];
const res1 = myColor.join(",");
const res2 = myColor.join("+");

console.log(res1);
console.log(res2); */

/* //Ejemplo 47: Write a JavaScript program that accepts a number as input and inserts dashes (-) between each even number. For example if you accept 025468 the output should be 0-254-6-8.

//Metodo 1
// const array = [0,2,5,4,6,8,4,7,2,9,3,5];
// const newArray = []
// for(let i=0; i < array.length; i++){
//     if(array[i-1]%2 === 0 && array[i]%2 === 0){
//         newArray.push("-", array[i]);
//     }else{
//         newArray.push(array[i]);
//     }
// }

// console.log(newArray.join(""));

//Metodo 2
// function dashes(){
//     var number = "025468".split('');
//     for(let i = 0,j = 0; i < number.length; i++){
//     if(number[i] % 2 === 0 && number[i + 1] % 2 === 0){
//     number.splice(i + 1,0,'-');
//     }
//     };
    
//     console.log(number.join(''));
// };
// dashes(); */

/* //Ejemplo 48: Write a JavaScript program to sort the items of an array.
//Metodo 1
const arr1=[-3,8,7,6,5,-4,3,2,1];
const arr2=[];
let min=arr1[0];
let pos;
let max=arr1[0];

for (i=0; i<arr1.length; i++){
    if (max<arr1[i]) max=arr1[i];
}

for (let i=0; i<arr1.length; i++){
    for (let j=i; j<arr1.length; j++){
        if (arr1[j]!="x"){
            if (min>arr1[j]){
                min=arr1[j];
                pos=j;
            }
        }
    }
    arr2[i]=min;
    arr1[pos]="x";
    min=max;
}
console.log(arr2);

//Metodo 2
// let arr1 = [ -3, 8, 7, 6, 5, -4, 3, 2, 1 ];
// let arr2 = arr1.slice();

// arr2.sort(function(a, b){
//     return a - b; //Orden ascendente
//     // return b - a; //Orden descendente
// });


console.log(arr2); */

/* //Ejemplo 49: Write a JavaScript program to find the most frequent item in an array
//Metodo 1
// let i,j;
// let arr1=[3, 6, 6, 6 , 2, 3, 6, 3, 6, 2, 4, 9, 3];
// let repeatedItem;
// let mf = 0;// Variable que retiene el numero mas grande de valores repetidos
// let m = 0; //Contador

// for(i=0; i < arr1.length-1; i++){
//     for (j=i; j < arr1.length-1; j++){
//         console.log(arr1[i], arr1[j]);
//         if(arr1[i] === arr1[j]){
//             m++;
//         }
//         if (mf < m){ //mf aumenta dependiendo de cuantas veces se repita un item. Este if no se ejecutara si un el valor del contador es menor al numero de veces que se retiene en el ultimo item iterado.
//             mf=m; //Se actualiza el valor del numero que tenia el valor mas grande.
//             repeatedItem = arr1[i]; //Se almacena en otra variable el item con el mayor numero de repeticiones.
//         }
//     }
//     m=0; //Se reinicia el ontador
// }

// console.log(`${repeatedItem} ( ${mf} times ) `);

//Metodo 2
// let arr1=[3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3];
// console.log("The most repeated item is: ", `(${mostFrequentOnArrayBySorting(arr1)})`);

// function mostFrequentOnArrayBySorting(array){
//     const sortedArray = array.sort()
//     let currentItemFrequency = 0;
//     let totalFrequency = 0;
//     let mostFrequentItem;

//     for (let i = 0; i < sortedArray.length; i++) {
//         if (sortedArray[i] === sortedArray[i + 1]) {
//             currentItemFrequency++
//             if (currentItemFrequency > totalFrequency) {
//                 totalFrequency = currentItemFrequency
//                 mostFrequentItem = sortedArray[i]
//             }
//         } else {
//             currentItemFrequency = 0;
//         }
//     }   
//     return mostFrequentItem
// };


//Metodo 3
// let array=[3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3];
// let max = 0, letter;
// for (let i = 0; i < array.length; i++ ) {
//     let count = 0;
//     for (let j = 0; j < array.length; j++ ) {
//         if (array[i] === array[j]) {
//             ++count;
//         }
//     }
//     if (max < count) { max = count; letter = array[i] }
// }

// console.log(letter + ' : ' + max + ' times' );

//Metodo 4
// function helem(givenArray){
//     let itemsMap = {};
//     let maxValue = 0;
//     let maxCount = 0;
    
//     for (let item of givenArray) {
//         if (itemsMap[item] == null) {
//             itemsMap[item] = 1;
//         } else {
//             itemsMap[item]++;
//         }
        
//         if (itemsMap[item] > maxCount) {
//             maxValue = item;
//             maxCount = itemsMap[item];
//         }
//     }
//     return `Value : ${maxValue}, Count : ${maxCount}`;
// }

// console.log(helem([1, 2, 3, 4, 1, 1, 2, 3, 4])); */

/* //Ejemplo 50: Write a JavaScript program that accepts a string as input and swaps the case of each character. For example if you input 'The Quick Brown Fox' the output should be 'tHE qUICK bROWN fOX'.

//Metodo 1
// const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// const LOWER = 'abcdefghijklmnopqrstuvwxyz';
// const input = "HELLO";
// const array = [];

// for(let i=0; i < input.length; i++){
//     if(UPPER.indexOf(input[i]) !== -1){
//     console.log(UPPER.indexOf(input[i]));
//         array.push(input[i].toLowerCase());

//     }else if (LOWER.indexOf(input[i]) !== -1) {
//     console.log(LOWER.indexOf(input[i]));
//         array.push(input[i].toUpperCase());

//     }else{
//         array.push(input[i]);
//     }
// }

// console.log(array.join(""));

//Metodo 2
// function swapCase([...rest]){
//     const res = rest.map( function(item){
//         return item === item.toUpperCase() ? item.toLocaleLowerCase() : item.toUpperCase();
//     }).join('');
    
//     return res;
// }

// console.log(swapCase("hELLO wORLD"));

//Metodo 3
// function ex9(str){
//     str = str.split(''); //Return a new array based on a string as input
//     for(let i = 0; i < str.length; i++){
//         (str[i] === str[i].toLowerCase()) ? str[i] = str[i].toUpperCase() : str[i] = str[i].toLowerCase();
//     }
//     return str.join('');
// }

// console.log(ex9("Hello World")); */

/* //Ejemplo 51: Write a JavaScript program that prints the elements of the following array. (Use nested for loops)
//Metodo 1
// let a = [
//     [1, 2, 1, 24], 
//     [8, 11, 9, 4], 
//     [7, 0, 7, 27], 
//     [7, 4, 28, 14], 
//     [3, 10, 26, 7]
// ];

// for (let i = 0; i < a.length-1; i++) {
//     console.log("Row", i+1)
//     for (let j = 0; j < a.length-1; j++) {
//         console.log(a[i][j])
//     }
// }

//Metodo 2
// let a = [[1, 2, 1, 24], [8, 11, 9, 4], [7, 0, 7, 27], [7, 4, 28, 14], [3, 10, 26, 7]];

// for (let i in a){
//     console.log("row " + i);
//     for (let j in a[i]) {
//         console.log(" " + a[i][j]);
//     }
// }

//Metodo 3
// let a = [[1, 2, 1, 24], [8, 11, 9, 4], [7, 0, 7, 27], [7, 4, 28, 14], [3, 10, 26, 7]];

// a.forEach(function(element, i){
//     console.log("row" + i);
//     element.map( (item) => console.log(item));
// });

//Metodo 4
// let a = [[1, 2, 1, 24], [8, 11, 9, 4], [7, 0, 7, 27], [7, 4, 28, 14], [3, 10, 26, 7]];

// for(let i in a){
//     console.log(`row ${i}`)
//     for (let value of a[i]) {
//         console.log(value);
//     }
// }; */

/* //Ejemplo 52: Write a JavaScript program to find the sum of squares of a numerical vector.
//Metodo 1
// function sum(array){
//     const res = array.map(event => event*event).reduce((acc, cur) => acc + cur, 0);
//     return res;
// }

// console.log(sum([0,1,2,3,4,5,6,7,8,9,10]));

//Metodo 2
// function sum_sq(array) {
//     let sum = 0
    
//     for(let i=0; i < array.length; i++){
//         sum += Math.pow(array[i], 2);
//     }
        
//     return sum;
// }

// console.log(sum_sq([0,1,2,3,4])); */

/* //Ejemplo 53: Write a JavaScript program to remove duplicate items from an array (ignore case sensitivity).
//Metodo 1
// const nums = [1, 2, 2, 3, 1, 2, 4, 5, 4, 2, 6];
// const res = [...new Set(nums)];
// console.log(res);

// Metodo 2
// function removeDup(array) {
//     let arr1 = [];
//     for (let i = 0; i < array.length; i++) {
//         if (!arr1.includes(array[i])) {
//             arr1.push(array[i]);
//         }
//     }
//     return arr1
// }

// console.log(removeDup([1, 2, 2, 3, 1, 2, 4, 5, 4, 2, 6]));

//Metodo 3   
// const array = [1, 1, 2, 2, "a", "a", 3, 3];
// const newArray = array.filter(function(value, index){    console.log(array.indexOf(value), index)
//     return array.indexOf(value) === index;
// });

// console.log(newArray);

//Metodo 4
// const array = [1,2,3,2,3,4,5];

// for(let i = 0; i < array.length; i++){
//     for(let j=i+1; j < array.length; j++){
//         if(array[i] === array[j]){
//             array.splice(j, 1); // At position j, remove 1 items
//         }
//     }
// }

// console.log(array); */

/* //Ejemplo 54: Write a JavaScript program to display the colors in the following way: 
// "1st choice is Blue ." "2nd choice is Green." "3rd choice is Red." (Use ordinal numbers to tell their position.)

//Metodo 1
// const color = ["Blue ", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow", "black"];
// const out = ["th","st","nd","rd"];

// for(let i = 0; i < color.length; i++){
//     let y = (i+1) + (out[i+1] || out[0]);
//     let output = (`${y} choice is ${color[i]}`); 
//     console.log(output);
// };

//Metodo 2
// let color = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
// let ordinal = ["th","st","nd","rd"];
// let output = "";
// for (let i = 0; i < color.length; i++) {
// 	switch(i){
// 		case 0: output += "1" + ordinal[1] + " choice is " + color[i] + "\n"; break;
// 		case 1: output += "2" + ordinal[2] + " choice is " + color[i] + "\n"; break;
// 		case 2: output += "3" + ordinal[3] + " choice is " + color[i] + "\n"; break;
// 		default: output += i+1 + ordinal[0] + " choice is " + color[i] + "\n"; break;
// 	}
// }

// console.log(output)

// //Metodo 3
// let color = ["Blue ", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow "];
// let ordinal = ["th","st","nd","rd"];

// for(let i = 0; i < color.length; i++) {
//     i <= 2 ? console.log(i+1 + ordinal[i+1] + " choice is " + color[i]) : console.log(i+1 + ordinal[0] + " choice is " + color[i]);
// } */

/* //Ejemplo 55: Write a JavaScript program to find the leap years in a given range of years.

//Metodo 1
// const arr = [];
// const arrLeapYears = [];

// function leapYears(year1, year2){
    

//     for (let i = year1; i <= year2; i++) {
//         arr.push(i);
//     }
//     verify(arr);
// }

// function verify(res){
//     res.forEach(function(event){
//         if( (event % 4 === 0 && event % 100 !== 0) || (event % 100 === 0 && event % 400 === 0) ){
//             arrLeapYears.push(event)
//         }
//     });
// }


// leapYears(1900, 2020);
// console.log("The new array with leap years is:", arrLeapYears);

//Metodo 2
// function leapYears(start, end) {
//     let leaps = "";
//     for (let i = start; i <= end; i++) {
//         if ((i % 4 === 0 && i % 100 !== 0) || (i % 100 === 0 && i % 400 === 0 )) {
//             leaps = leaps + i + "\n";
//         }
//     }
//     return leaps;
// }

// console.log(leapYears(2000, 2016));

//Metodo 3
// function leap_year(start, end){
//     var arr_of_years = [];
    
//     for(var i = start; i <= end; i++){
//         if(!(i%4 && i%100 && i%400)){
//             arr_of_years.push(i);
//         }
//     }
//     return arr_of_years;
// }

// console.log(leap_year(2000, 2012)); */

/* //Ejemplo 56: Write a JavaScript program to shuffle an array

//Metodo 1
// const arr = [1, 2, 3, 4, 5, 6, 7];
// let i = arr.length-1;

// for (i; i > 0; i--) {
//     let rnd = Math.floor(Math.random()*i);
//     let temp = arr[i];
//     arr[i] = arr[rnd];
//     arr[rnd] = temp;
// }

// console.log(arr); 

//Metodo 2
// const arr = [1, 2, 3, 4, 5, 6, 7];
// for (let i=0; i < arr.length-1; i++) {
//     let rnd = Math.floor(Math.random()*i);
//     let temp = arr[i];
//     arr[i] = arr[rnd];
//     arr[rnd] = temp;
// }

// console.log(arr);


//Metodo 3
// let array = [1, 2, 3, 4, 5, 6];
// let newArray = [];

// for (let i = array.length; i>0 ; i--) {
//     let rand = Math.floor(Math.random()*(i)); //Genera un numero aleatorio que va desde 0 hasta 6. Despues, conforme disminuya la iteracion, este numero sera 5, luego 4 hasta llegar a 0.
//     let res = array.splice(rand, 1)[0]; //La variable res captura el elemento que se elmino dentro del array. rand es el numero elatorio que servira como indice dentro del splice, y el 1 es la cantidad de elementos a eliminar. [0] sirve para capturar el elemento sin que este dentro de un arreglo. "array" simplemente mostrara el arrgelo actualizado, el cual se ira reduciendo hasta que quede vacio
//     newArray.push(res);
// }
// console.log(newArray);

//Metodo 4
// let max = 6;
// let random = [];

// for(let i = 0; i<max ; i++){
//     let temp = Math.floor(Math.random()*(max)+1);
//     // console.log(i, temp);

//     if(random.indexOf(temp) === -1){ //Verificamos si existe un numero en el array. Si no existe, lo agregamos
//         random.push(temp);
//     }
//     else{ //Si el numero ya existe, unicamente reducimmos el valor de "i" en lugar de aumentarlo para que el array no quede incompleto. Es decir, si la iteracion va en 3 y el numero ya existe en el array, reducimos el valor de i a 2, pero al terminar el ciclo, se aumentara otra vez, por lo que el valor de i permanecera en 3, hasta que se obtenga un numero diferente en "temp".
//         i--;
//     }
// }
// console.log(random);

//Metodo 5
// function shuffle (arr) {
//     return arr.sort(() => Math.random() - 0.5);
// }
// console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])); */

/* //Ejemplo 57: Write a JavaScript program to perform a binary search. 

//Metodo 1
// //           L           p           R            
// let items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// console.log(binary_Search(items, 0, items.length-1, 8)); 

// function binary_Search(items, firstIndex, lastIndex, num){

//     let pivot = Math.floor((firstIndex + lastIndex)/2); //4

//     while(items[pivot] !== num && firstIndex < lastIndex){ //Verificamos que el indice menor sea mayor al ultimo indice. De ser asi, se sale de la funcion. Y verificamos tambien que el numero que queremos encontrar es el mismo que el pivote. De ser asi, retornamos el numero del pivote.   
//         if (num < items[pivot]){
//             lastIndex = pivot - 1;
//             console.log("Primero", lastIndex)
//         } 
//         if (num > items[pivot]){
//             firstIndex = pivot + 1;
//             console.log("Segundo", firstIndex);
//         }
//         console.log("Tercero");
//         pivot = Math.floor((lastIndex + firstIndex)/2);
//         console.log("--> ", pivot)
//     }
    
//     return pivot;  
// }

//Metodo 2
// let items = [1, 2, 3, 4, 5, 7, 8, 9];
// console.log(binary_Search(items, 0, items.length-1, 8)); 

// function binary_Search(items, firstIndex, lastIndex, num){
//     if(firstIndex > lastIndex) return -1;
//     let pivot = Math.floor((firstIndex + lastIndex)/2);
//     if(items[pivot] === num) return pivot;

//     if (items[pivot] < num){
//         return binary_Search(items, pivot+1, lastIndex, num)
//     }else{
//         return binary_Search(items, firstIndex, pivot-1, num)
//     }
// }

//Metodo 3
// function binary_Search(arr, start, end, val) {
//     while (start <= end) {
//         let mid = Math.floor((start + end) / 2);

//         if (arr[mid] === val) return mid;

//         val < arr[mid] ? end = mid - 1 : start = mid + 1;
//     }
//     return -1;
// }

// var items = [1, 2, 3, 4, 5, 7, 8, 9];

// console.log(binary_Search(items, 0, items.length-1, 5));  */

/* //Ejemplo 58: Write a JavaScript program to compute the sum of each individual index value in the given array.

//Metodo 1
// const array1 = [1,0,2,3,4];
// const array2 = [3,5,6,7,8,13];
// const newArray = [];

// for (let i=0; i < array1.length; i++) {
//     newArray.push(array1[i] + array2[i]);
// }

// console.log(newArray);

//Metodo 2
// function Arrays_sum (arr1, arr2) {
//     let resultSum = [];
//     let arrlength;

//     if (arr1.length > arr2.length) {
//         arrlength = arr1;
//     } else {
//         arrlength = arr2;
//     }
    
//     for (let i = 0; i < arrlength.length; i++) {
//         if (arr1[i] === undefined) arr1[i] = 0;
//         if (arr2[i] === undefined) arr2[i] = 0;
//         resultSum.push(arr1[i] + arr2[i]);
//     }
//     return resultSum;
// }

// console.log(Arrays_sum([1,0,2,3,4], [3,5,6,7,8,13])); */

/* //Ejemplo 59: Write a JavaScript program to find duplicate values in a JavaScript array.

// //Metodo 1
// // const arra1 = [1, 2, 9, 4, 5, 4, 7, 8, 7, 7, 1, 3, 6];
// const arra1 = [1, 2, 5, 2, 2, 2, 3, 4, 5];
// const object = [];
// const result = [];

// arra1.forEach(item => {
//     if(!object[item]) object[item] = 0;

//     object[item]++;
//     console.log(object)
// });

// for (const prop in object) {
//     if(object[prop] > 1) result.push(prop);
// }

// console.log(result);
// //Si no existe object[item], entonces lo inicializamos con 0. Por ejemplo, al iterar "arra1", el primer valor es 1, por lo que, verificamos 
// //ahora si el array "object" en la posicion de 1, existe. Como no existe, inicializamos la posicion object[1]=0 y despues se le suma 1 
// //para indicar que ha sido encontrado una vez. Ahora, en caso de que se toque un numero repetido, como en el caso del valor 2, 
// //primeramente se inicializa en 0 esa posicion, es decir object[2]=0 y luego lo aumentamos a 1. Despues, cuando vuelva a repetirse el 
// //numero 2, el if no se ejecutara, puesto que ya existe un valor en la posicion [2] y simplemente ese numero aumentara en 1 nuevamente, 
// //lo que dara como resultado 2 en lugar de 1. Y asi sucesivamente. Finalmente, con un for-in, iteramos los indices en el "arra1" y
// //verificamos si el valor perteneciente a ese indice object[prop] es mayor a 1. De ser asi, lo agregamos a un nuevo array para indicar los numeros que fueron repetidos.


//Metodo 2
// let newArray = [];
// const arr = [1, 2, -2, 4, 5, 4, 7, 8, 7, 7, 7, 3, 6];

// arr.forEach(function(val){   console.log(arr.indexOf(val), arr.lastIndexOf(val));    
//     if(arr.indexOf(val) !== arr.lastIndexOf(val)) newArray.push(val); //indexOf retorna el primer indice del numero que se repite, mientras que lastIndexOf retorna el ultimo indice, lo que nos permite saber si algo esta repetido o no, ya que si tanto indexOf como lastIndexOf son iguales, entonces quiere decir que no se repite nada.
// });

// console.log(newArray);

//Metodo 3
// const arr = [1, 2, -2, 4, 5, 4, 7, 8, 7, 7, 1, 3, 6];
// let result = [];

// for (let i=0; i < arr.length-1; i++){
//     for (let j=i+1; j < arr.length-1; j++){
//         if (arr[i] === arr[j] && result.indexOf(arr[i]) === -1) result.push(arr[i]);
//     }
// }
// console.log(result);

//Metodo 4
// const arr = ["a", "a", "c", 3, 2, 3, 5]
// const result = arr.filter(function(value, index){
//     console.log(value, arr.indexOf(value), index)
//     return arr.indexOf(value) !== index;
// });

// console.log(result);

//Metodo 5
// const findDuplicates = arr => [...new Set(arr.filter(v => arr.indexOf(v) !== arr.lastIndexOf(v)))];
// console.log(findDuplicates([1, 2, -2, 4, 5, 4, 7, 8, 7, 7, 71, 3, 6]));

//Metodo 6
// function toFindDuplicates(arry) {
//     const uniqueElements = new Set(arry);
//     const filteredElements = arry.filter(item => {
//         if (uniqueElements.has(item)) {
//             uniqueElements.delete(item);
//         } else {
//             return item;
//         }
//     });

//     return [...new Set(uniqueElements)]
// }

// const arry = [1, 2, 1, 3, 4, 3, 5];
// const duplicateElements = toFindDuplicates(arry);
// console.log(duplicateElements);

//Metodo 7
// const arry = [1, 2, 1, 3, 4, 3, 5];

// const toFindDuplicates = arry => arry.filter((item, index) => arr.indexOf(item) !== index)
// const duplicateElements = tofindDuplicates(arry);
// console.log(duplicateElements);

//Metodo 8
// let arry = [1, 2, 1, 3, 4, 3, 5];
// let toMap = {};
// let resultToReturn = false;

// for (let i=0; i<arry.length; i++){
//     if (toMap[arry[i]]){
//         resultToReturn = true;
//         // terminate the loop
//         break;
//     }
//     toMap[arry[i]] = true;
// }

// resultToReturn ? console.log('Duplicate elements exist') : console.log('Duplicates dont exist');    

//Metodo 9
// let arry = [1, 2, 1, 3, 4, 3, 5];
// let resultToReturn = false;

// resultToReturn = arry.some(function(element, index){
//     return arry.indexOf(element) !== index;
// });

// resultToReturn ? console.log('Duplicate elements exist') : console.log('Duplicates dont exist');

//Metodo 10
// let arry = [1, 2, 1, 3, 4, 3, 5];
// let resultToReturn = false;

// for (let i = 0; i < arry.length; i++){
//     for (let j = 0; j < arry.length; j++) {
//         if (i !== j) {                    // prevents the element from comparing with itself
//             if (arry[i] === arry[j]) {    // check if elements' values are equal
//                 resultToReturn = true;    // duplicate element present
//                 break;                    // terminate inner loop
//             }
//         }
//     }
                                                                    
//     if (resultToReturn) break;
// }

//Metodo 11
// let array = [6, 9, 15, 6, 13, 9, 11, 15];
// let index = 0, newArr = [];
// const length = array.length; // to get length of array

// function findDuplicates(arr) {
//     for (let i = 0; i < length - 1; i++) {
//         for (let j = i + 1; j < length; j++) {
//             if (arr[i] === arr[j]) {
//                 newArr[index] = arr[i];
//                 index++;
//             }
//         }
//     }
//     return newArr;
// }

// findDuplicates(array); */

/* //Ejemplo 60: Write a JavaScript program to flatten a nested (any depth) array. If you pass shallow, the array will only be flattened to a single level

//Metodo 1
// function flatten(input) {
//     for (let i = 0; i < input.length-1; i++) {
//         input = input.reduce(function(a, b){
// 			return a.concat(b);
// 		},[]);
//     }

// 	return input;
// }
// console.log(flatten([1, [2], [3, [[4]]], [5,6]]));


//Metodo 2
// function flat(arr,deep){
// let result = arr.flat(deep)
// return result;

// }
// console.log(flat([1, [2], [3, [[4]]], [5,6]], 3));
// console.log(flat([1, [2], [3, [[4]]], [5,6], true]));

//Metodo 3
// const ar = [];
// const ams = flatten([1, [2], [3, [[4]]],[5,6], [6, [8, [6, ["sal"]]]], "hola"]); 

// function flatten(array) {
//     for (let i = 0; i < array.length; i++) {
//         if(typeof array[i] === "number" || typeof array[i] === "string") ar.push(array[i]);  //or Number.isInteger(array[i])
//         if(Array.isArray(array[i])) flatten(array[i]);
//     }

// }
// console.log(ar);

//Metodo 4
// function flatten(arr){
//     var result = [];
    
//     one_dim_arr(arr);
    
//     function one_dim_arr(arg) {
//         if (!Array.isArray(arg)){ 
//             result.push(arg);

//         } else {
//             for (var a in arg) one_dim_arr(arg[a]);
//         }
//     }
    

//     return result;
// }
// console.log(flatten( [1, [2], [3, [[4]]], [5,6], false] )); 

//First we send the array to the function and then we create an eampty arraty that will contain the flattened elements from the array. 
//After that, we call the one_dim_arr function and we pass it in the array to verify if it's an array or not. Firstly, it won't be 
//executed the if statement but else statement, and we us recursivity to re-execute the one_dim_arr function again and verify if the 
//values in the "a" index are are arrays or not. If so, we simply push the value into a new array. If not, we re-execute the fucntion
//until we get the value and not an array.

//Metodo 5
// function flatten(a, shallow, r) {
//     if(!r) r = [];
    
//     if (shallow) {
//         return r.concat(...a);
//     }

//     for(let i=0; i<a.length; i++){
//         //a[i].constructor === Array ? flatten(a[i],shallow,r) : r.push(a[i]);
//         if(a[i].constructor === Array){
//             console.log("Primer if")
//             flatten(a[i],shallow,r);
//         }else{
//             console.log("Segundo if")
//             r.push(a[i]);
//         }
//     }
//     return r;
// };

// console.log(flatten([1, [2], [3, [[4]]], [5,6]]));

//Metodo 6
// function differenceOf2Arrays (array2) {
//     return array2 = array2.toString().split(',').map(event => +event);
// }

// console.log(differenceOf2Arrays([1, 2, 3, 4, 5], [1, [2], [3, [[4]]],[5,6]])); */

/* //Ejemplo 61: Write a JavaScript program to compute the union of two arrays.
//Metodo 1
// const arr1 = [1, 2, 3];
// const arr2 = [100, 2, 1, 10];
// const concat = arr1.concat(arr2);
// const sort = concat.slice(concat.sort((a, b) => a - b));
// const twoArrays = []
// for (let i=0; i < sort.length; i++) {
//     if (!twoArrays.includes(sort[i])) {
//         twoArrays.push(sort[i]);
//     }
// }

// console.log(sort);      //[1, 1, 2, 2, 3, 10, 100]
// console.log(twoArrays); //[1, 2, 3, 10, 100]

//Metodo 2
// function union(arra1, arra2) {
//     if ((arra1 == null) || (arra2==null)) return void 0;

//     let concatArray = [];
//     let res = [];

//     for (let i=0; i < arra1.length; i++){
//         concatArray[arra1[i]] = arra1[i];
//     }

//     for (let i=0; i < arra2.length; i++){
//         concatArray[arra2[i]] = arra2[i];
//     }

//     console.log(concatArray); //We get an array with empty spaces (empty strings)

//     const newConcatArray = concatArray.filter(n => n); //We create a new array by filter the newConcatArray and displaying only the numbers
//     return newConcatArray;
// }

// console.log(union([1, 2, 3], [5, 32, 1, 9]));

//Metodo 3
// function union(arra1, arra2) {
//     if ((arra1 == null) || (arra2==null)) return void 0;

//     let concatArray = {};
//     let res = [];

//     for (let i=0; i < arra1.length; i++){
//         concatArray[arra1[i]] = arra1[i]; 
//     }
//     console.log(concatArray)
//     for (let i=0; i < arra2.length; i++){
//         concatArray[arra2[i]] = arra2[i];
//     }

//     // console.log(concatArray)

//     for (let n in concatArray){
//         if (concatArray.hasOwnProperty(n)) res.push(concatArray[n]);
//     }

//     return res;
// }

// console.log(union([1, 2, 3], [100, 2, 1, 10]));

//Metodo 4
// function union (arr1, arr2) {
// var concatArr = arr1.concat(arr2).sort((a, b) => a - b);
// return [...new Set(concatArr)];
// }
// console.log(union([1, 2, 3], [100, 2, 1, 10]));

//Metodo 5
// let arr1 = [2, 3, 1];
// let arr2 = [100, 2, 1, 10, 2, 5];

// let arrSorted = [];
// let newArray = [];

// arr1.sort((a,b) => a - b);
// arr2.sort((a,b) => a - b);
// arrSorted.push(...arr1, ...arr2);
// arrSorted.sort(function(a,b){return a - b});

// for (let i=0; i < arrSorted.length; i++) {
//     if(arrSorted[i] !== arrSorted[i+1]){
//         newArray.push(arrSorted[i]);
//     }
// }

// console.log(newArray);

//Metodo 6
// console.log(union([3, 5, 3, 3, 6], [100, 2, 9, 6, 2, 1, 10]));

// function union(arr1, arr2) {
//     var newArr = arr1.concat(arr2); // [3, 5, 3, 3, 6, 100, 2, 9, 6, 2, 1, 10]

//     const res = newArr.filter(function(item, pos){  
//         console.log(newArr.indexOf(item)+ " --- "+ pos);
//         return newArr.indexOf(item) === pos;
//     })

//     return res;
// }

//Verificamos que la posicion de los elementos del array sea igual al de la iteracion perteneciente del filter. Por ejemplo, la posicion
//del primer numero que es 3, es igual a 0. Y de igual manera, "pos" es 0. Como "newArr.indexOf(item) === pos" coinciden, retornamos el 
//valor en un nuevo array. Cuando se repita un numero, tendremos que "newArr.indexOf(item) ≠ pos", ya que indexOf retorna el indice del 
//primer indice del numero que se repite. Es decir, tenemos el numero 3 en la posicion 0, y el 3 nuevamente pero en la posicion 2.
//Por lo que, indexOf nos retornara el 3 pero en la posicon 0, y no el de la posicion 2. */

/* //Ejemplo 62: Write a JavaScript function to find the difference between two arrays. (non-repeated values)

//Metodo 1
// console.log(difference([1, 2, 3], [100, 2, 1, 10]));
// // console.log(difference([1, 2, 3, 4, 5], [1, [2], [3, [[4]]],[5,6]]));

// function difference(array1, array2){
//     let newArray = [];
//     let res;

//     newArray = array1.concat(array2); console.log(newArray)
//     res = newArray.filter(function(event){
//         return newArray.indexOf(event) === newArray.lastIndexOf(event);
//     });

//     return res;
// }

//Metodo 2
// function differenceOf2Arrays (array1, array2) {
//     var temp = [];
//     array1 = array1.toString().split(',').map(event => +event);
//     array2 = array2.toString().split(',').map(event => +event);

//     for (let i in array1){
//         if(array2.indexOf(array1[i]) === -1) temp.push(array1[i]);
//     }
//     for (let i in array2){
//         if(array1.indexOf(array2[i]) === -1) temp.push(array2[i]);
//     }

//     return temp.sort((a,b) => a-b);
// }

// differenceOf2Arrays([1, 2, 3], [100, 2, 1, 10]);
// differenceOf2Arrays([1, 2, 3, 4, 5], [1, [2], [3, [[4]]],[5,6]]);

//Metodo 3
// function ex23(array1, array2){
//     var res = "";

//     let inA = array1.filter(event => !array2.includes(event));
//     let inB = array2.filter(event => !array1.includes(event));
//     res = inA + ','+ inB.sort();
    
//     return res;
// }

// console.log(ex23([1, 2, 3], [100, 2, 1, 10]));

//Metodo 4
// function difference(arr1, arr2){
//     let diff = [];
    
//     let array1 = arr1.flat(Infinity);
//     let array2 = arr2.flat(Infinity);

//     array1.forEach( (value) => array2.includes(value) ? null : diff.push(value) );
//     array2.forEach( (value) => array1.includes(value) ? null : diff.push(value) );
    
//     return diff;
// }

// console.log(difference([1, 2, 3], [100, 2, 1, 10]));

//Metodo 5
// function difference(arr1, arr2) {
//     let compact = [];
    
//     arr1 = arr1.flat(Infinity);
//     arr2 = arr2.flat(Infinity);

//     for (let i = 0; i < arr1.length; i++) {
//         if (!arr2.includes(arr1[i])) compact.push(arr1[i]);
//     }

//     for (let i = 0; i < arr2.length; i++) {
//         if (!arr1.includes(arr2[i])) compact.push(arr2[i]);
//     }

//     return compact.sort((a, b) => a - b);
// }

// console.log(difference([1, 2, 3], [100, 2, 1, 10]));
// console.log(difference([1, 2, 3, 4, 5], [1, [2], [3, [[4]]], [5, 6]]));
// console.log(difference([1, 2, 3], [100, 2, 1, 10])); */

/* //Ejemplo 63: Write a JavaScript function to remove. 'null', '0', '""', 'false', 'undefined' and 'NaN' values from an array.

// Metodo 1
// const array = [NaN, 0, 15, false, -22, '',undefined, 47, null];
// const newArray = [];

// for (let i = 0; i < array.length; i++) {
//     if (Number(array[i]) || !array[i] === 0) {
//         newArray.push(array[i]);
//     }
// }
// console.log(newArray);

//Metodo 2
// function removeFalse(arr) {
//     const arr2 = [];
    
//     arr.forEach(item => {
//         if (item) arr2.push(item);
//     });
    
//     return arr2;
// }

// console.log(removeFalse([NaN, 0, 15, false, -22, '',undefined, 47, null]));

//Metodo 3
// function filterFalse(arr){
//     return arr.filter(val => val);
// }

// console.log(filterFalse([NaN, 0, 15, false, -22, '',undefined, 47, null]));

//Metodo 4
// function filter_array(test_array) {
//     let result = [];
//     let index = -1;
//     let resIndex = -1;

//     while (++index < test_array.length) {
//         let value = test_array[index];

//         if (value) {
//             result[++resIndex] = value;
//         }
//     }

//     return result;
// }
// console.log(filter_array([NaN, 0, 15, false, -22, '',undefined, 47, null])); */

/* //Ejemplo 64: Write a JavaScript function to sort the following array of objects by title value.

//Metodo 1
// var library = [ 
//     { author: 'Bill Gates', title: 'The Road Ahead', libraryID: 1254},
//     { author: 'Steve Jobs', title: 'Walter Isaacson', libraryID: 4264},
//     { author: 'Suzanne Collins', title: 'Mockingjay: The Final Book of The Hunger Games', libraryID: 3245}
// ];

// let newLibrary = []

// library.map(function(event, index){
//     return newLibrary.push(event.title)
// })

// newLibrary.sort();
// console.log(newLibrary);

//Metodo 2
// var library = [ 
//     { author: 'Bill Gates', title: 'The Road Ahead', libraryID: 1254},
//     { author: 'Steve Jobs', title: 'Walter Isaacson', libraryID: 4264},
//     { author: 'Suzanne Collins', title: 'Mockingjay: The Final Book of The Hunger Games', libraryID: 3245}
// ];

// library.sort(function(a, b){
//     let prop = "title"
//     const [e1, e2] = [a[prop], b[prop]];   //return a[prop] === b[prop] ? 0 : a[prop] < b[prop] ? -1 : 1;
    
//     if(e1 === e2){
//         return 0;
//     }else if(e1 < e2){
//         return -1;
//     }else{
//         return 1;
//     }
    
// });

// console.log(library)

//Metodo 3
// var library = [ 
//     { author: 'Bill Gates', title: 'The Road Ahead', libraryID: 1254},
//     { author: 'Steve Jobs', title: 'Walter Isaacson', libraryID: 4264},
//     { author: 'Suzanne Collins', title: 'Mockingjay: The Final Book of The Hunger Games', libraryID: 3245}
// ];

// function compare_to_sort(x,y){
//     if (x.title < y.title) return -1;
//     if (x.title > y.title) return 1;

//     return 0;
// }

// console.log(library.sort(compare_to_sort)); */

/* //Ejemplo 65: Write a JavaScript program to find a pair of elements (indices of the two numbers) in a given array whose sum equals a specific target number.

//Metodo 1
// let numbers = [10,20,10,40,50,60,70];
// let target = 50;
// let str = [];
// for (let i=0; i < numbers.length; i++) {
//     for (let j=i; j < numbers.length; j++) {
//         let res = numbers[i] + numbers[j]
//         if(res === target){
//             str.push(i, j);
//         }
//     }
//     break
// }

// console.log(str);

//Metodo 2
// function findMe(arr, target){
// 	var output = [];

// 	for (let i = 0; i < arr.length; i++) {
// 		for (let j=i+1; j < arr.length; j++) {
// 			if (arr[i]+arr[j]==target) {
// 				output.push("Array[" + i + "] + Array[" + j +"] = "+ target);
// 			}
// 		}
// 	}
// 	return output;
// }
// console.log(findMe([10,20,10,40,50,60,70], 50));

//Metodo 3
// function twoSum(nums, target_num) {
//     var map = [];
//     var indexnum = [];

//     for (var x = 0; x < nums.length; x++){
//         if (map[nums[x]] != null){
//             var index = map[nums[x]];
//             indexnum[0] = index;
//             indexnum[1] = x;
            
//             break;
//         }
//         else{
//             map[target_num - nums[x]] = x;
//         }
//     }
//     return indexnum;
// }
// console.log(twoSum([10,20,10,40,50,60,70],50)); */

/* //Ejemplo 66: Write a JavaScript function to retrieve the value of a given property from all elements in an array.
const array = [NaN, 0, 15, false, -22, '',undefined, 47, null];    //[15, -22, 47]
const newArray = [];
const falsy = []

array.filter(function(item){
    if(item){
        return newArray.push(item);
    }
    if(!item){
        return falsy.push(item);
    }
});

console.log(newArray)
console.log(falsy) */

/* //Ejemplo 67: Write a JavaScript function to find the longest common starting substring in a set of strings.

//Metodo 1
// let aux;
// let arr = [];

// longString(['german', "andres", 'mancilla', "plascencia", "ali", "schweinsteiger", "arnold"]);

// function longString(res){
//     for (let i = 0; i < res.length; i++) {
//         for (let j=i+1; j < res.length; j++) {
//             if(res[i].length < res[j].length){
//                 aux = res[i];
//             }else if(res[i].length === res[j].length){
//                 arr.push(res[i], res[j]);
//             }
//         }
//     }
//     return aux
// }

// console.log("Longest string: ", aux);
// // console.log("Strings with the same length", arr)

//Metodo 2
// function longest_common_starting_substring(arr1){
//     let arr= arr1.concat().sort(); //onsole.log(arr1)
//     let a1= arr[0];
//     let a2= arr[arr.length-1]; 
//     let L= a1.length;
//     let i= 0;

//     while(i< L && a1.charAt(i) === a2.charAt(i)) i++;
    
//     return a1.substring(0, i);
// }

// longest_common_starting_substring(['go', 'google']); 
// longest_common_starting_substring(['SQLInjection', 'SQLTutorial']); 
// longest_common_starting_substring(['abcd', '1234']); 

//Metodo 3
// function longest_common(arr){
//     let [a, b] = arr;
//     let i = 1;
//     let result = null;
//     while(i <= a.length){
//         if(b.startsWith(a.slice(0, i))) {
//             result = a.slice(0,i);
//             i++;
//         }  
//         else{
//             break;
//         }
//     }
//     return result;
// }
// console.log(longest_common(['go', 'google']));

//Metodo 4
// function longest_common_deeper(arr){
//     let result = '', tmp = '';

//     arr.sort().forEach((e,i,a) => {
//         if(i === a.length - 1) return;
//         let idx = 1;
//         while(idx <= e.length){
//             if(a[i+1].startsWith(e.slice(0, idx))) {
//                 tmp = e.slice(0,idx);
//                 idx++;
//             }else{
//                 break;
//             }
//         }
//         result = (tmp.length > result.length) ? tmp : result;
//     });
//     return result;
// }

// console.log(longest_common_deeper(['goog', 'google', 'googlesearch', 'answerme', 'answer', 'answerm', 'answera']));
// console.log(longest_common_deeper( ['goo', 'google', 'googlesearch', 'abcdefg', 'abcdefgh', 'abcdefg2', 'abcdefgt', 'abcdefgp'])); */

/* //Ejemplo 68: Write a JavaScript function to fill an array with values (numeric, string with one character) within supplied bounds.
//Metodo 1
// function num_string_range(start, end, step){
//     var range = [];
//     if ((step === 0) || (typeof start == "undefined" || typeof end ==    "undefined") || (typeof start != typeof end)) return false;
    
//     if (end < start){ //Si la iteracion es de mayor a menor, debemos cambiar el signo del intervalo (step), lo que indica que la iteracion va desde algo mayor a algo menor.
//         step = step*-1; // step =- step; Otro metodo de cambiar el signo de una variable
//     }
    
//     if (typeof start === "number"){
//         while (step > 0 ? end >= start : end <= start) {
//             range.push(start);
//             start += step;
//         }
//     }else if (typeof start == "string") {
//         if (start.length != 1 || end.length != 1) throw TypeError("Strings with one character are supported.");

//         start = start.charCodeAt(0);
//         end = end.charCodeAt(0);

//         while (step > 0 ? end > start : end < start) {
//             range.push(String.fromCharCode(start));
//             start += step;
//         }
//     }else{
//         throw TypeError("Only string and number are supported");
//     }

//     return range;
// }

// console.log(num_string_range('a', "z", 2));
// console.log(num_string_range("Z", "A", 2));
// console.log(num_string_range(0, -5, 1));
// console.log(num_string_range(0, 25, 5));
// console.log(num_string_range(20, 5, 5));

//Metodo 2
// function fill(x, y, num){
//     let newArra = [];
    
//     for(let i = 0; i < 26; i += num){
//         let newAlph = String.fromCharCode(65 + i);
//         newArra.push(newAlph);
//     }

//     return newArra;
// }

// console.log(fill('a','z',2))

//Metodo 3
// function numStringRange(start , end ,jump ) {
//     var alphabet = "abcdefghijklmnopqrstuvwxyz";
//     var letters = [];
    
//     for (let i = alphabet.indexOf(start); i <= alphabet.indexOf(end); i++) {
//         letters.push(alphabet[i]);
//         i = i + jump-1;
//         console.log(i)
//     }
//     return letters;
// }
// console.log(numStringRange( "a", "z", 2));

//Metodo 4
// function strRange(start, end, gap) {
//     const range = [];
//     let [lowest, highest] = [start, end];

//     if (typeof start !== typeof end || gap === 0) return null;
    
//     if (typeof start === 'string' && typeof end === 'string') {
//         [start, end] = [start, end].map(el => el.charCodeAt());
//         var str = true;
//     }    

//     if (start > end) {
//         gap = ~gap + 1;
//         [highest, lowest] = [start, end];
//     }

//     while (start >= lowest && start <= highest) {
//         range.push(start);
//         start += gap;
//     }

//     return typeof str !== 'undefined' ? String.fromCharCode(...range).split('') : range;
// }
// console.log(strRange(1, 10, 1)); 
// console.log(strRange("z", "k", 2)); */

/* //Ejemplo 69: Write a JavaScript function that merges two arrays and removes all duplicate elements.  [3, 2, 30, 1]

//Metodo 1
// let array1 = [1, 2, 3];
// let array2 = [2, 30, 1];
// let concatArray = array1.concat(array2); //[1, 2, 3, 2, 30, 1];
// let newArray = [];
// let assoc = [];

// for (let i=concatArray.length-1; i>=0; i--) {
//     let item = concatArray[i];

//     if(!assoc[item]){ 
//         newArray.unshift(item);
//         assoc[item] = true;
//     }
// }

// console.log(newArray);

//Metodo 2
// let array1 = [1, 2, 3];
// let array2 = [2, 30, 1];
// let concatArray = array1.concat(array2); //[1, 2, 3, 2, 30, 1];
// let sortArray = concatArray.sort((a,b) => a-b);
// let newArray = [] //[3, 2, 30, 1]

// let val = sortArray.filter(function(item, index, input){ //let val = sortArray.filter(function(item, index){ 
//     return input.indexOf(item) === index;                //return sortArray.indexOf(item) === index;
// });

// console.log(val);

//Metodo 3
// function merge_array (arr1, arr2) {
//     var merged = arr1.concat(arr2);
//     return [...new Set(merged)];
// }
// console.log(merge_array([1, 2, 3], [2, 30, 1]));
// console.log(merge_array(array1, array2)); //[3, 2, 30, 1];

//Metodo 4
// function mergeArrays(arr1, arr2 ) {
//     var obj = {};
//     var totalArray = arr1.concat(arr2);

//     totalArray.forEach(function(value) {
//         obj[value] = "";
//     })
    
//     return Object.keys(obj);
// }
// console.log(mergeArrays([1, 2, 3], [2, 30, 1] ));

//Metodo 5
// function mergeArrays(arr1, arr2){
//     const stack = [...arr1.flat(), ...arr2.flat()].sort( (a, b) => a - b); // [1, 1, 2, 2, 2, 3, 3, 4, 4, 5, 6, 6]
    
//     const result = []; //[1, 2, 3 ,4, 5, 6]

//     while(stack.length){
//         let next = stack.shift(); //Reducimos la longitud del array "stack" hasta que sea 0 y deje de ejecutarse el while

//         if (!result.includes(next)) result.push(next);
//     } 
    
//     return result;
// }

// console.log(mergeArrays([1, 2, 3, 4, 5, 6], [1, 2, 1, 4, 6, 3] ));

//Metodo 6
// function merge_array(arr1, arr2) {
//     const concatArray = arr1.concat(arr2);    

//     //Con reduce
//     // const uniq = concatArray.reduce(function(a, b){ //Inicializamos uniq con un array vacio. Por lo que a = [], y b = 1. Donde "b" son los elementos de arrayConcat
//     //     console.log(a, b)
//     //     if (!a.includes(b)) a.push(b);
//     //     return a;
//     // }, []);
    
//     //Con filter
//     const newArray = [];
//     const uniq = concatArray.filter(function(event){
//         if(!newArray.includes(event)){
//             return newArray.push(event)
//         }
//     })

//     return uniq;
// }
// // merge_array([1, 2, 3], [2, 30, 1]);
// console.log(merge_array([1, 2, 3], [2, 30, 1]));

//Metodo 7
// function merge() {
//     const obj = {};
//     for (let i = 0; i < arguments.length; i++) {
//         let keys = arguments[i];
//         for (let j = 0; j < keys.length; j++) {
//             obj[keys[j]] = keys[j];
//         }
//     }
//     return Object.values(obj);
// }
// console.log(merge([1,2,3], [2,30,1])); // [ 1, 2, 3, 30 ] */

/* //Ejemplo 70: Write a JavaScript function to remove a specific element from an array.

//Metodo 1
// console.log(remove_array_element([2, 5, 9, 6], 5));   //[2, 9, 6]

// function remove_array_element(array, numRemove){
//     let res = array.filter(function(event, index){
//         return array[index] !== numRemove;
//     });

//     return res;
// }

//Metodo 2
// function remove_array_element(array, n){
//     var index = array.indexOf(n);
//     if (index > -1) array.splice(index, 1);
    
//     return array;
// }

// console.log(remove_array_element([2, 5, 9, 6], 5));

//Metodo 3
// function remove(arr,b) {
//     let res =  arr.filter(function (num) {
//         return num !== b;
//     });

//     return res
// }
// console.log(remove([2, 5, 9, 6, 5, 5], 5));

//Metodo 4
// function func(arr, target){
//     for (const v of arr){
        
//         if(v === target) arr.splice(arr.indexOf(v), 1);

//         return arr;
//     } 
// }
// console.log(func([2, 9, 5, 6], 2)); */

/* //Ejemplo 71: Write a JavaScript function to find an array containing a specific element.  [true]

//Metodo 1
// console.log(contains([2, 5, 9, 6], 5));
// function contains(array, numVerify){
//     let res = array.some(function(event){
//         return event === numVerify;
//     });

//     return res;
// }

//Metodo 2
// console.log(contains([2, 5, 9, 6], 5));

// function contains(array, numVerify){
//     for (let i = 0; i < array.length; i++) {
//         if(array[i] == numVerify){
//             return true;
//         }
//     }
//     return false;
// }

//Metodo 3
// function contains(arr, element) {
//     return arr.includes(element);
// }

// console.log(contains([2, 5, 9, 6], 5));
// console.log(contains([2, 5, 9, 6], 15)); */

/* //Ejemplo 72: Write a JavaScript script to empty an array while keeping the original.
//Metodo 1
// let arr = [1, 3, 6, 3, -5];
// console.log(arr);

// arr.splice(0, arr.length);
// console.log(arr)

//Metodo 2
// arr = [1, 3, 6, 3, -5];
// console.log(arr);
// arr.length = 0;
// console.log(arr); */

/* //Ejemplo 73: Write a JavaScript function to get the nth largest element from an unsorted array.
//Metodo 1
// let flag = [0];
// function nthlargest(array, num){

//     for (let i=0; i<num; i++) {
//         if (array[i] > flag) {
//             flag = array[i];
//         }
//     }

//     return flag;
// }
// console.log(nthlargest([ 43, 56, 23, 89, 88, 90, 99, 652], 4)); //89

//Metodo 2
// function nLarger(arr, n) {
//     var k = 0;
//     var top = [];

//     while (k < n) {
//         top[k] = 0;
//         for (let i = 0; i < arr.length; i++) {
//             if (arr[i] > top[k] && top.indexOf(arr[i])==-1){
//                 top[k] = arr[i];
//             }
//         }

//         k++
//     }

//     return top[n-1]
// }
// console.log(nLarger([43, 56, 23, 89, 88, 90, 99, 652], 4));

//Metodo 3
// function nthlargest(arr, highest) {
//     let res = arr.sort((a,b) => {
//         return a-b;
//     });

//     return res[highest];
    
    
// }

// console.log(nthlargest([ 43, 56, 23, 89, 88, 90, 99, 652], 4));

//Metodo 4
// function nthlargest(arr1, n){
//     let arr2 = arr1.sort(function(a, b){return a - b})
    
//     for(let i=0; i<arr2.length; i++){
//         if(i===n){
//             return arr2[i]
//         }
//     }
// }

// console.log(nthlargest([43,56,23,89,88,90,99,652],4))

//Metodo 5
// function nthlargest(array,indexEnd) {
//     if (!array || array[indexEnd] === void 0 ) return null;   
//     var arrPart = array.slice(0, indexEnd + 1);// Copy array part
//     return Math.max.apply(null,arrPart); // Pick the maximum number from array
// }

// console.log(nthlargest([ 43, 56, 23, 89, 88, 90, 99, 652], 4));

//Metodo 6
// console.log(nthlargest([ 43, 56, 23, 89, 88, 90, 99, 652], 4)); 

// function nthlargest(arra,highest){
// 	let x = 0; let y = 0; let z = 0; let temp = 0;
// 	let flag = false; let result = false;

//     while(x < arra.length){
// 		y = x + 1; 
		
// 		if(y < arra.length){
// 			for(z = y; z < arra.length; z++){
				
// 				if(arra[x] < arra[z]){
// 					temp = arra[z];
// 					arra[z] = arra[x];
// 					arra[x] = temp;
// 					flag = true; 
// 				}else{
// 					continue;
// 				}	
// 			}					
// 		}
		
// 		if(flag){
// 			flag = false;
// 		}else{
// 			x++; 
// 			if(x === highest){ 
// 				result = true;
// 			}	
// 		}

// 		if(result){
// 			break;
// 		}
// 	}
    
//     return (arra[(highest - 1)]);	
// } */

/* //Ejemplo 74: Write a JavaScript function to get random items from an array.
let items = [254, 45, 212, 365, 2543];
let random = Math.floor(Math.random()*items.length);
console.log(items[random]); */

/* //Ejemplo 75: Write a JavaScript function to create a specified number of elements with a pre-filled numeric value array.

//Metodo 1
// function array_filled(limit, number){
//     let newArray = [];
//     for (let i = 0; i < limit; i++) {
//         newArray.push(number)        
//     }

//     return newArray
// }
// console.log(array_filled(6, 0));
// console.log(array_filled(4, 11));

//Metodo 2
// function array_filled(n, val){
//     let res =  Array.apply(null, Array(n)).map(Number.prototype.valueOf,val);
//     return res;
// }

// console.log(array_filled(6, 0));
// console.log(array_filled(4, 11));

//Metodo 3
// function array_filled(len, val){
//     return Array(len).fill(val);
// }
// console.log(array_filled(6, 0)); // => [0, 0, 0, 0, 0, 0]

//Metodo 4
// function array_filled(size, ele) {
//     let arr = Array(size);
//     return arr.fill(ele, 0, size);
// }

// console.log(array_filled(6, 0));
// console.log(array_filled(4, 11)); */

/* //Ejemplo 76: Write a JavaScript function to create a specified number of elements with a pre-filled string value array.

//Metodo 1
// function array_filled(n, val){
//     return Array.apply(null, Array(n)).map(String.prototype.valueOf, val);
// }

// console.log(array_filled(3, 'default value'));
// console.log(array_filled(4, 'password'));

//Metodo 2
// function array_filled(limit, number){
//     let newArray = [];
//     for (let i = 0; i < limit; i++) {
//         newArray.push(number)        
//     }

//     return newArray
// }
// console.log(array_filled(3, 'default value'));
// console.log(array_filled(4, 'password')); */

/* //Ejemplo 77: Write a JavaScript function to interchange an array element from one position to another.
//Metodo 1
function move(array, num1, num2){
    let res1, res2, aux;  // 10, 30
    for (let i = 0; i < array.length; i++) {
        if(i === num1){
            res1 = array[i];
        }
        if (i === num2) {
            res2 = array[i];
        }
    }

    array[num1] = res2;
    array[num2] = res1;

    return array
}

console.log(move([10, 20, 30, 40, 50], 0, 2));   //[20, 30, 10, 40, 50] */

/* //Ejemplo 78: Write a JavaScript function to move an array element from one position to another.

//Metodo 1
// function move(arr, old_index, new_index) {
//     // while (old_index < 0) {
//     //     old_index += arr.length;
//     // }
    
//     // while (new_index < 0) {
//     //     new_index += arr.length;
//     // }
    
//     // if (new_index >= arr.length) {
//     //     console.log()
//     //     var k = new_index - arr.length;
//     //     while ((k--) + 1) {
//     //         arr.push(undefined);
//     //     }
//     // }

//     const res = arr.splice(old_index, 1)[0];
//     arr.splice(new_index, 0, res);  
//     return arr;
// }

// console.log(move([10, 20, 30, 40, 50], 0, 2));
// // console.log(move([10, 20, 30, 40, 50], -1, -2));

//Metodo 2
// function ex38(arr, fromIndex, toIndex){
//     var element = arr[fromIndex];
//     arr.splice(fromIndex, 1);
//     arr.splice(toIndex, 0, element);
//     return arr;
// }
// console.log(ex38([10, 20, 30, 40, 50], 0, 2));

//Metodo 3
// function moveArray(input, start, end){
//     // if( start < 0) start = start + input.length;
//     // if( end < 0 ) end = end + input.length;
//     // if( start === end ) return input;

//     if ( start < end && end <= input.length){
//         let subArray = input.splice(start, end + 1 );
//         subArray.push(subArray.shift());
//         input.splice(start,0,...subArray)
//         return input;
//     }
//     else return 'Invalid Input ';
// }
// console.log(moveArray([10, 20, 30, 40, 50], 0, 2));

//Metodo 4
// function move(arr, x, y) {
//     let array = arr,
//     buffer = "";

//     // if(x < 0 && y < 0) {
//     //     buffer = array[array.length + y];
//     //     array[array.length + y] = array[array.length + x];
//     //     array[array.length + x] = buffer;
//     // }

//     if(x >= 0 && y >= 0) {
//         buffer = array[y];
//         array[y] = array[x];
//         array[x] = buffer;
//     }

//     return array
// }
// console.log(move([10,20,30,40,50], 0, 2)); // [30, 20, 10, 40, 50] */

/* //Ejemplo 79: Write a JavaScript function to filter false, null, 0 and blank values from an array.
// console.log(filter_array_values([58, '', 'abcd', true, null, false, 0]));  //[58, "abcd", true]
// function filter_array_values(arr) {
//     const arrTruty = []
//     const arrFalsy = [];
    
//     arr.forEach(item => {
//         if (item) arrTruty.push(item);
//         if (!item) arrFalsy.push(item);
//     });
    
//     return [arrTruty, arrFalsy];
// } */

/* //Ejemplo 80: Write a JavaScript function to generate an array of integer numbers, increasing one from the starting position, of a specified length.

//Metodo 1
// function array_range(firstIndex, lastIndex){
//     let array = [];
//     for (let i = 0; i < lastIndex; i++) {
//         array.push(firstIndex++)      
//     }
//     return array;
// }
// console.log(array_range(1, 4));  //[1, 2, 3, 4]
// console.log(array_range(-6, 4));  //[-6, -5, -4, -3]

//Metodo 2
// function array_range(start, len){
// 	var arr = new Array(len);
// 	for (var i = 0; i < len; i++, start++){
// 		arr[i] = start;
// 	}
//     return arr;
// }

// console.log(array_range(1, 4));
// console.log(array_range(-6, 4));

//Metodo 3
// function arrayRange( start, range ){
//     const arr1 = Array(range).fill(0); //Creamos un array de 4 espacios. Puede ir algo dentro de fill() o no.
//     const arr2 = arr1.map((el,idx) => start + idx )
	
//     return arr2
// }

// console.log( arrayRange( 1, 4 )); // [ 1, 2, 3, 4 ]
// // console.log( arrayRange( -6, 4 )); // [ -6, -5, -4, -3 ]

//Metodo 4
// function func(startNum, len){
//     var arr = []
//     if (startNum < 0) {
//         for (var i = 0; i < len; i++) {
//             arr[i] = - len + i
//         }
//     }else{
//         for (var i = 0; i < len; i++) {
//             arr[i] = i + 1
//         }
//     }
//     return arr
// }
// console.log(func(-6, 4)); */

/* //Ejemplo 81: Write a JavaScript function to generate an array between two integers of 1 step length.

//Metodo 1
// function rangeBetween(initial, limit){
//     let arr = [];
//     let res = Math.abs(initial - limit);

//     for (let i=0; i <= res; i++) {
//         arr.push(initial++)
//     }

//     return arr;
// }

// console.log(rangeBetween(4, 7)); //[4, 5, 6, 7]
// console.log(rangeBetween(-4, 7)); //[-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7]

//Metodo 2
// function rangeBetwee(start, end){
// 	if (start > end) {
// 		let arr = new Array(start - end + 1);
// 		for (let i=0; i < arr.length; i++, start--) {
// 			resarrult[i] = start;
// 		}
// 		return arr;
// 	}else{
// 		let arro = new Array(end-start+1);
//         for (let j=0; j < arro.length; j++, start++){
//             arro[j] = start;
//         }
//         return arro;
// 	}
// }

// console.log(rangeBetwee(4, 7));
// console.log(rangeBetwee(-4, 7)); */

/* //Ejemplo 82: Write a JavaScript function to find unique elements in two arrays

//Metodo 1
// console.log(difference([1, 2, 3], [100, 2, 1, 10])); //["1", "2", "3", "10", "100"]
// console.log(difference([1, 2, 3, 4, 5], [1, [2], [3, [[4]]],[5,6]])); //["1", "2", "3", "4", "5", "6"]
// console.log(difference([1, 2, 3], [100, 2, 1, 10])); //["1", "2", "3", "10", "100"]

// function difference(arr1,arr2) {
//     var a1= flatten(arr1,true);
//     var a2= flatten(arr2,true);
//     var a=[], diff=[];

//     for(var i=0;i< a1.length;i++){
//         a[a1[i]]=false;
//     }
    
//     for(i=0;i< a2.length;i++){
//         if(a[a2[i]]===true){ 
//             delete a[a2[i]];
//         }else a[a2[i]]=true;
//     }
    
//     for(var k in a){
//         diff.push(k);
//     }

//     return diff;   
// }

// function flatten(a, shallow,r){
//     if(!r){ 
//         r = [];
//     }
//     if (shallow) {
//         return r.concat.apply(r,a);
//     }  
//     for(i=0; i< a.length; i++){
//         if(a[i].constructor == Array){
//             flatten(a[i],shallow,r);
//         }else{
//             r.push(a[i]);
//         }
//     }
//     return r;
// };

//Metodo 2
// function difference(a, b){
//     let fa = reduceRec(a);
//     let fb = reduceRec(b);

//     function reduceRec(arr){// Flat n-deep arrays
//         let res = arr.reduce(function(acc, val){
//             if(Array.isArray(val)) val = reduceRec(val);
//             return acc.concat(val);
//         }, []);

//         return res;
//     }
    
//     let final = Array.from(new Set(fa.concat(fb))).sort((x, y) => x - y);

//     return final;
// }

// console.log(difference([1, 2, 3], [100, 2, 1, 10]));
// console.log(difference([1, 2, 3, 4, 5], [1, [2], [3, [[4]]],[5,6]]));
// console.log(difference([1, 2, 3], [100, 2, 1, 10]));
// console.log(difference([[1,2],3,[[4,4, [5, [6, 7,[9,[11]]]]]]], [1,4,5,6,7,8,8]));// and a deeper array structure */

/* //Ejemplo 83: Write a JavaScript program to find all the unique values in a set of numbers.

// Metodo 1
function removeDup(array) {
    let arr1 = [];
    for (let i = 0; i < array.length; i++) {
        if (!arr1.includes(array[i])) {
            arr1.push(array[i]);
        }
    }
    return arr1
}

console.log(removeDup([1, 2, 2, 3, 4, 4, 5]));
console.log(removeDup([1, 2, 3, 4, 5]));
console.log(removeDup([1, -2, -2, 3, 4, -5, -6, -5])); */

/* //Ejemplo 84: Write a JavaScript program that takes an array of integers and returns false if every number is not prime. Otherwise, return true.
function test(arr){
    for (let i=0; i<arr.length; i++) {
        if ( (arr[i] === 1 || arr[i] > 2) && arr[i]%2 === 0) return false;
    }
    
    return true;
}

let nums1 = [2, 3, 5, 7, 11];
let nums2 = [2, 3, 5, 7, 8];
console.log("Original array of integers: "+ [2, 3, 5, 7, 11] +" and the answer is: " + test(nums1))
console.log("Original array of integers: "+ [2, 3, 5, 7, 8] +" and the answer is: " + test(nums2)) */

/* //Ejemplo 85: Write a JavaScript program that takes an array of numbers and returns the third smallest number.

function test(arr){
    let res1 = arr.sort((a,b) => a-b); //[1, 2, 3, 5, 7]
    
    let aux;
    for (let i = 0; i < 3; i++) {
        if(res1[i] < res1[i+1]){
            aux = res1[i]
        }
        
    }
    return aux;
}

let nums1 = [2, 3, 5, 7, 1]
console.log("Original array of numbers: "+nums1+" and the Third smallest number of the said array of numbers: " +test(nums1));
let nums2 = [2, 3, 0, 5, 7, 8, -2, -4]
console.log("Original array of numbers: "+nums2+" and the Third smallest number of the said array of numbers: " +test(nums2)); */

/* //Ejemplo 86: Write a JavaScript program that takes an array with mixed data type and calculates the sum of all numbers.
let arr_mix1 = [2, "11", 3, "a2", false, 5, 7, 1]
console.log("Original array: "+arr_mix1+" and the answer is: "+ test(arr_mix1))
let arr_mix2 = [2, 3, 0, 5, 7, 8, true, false]
console.log("Original array: "+arr_mix2+" and the answer is: "+ test(arr_mix2))

function test(arr){
    let acc=0;
    for (let i=0; i<arr.length; i++) {
        if(typeof arr[i] === "number"){
            acc = acc + arr[i];
        }
    }

    return acc;
} */

/* //Ejemplo 87: Write a JavaScript program to check if an array is a factor chain or not. A factor chain is an array in which the previous element is a factor of the next consecutive element. The following is a factor chain:
// [2, 4, 8, 16, 32]
// 2 is a factor of 4
// 4 is a factor of 8
// 8 is a factor of 16
// 16 is a factor of 32

//Metodo 1
// function test(arr){
//     let aux = false;
//     for (let i = 0; i < arr.length-1; i++) {
//         if(arr[i+1]/arr[i] === 2){
//             aux = true;
//         }else{
//             aux = false
//         }
//     }
//     return aux;
// }

// let nums1 = [2, 4, 8, 16, 32]
// console.log("Original array: ",nums1, " and the answer is: ", test(nums1))

// let nums2 = [2, 4, 16, 32, 64]
// console.log("Original array: ",nums2, " and the answer is: ", test(nums2))

// let nums3 = [2, 4, 16, 32, 68]
// console.log("Original array: ",nums3, " and the answer is: ", test(nums3))

//Metodo 2
// function test(arr){
//     for (let i = 0; i < arr.length-1; i++) {
//         if(arr[i+1]%arr[i] !== 0){
//             return false;
//         }
//     }
//     return true;
// }

// let nums1 = [2, 4, 8, 16, 32]
// console.log("Original array: ",nums1, " and the answer is: ", test(nums1));

// let nums2 = [2, 4, 16, 32, 64]
// console.log("Original array: ",nums2, " and the answer is: ", test(nums2));

// let nums3 = [2, 4, 16, 32, 68]
// console.log("Original array: ",nums3, " and the answer is: ", test(nums3)); */

/* //Ejemplo 88: Write a JavaScript program to get all the indexes where NaN is found in a given array of numbers and NaN.

//Metodo 1
// function test(arr){
//     const newArray = [];
//     for (let i=0; i<arr.length; i++) {
//         if(!arr[i]){
//             newArray.push(i)
//         }
//     }

//     return newArray;
// }

// console.log(test([2, NaN, 8, 16, 32]));     
// console.log(test([2, 4, NaN, 16, 32, NaN]));
// console.log(test([2, 4, 16, 32]));          

//Metodo 2
// function test(arr_nums){
//     let res1 = arr_nums.map(function(el, i){
//         if(isNaN(el)){
//             return i;
//         }else{
//             return false;
//         }
//     })
    
//     let res2 = res1.filter(function(el){
//         return el;
//     });

//     return res2;
// }

// console.log(test([2, NaN, 8, 16, 32]));     
// console.log(test([2, 4, NaN, 16, 32, NaN]));
// console.log(test([2, 4, 16, 32])); */

/* //Ejemplo 89: Write a JavaScript program to count the number of arrays inside a given array.

//Metodo 1
// function test(array){
//     let aux = 0;
//     array.forEach(function(item){
//         if(typeof item === "object"){
//             return aux++;
//         }
//     })
//     return aux;
// }

// console.log(test(([2,8,[6],3,3,5,3,4,[5,4]]))); //2
// console.log(test(([2,8,[6,3,3],[4],5,[3,4,[5,4]]]))); //3

//Metodo 2
// function test(arr_nums){
// 	return arr_nums.filter(n=>Array.isArray(n)).length;
// }

// console.log(test(([2,8,[6],3,3,5,3,4,[5,4]]))); //2
// console.log(test(([2,8,[6,3,3],[4],5,[3,4,[5,4]]]))); //3 */

/* //Ejemplo 90: Deep dive into reduce();

// Metodo 1
// const people = [
//     {name: "Kyle", age: 26},
//     {name: "Cartman", age: 31},
//     {name: "Kenny", age: 42},
//     {name: "Stan", age: 42}
// ];

// const result = people.reduce(function(grupedPeople, person){
//     if(grupedPeople[person.age] === undefined){ //Al principio siempre sera undefined, puesto que no hay ningun arreglo en el objeto, a no ser que haya un numero repetido, como lo sera el 42.
//         grupedPeople[person.age] = []; //Despues, creamos un aray vacio cuando estemos en el person.age. Por ejemplo, primero tendremos {26: []}, despues {31: []} y asi sucecivamente
//     }

//     grupedPeople[person.age].push(person); //Cuando ya tengamos el array vacio en ese valor, simplemente agregaremos el objeto "person" en el que nos encontremos. 
//     return grupedPeople;
// }, {});

// console.log(result)

//Metodo 2
// const arr = [1,2,3,4,5,6,8,9,10];
// const res = arr.reduce(function(cur, item){
//     if(item%2 === 0){
//         cur = [...cur, item*2]; 
//         // return [...cur, item*2];
//         // cur.push(item*2);
//     }
//     return cur; //Si el if no se ejecuta, simplemente retornamos lo que se encuentra en "cur" para despues seguir iterando.
// }, []);

// console.log(res, "\n"); */

/* //Ejemplo 91: Write a JavaScript program to create a tally (counter) with the Reduce
const fruitBasket = ['banana', 'cherry', 'orange', 'apple', 'cherry', 'orange', 'apple', 'banana', 'cherry', 'orange', 'fig' ];

const count = fruitBasket.reduce(function(tally, fruit){
    !tally[fruit] ? tally[fruit] = 1 : tally[fruit]++;  //tally[fruit] = (tally[fruit] || 0) + 1; (option 2)
    return tally;
} , {})

console.log(count); */

/* //Ejemplo 92: Write a JavaScript program to create a counter in which you create an acumulator object by using reduce.
//Metodo 1
// var numbers = [5, 3, 8, 6, 9, 1, 0, 2, 2];

// function isOdd(n) {
//     return !!(n % 2);
// }

// var oddEvenCounts = numbers.reduce(function(counts, number) {
//     if (isOdd(number)) {
//         counts.odd++;
//         // counts["odd"]++;
//     } else {
//         counts.even++; 
//         // counts["even"]++;
//     }

//     return counts; // return the accumulator
// }, {odd: 0, even: 0}); // set the initial values of odd and even

// console.log(oddEvenCounts);

//Metodo 2
// var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

// var countedNames = names.reduce(function(allNames, name){ 
//     if (name in allNames) {
//         allNames[name]++;
//     }
//     else {
//         allNames[name] = 1;
//     }
//     return allNames;
// }, {});

// console.log(countedNames);*/

/* //Ejemplo 92: Write a JavaScript program to convert an array of objects to a single object keyed by id (with reduce and filter)
const users = [
    { id: 1, email: 'dcontreras@email.tld' },
    { id: 2, email: 'afeher@email.tld' },
    { id: 3, email: 'odj@email.tld' },
];

const profiles = [
    { userId: 1, firstName: 'Danielle', lastName: 'Contreras' },
    { userId: 2, firstName: 'Alfredas', lastName: 'Fehér' },
    { userId: 3, firstName: 'Orpheus', lastName: 'De Jong' },
];


const profilesByUserId = profiles.reduce(function(next, profile){  // Transform the profiles into an object keyed by the userId:
    const { userId } = profile;
    next = { ...next, [userId]: profile }
    return next;
}, {}); 

const usersWithProfiles = users.map(function(user){  // Look up the profiles by id:
    return { ...user, profile: profilesByUserId[user.id]};
});

console.log(usersWithProfiles); */ 

/* //Ejemplo 93: Write a JavaScript program to flatten an array of arrays with the Reduce 
//Metodo 1
// const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

// const flat = data.reduce(function(total, amount){
//     return total.concat(amount);
// }, []);

// console.log(flat);

//Metodo 2
// const data = [
//     {a: 'happy', b: 'robin', c: ['blue','green']}, 
//     {a: 'tired', b: 'panther', c: ['green','black','orange','blue']}, 
//     {a: 'sad', b: 'goldfish', c: ['green','red']}
// ];

// const colors = data.reduce(function(total, amount){
//     amount.c.forEach( color => {
//         total.push(color);
//     })
//     return total;
// }, []);

//Metodo 3
// const data = [
//     {a: 'happy', b: 'robin', c: ['blue','green']}, 
//     {a: 'tired', b: 'panther', c: ['green','black','orange','blue']}, 
//     {a: 'sad', b: 'goldfish', c: ['green','red']}
// ];
// const uniqueColors = data.reduce(function(total, amount){
//     amount.c.forEach( color => {
//         if (total.indexOf(color) === -1){
//             total.push(color);
//         }
//     });
//     return total;
// }, []);

// console.log(uniqueColors); */

/* //Ejemplo 94: Write a JavaScript program to copy an object with filtered properties
// Metodo 1
// const person = {
//     firstName: 'Orpheus',
//     lastName: 'De Jong',
//     phone: '+1 123-456-7890',
//     email: 'fake@email.tld'
// };
// const allowedProperties = ['firstName', 'lastName'];

// const allKeys = Object.keys(person);
// const result = allKeys.reduce(function(next, key){
//     if (allowedProperties.includes(key)) {
//         return { ...next, [key]: person[key] };
//     } else {
//         return next;
//     }
// }, {});

// console.log(result);

// Metodo 3
// function filterAllowedObjectProperties(obj, allowedProperties = []){
//   return Object.keys(obj).reduce((next, key) => {
// 	if (allowedProperties.includes(key)) {
// 	  return { ...next, [key]: obj[key] };
// 	} else {
// 	  return next;
// 	}
//   }, {});
// } */

/* //Ejemplo 95: Write a JavaScript program to merging two objects, preferring values from one
const obj1 = {key1: 'value 1.1',key2: null,key3: 'value 1.3',key4: ''};
const obj2 = {key1: 'value 2.1',key2: 'value 2.2',key3: 'value 2.3',key4: 'value 2.4',key5: 'value 2.5'};

// Spread the keys from both objects into an array.
const allKeys = [ ...Object.keys(obj1), ...Object.keys(obj2) ]; console.log(allKeys)

// Convert the array of keys to a set to remove duplicate values, then spread the unique values into a new array.
const uniqueKeys = [ ...new Set(allKeys) ];

// Reduce the unique keys into a new object containing the value for each key from obj1, falling back to the value from obj2 if obj1[key] is falsey.
const result = uniqueKeys.reduce((next, key) => {
    const value = obj1[key] || obj2[key];
    return { ...next, [key]: value };
}, {});

// console.log(result) */

/* //Ejemplo 96: Write a JavaScript program to remove all false values from an object or array. (pending)
function test(val){
    let data; let verify; 

    if(Array.isArray(val)){
        data = val.filter(Boolean)
        verify = [];
    }else{
        data = val;
        verify = {};
    }
    let keys = Object.keys(data); //Obtenemos las keys del objeto "obj" y las metemos en un array
    let res =  keys.reduce(function(acc, item){
        const value = data[item]; console.log(value)
        
        if (Boolean(value)){
            acc[item] = (typeof value === 'object' ? test(value) : value);
        }

        return acc;
    }, verify);

    return res;
};

//{"c":true,"e":1,"g":"a","h":[true,1,"a"],"i":{"l":"a"}}
const obj = {a: null,b: false,c: true,d: 0,e: 1,f: '',g: 'a',h: [null, false, '', true, 1, 'a'],i: { j: 0, k: false, l: 'a' }}

// test(obj);
console.log(test(obj)); */

/* //Ejemplo 97: Write a JavaScript program to generate all permutations of an array's elements including duplicates. (pending)
//Metodo 1
// function permutations(arr){
//     if (arr.length <= 2){
//         let res = arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
//         return res;
//     }

//     let res = arr.reduce(function(acc, item, i){
//         let res1 = permutations([...arr.slice(i + 1), ...arr.slice(0, i)]);   //console.log(res1);
//         let res2 = res1.map(val => [item, ...val]);                           //console.log(res2);
//         let res3 = acc.concat(res2);                                          //console.log(res3)

//         return res3;
//     }, []);

//     console.log(res)
//     return res;
// };
// // permutations([1, 33, 5]);
// permutations([1, 3, 5, 7]);
// // console.log(permutations([2, 4]))

//Metodo 2
// const a = [1, 2, 3];
// function permutations(a){
//     const _permutations = [];
//     permute(a);

//     function permute(arr, permutation = []){
//         if(!arr.length){
//             console.log("res")
//             _permutations.push(permutation);
//             return;
//         }

//         for (let i=0; i<arr.length; i++) {
//             let curr = arr.slice(); //Creamos un nuevo array para no trabajar sobre el original.
//             let next = curr.splice(i, 1); //Despues, en cada iteracion tomaremos 
//             console.log(curr, " --- ", next)
//             permute(curr, permutation.concat(next));
//         }
//     }
//     return _permutations;
// }
// permutations(a);
// // console.log(permutations(a)); */

/* //Ejemplo 98: Write a JavaScript function to create an array of arrays, ungrouping the elements in an array produced by zip. (pending)

//Metodo 1
// function unzip(arr){
//     let res; 
//     let dstr = Array.from({ length: Math.max(...arr.map(x => x.length))});
//     let map = dstr.map(x => []); //Creamos un array de n espacios
    
//     res = arr.reduce(function(acc, val){
//         return (val.forEach(function(v, i){acc[i].push(v)}), acc);
//     }, map);

//     return res;
// }

// console.log(unzip([['a', 1, true], ['b', 2, false]]));
// console.log(unzip([['a', 1, true], ['b', 2]]));

//Metodo 2
// function unzip(arr){
//     const tempObj = arr.flat().reduce((acc, cur) => {
//         acc[typeof cur] ? acc[typeof cur].push(cur) : (acc[typeof cur] = [cur]);
//         return acc;
//     }, {});
//     return Object.values(tempObj);
// }; */


//         $$$$$$$$$$$$$$$ STRINGS & MODERN OPERATORS $$$$$$$$$$$$$$$


/* // Ejemplo 1: uso de los operadores Suggar Syntax con operaciones aritméticas sencillas como +, -, /, *. Te dejo para que investigues cómo se realizaría la potenciación (exponenciación).

// Operador adición ++ (en una sola unidad)
let num = 10;
console.log("--> El valor actual del nùmero es " + num);
num++;
console.log("--> El valor actual del nùmero es", {num}); 

// Operador sustracción -- (en una sola unidad)
let numB = 10;
console.log("--> El valor actual del nùmero es " + numB);
numB--;
console.log("--> El valor actual del nùmero es", {numB});

// Aplicar los mismos operadores pero con dos valores
let numeroUno = parseInt(prompt("Ingrese el numero 1"));
let numeroDOs = parseInt(prompt("Ingrese el numero 2"));

// Adición
numeroUno += numeroDOs;
console.log("--> El resultado de la suma de los dos valores es", {numeroUno});

// Sustracción
numeroUno -= numeroDOs;
console.log("--> El resultado de la resta de los dos valores es", {numeroUno});

// División
/* numeroUno /= numeroDOs;
console.log("--> El resultado de la división de los dos valores es", {numeroUno});

// Producto
numeroUno *= numeroDOs;
console.log("--> El resultado de la multiplicación de los dos valores es", {numeroUno}); */

/* // Ejemplo 2: Uso del operador ternario (simplificación de la estructura IF-ELSE)
let tempt = 31;
let diaCaluroso;

tempt > 30 ? (diaCaluroso = true) : (diaCaluroso = false);

alert("--> La evalaución resulto " + diaCaluroso); */

/* // Ejemplo 4: Operador lógico AND
let carrito = [];
let carritox2 = [{id: 10, nombre: "Play Station 5"}];

//(condición lógica) && (return si true);
// El return por default en caso de false, es false.

carrito.length == 0 && console.log("--> El carrito está vacío");
carritox2.length == 1 && console.log("--> El carritox2 está lleno"); */

/* // Ejemplo 5: Operador Lógico OR

// Tabla que ejemplifica algunos de los valores que corresponden a Falsy
console.log("Hola Mundo" || "Falsy"); // Hola Mundo
console.log(40 || "Falsy"); // 40
console.log(true || "Falsy"); // true
console.log(0 || "Falsy"); // Falsy
console.log("" || "Falsy"); // Falsy
console.log(null || "Falsy"); // Falsy
console.log(undefined || "Falsy"); // Falsy
console.log(NaN || "Falsy"); // Falsy
console.log(false || "Falsy"); // Falsy 

let numero = 15;
const numerSelected = numero || 0 ;
console.log("--> numerSelected", {numerSelected}); */

/* // Ejemplo 6: Nullish Coalescing
// Tabla que ejemplifica algunos de los valores que corresponden a Falsy
 console.log(0 ?? "Nullish"); // 0
console.log(40 ?? "Nullish"); // 40
console.log("Hola Mundo" ?? "Nullish"); // Hola Mundo
console.log("" ?? "Nullish"); // ""
console.log(NaN ?? "Nullish"); // NaN
console.log(true ?? "Nullish"); // true
console.log(false ?? "Nullish"); // false
console.log(null ?? "Nullish"); // Nullish
console.log(undefined ?? "Nullish"); // Nullish */

/* // Ejemplo 7: uso dep operador de acceso condicional ?
const usuarios = [];
const usuario = usuarios.find((u) => u.name == 100);

console.log(usuario.nombre || "El usuario no existe"); //Error: "No se pueden leer propiedades de NULL"
console.log(usuario?.nombre || "El usuario no existe"); //"El usuario no existe" */

/* // Ejemplo 8: Uso del acceso condicional con más de un atributo (propiedad)
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const openingHours = {
        [days[3]]: {open: 12,close: 22,},
        [days[4]]: {open: 11,close: 23,},
        [days[5]]: {open: 0,close: 24,},
    };

const restaurant = {
    Name: 'Classico-Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic-Bread', 'Caprese-Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    info: [
        {id: 1, nombre: "german"},
        {id: 2, nombre: "mancilla"}
    ],

    openingHours, //openingHours: openingHours,    Ambas son lo mismo

    order: function(starterIndex, mainIndex){
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },
};

for (const res of days) {
    const open = restaurant?.openingHours[res]?.open ?? "closed";
    console.log(`On ${res}, we open at ${open}`);
}

console.log(restaurant.order ?. (0,1) ?? "Error");
console.log(restaurant.orderNew ?. (0,1) ?? "Error"); */

/* // Ejemplo 9: Object.keys(), Object.values, and Object.entries()
const objeto = {
    nombre: "Alberto",
    edad: 25,
    colorFav: "Azul",
};

const numeros = [2, 232, 342, 233, 32];

const total = numeros.reduce((valorPrevio, valorAcumulado) => valorPrevio + valorAcumulado);
console.log(total);

console.log(Object.keys(objeto));
console.log(Object.values(objeto));
console.log(Object.entries(objeto)); */

/* // Ejemplo 10: Looping Objects: Object Keys, Values, and Entries
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const openingHours = {
        [days[3]]: {open: 12,close: 22,},
        [days[4]]: {open: 11,close: 23,},
        [days[5]]: {open: 0,close: 24,},
    };

const restaurant = {
    Name: 'Classico-Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic-Bread', 'Caprese-Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    info: [
        {id: 1, nombre: "german"},
        {id: 2, nombre: "mancilla"}
    ],

    openingHours, //openingHours: openingHours,    Ambas son lo mismo

    order: function(starterIndex, mainIndex){
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },
};

const properties1 = openingHours; console.log(properties1);
const properties = Object.keys(openingHours); console.log("Object.keys()", properties);
const values = Object.values(openingHours);  console.log("Object.values()", values);
const entries = Object.entries(openingHours);  console.log("Object.entries()", entries);

let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
    openStr = openStr + `${day}, `
}
console.log(openStr);

for (const [day, {open, close}] of entries) {
    console.log(`On ${day} we open at ${open} and close at ${close}`);
} */

/* // Ejemplo 11: Desestructuración de arrays y objetos
const restaurant = {
    Name: 'Classico-Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic-Bread', 'Caprese-Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    info: [
        {id: 1, nombre: "german"},
        {id: 2, nombre: "mancilla"}
    ],
    fecharegistro: new Date(),
    poseeTaarjetaCredito: false, 
    poseeVehiculo: true,

    openingHours: {
        thu: {open: 12,close: 22,},
        fri: {open: 11,close: 23,},
        sat: {open: 0,close: 24,},
    },

    order: function(starterIndex, mainIndex){
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    orderDelivery: function({time, address, mainIndex, starterIndex}){
        return console.log(`Desestructuracion de un objecto usando funcion --> Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    },

    orderDeliveryX2: function({time="20:00", address, mainIndex=0, starterIndex=1}){
        return console.log(`Desestructuracion de un objecto usando funcion X2--> Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    }
};

const [first, , second] = restaurant.categories; 
console.log("Desestructuracion de un array: ",first, second);

const [starter, main] = restaurant.order(2,0); 
console.log("Desestructuracion usando funcion: ",starter, main);

const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested; 
console.log("Desestructuracion con Nested: ", i, j, k);

const [p=1, q=1, r=1] = [8, 9]; 
console.log("Desestructuracion con Default values: ", p, q, r);

const {Name, categories, openingHours, openingHours:{ sat }, info} = restaurant;
console.log("Desestructuracion de un objeto: ", Name, categories, openingHours, sat, info, {info}); //Deconstruimos el objeto y se crean nuevas variables, las cuales son las que estan entre los corchetes. Se debe de igualar con el nombre del objeto.


const {Name: restaurantName, categories: tags, openingHours: hours} = restaurant;
console.log("Desestructuracion de un objeto con uso del alias: ", restaurantName, tags, hours);

const { menu = [], starterMenu: starters = [] } = restaurant;
console.log("Cambiando el nombre de la variable en objeto: ", menu, starters);

let a = 111, b = 999;
const obj = {
    a: 23, b: 7, c: 14
};

({a, b} = obj);
console.log("Desestructuracion de un objeto con mutating variables: ",a, b);

const { fri: {open: x, close: y} } = openingHours;
console.log("Desestructuracion de un objeto con nested objects: ",x, y);

function desestructurar(item){
    const {Name, location} = item;
    console.log("Desestructuracion en parámetros", Name, location);
}
desestructurar(restaurant);

restaurant.orderDelivery({
    time: "22:30",
    address: "Tijuana, 22",
    mainIndex:"2", 
    starterIndex:"2"
});

restaurant.orderDeliveryX2({
    address: "Tijuana, 22",
    starterIndex:"1"
}); */

/* // Ejemplo 12: Aplicación de la desestructuración para el evento del click
window.addEventListener("click", (event) => {
    console.log(event.x, event.y);
});

window.addEventListener("click", ({ x, y }) => {
    console.log(x, y);
}); */

/* // Ejemplo 13: Uso del spread operator (...)
const nombres1 = ["Juan", "Julieta"], nombres2 = ["Carlos", "Mariela"];
const array = [...nombres1, ...nombres2]; // spread de los dos arrays dentro de otro
const nombresObjeto = {// spread del array en un objeto
    ...array,
};

console.log("--> El nuevo array es: " , array);
console.log("--> El spread de un string se define como: ", [...nombres1[0]]);
console.log("--> Si queremos agregar algo mas al array con spread, hacemos lo siguiente: ", [...array, "German"]);
console.log("--> El resultado del spread del array en un objeto es", nombresObjeto); // { '0': 'Juan', '1': 'Julieta', '2': 'Carlos', '3': 'Mariela' }
console.log("--> Acceder a una propiedad especìfica es: " + nombresObjeto["2"]);

console.log("\n");

const profile = {id_profile: 300, profile_name: "Operador", profile_created_date: new Date(), password: "123"};
const user = {id_name: 500, user_name: "Chaman", user_lastname: "Coderhouse", contact: {email: "chaman.profe@gamail.com", mobile: "1111454545"}};
const menus = {id_menus: 9, actions: ["Ver operadores", "Editar nóminas", "Otorgar permisos"]};
const userProfile = {...profile, id_profile: profile.id_profile, profile_name: profile.profile_name, password: undefined};
const allObjects = {...profile, ...user, ...menus};
console.log("--> Los datos de los objetos Perfil y Usuario", userProfile);
console.log("--> Los datos del objeto con el spread de todos los objetos es: ", allObjects);

console.log("\n");

const numeros = [4, 77, 92, 10, 3, -32, 54, 11];
console.log(Math.max(numeros)); // NaN
console.log("--> Spredading de Array: ", ...numeros, "y el Math.max es: ", Math.max(...numeros));
console.log("--> Equivalente a la anterior: ", Math.max(4, 77, 92, 10, 3, -32, 54, 11)); */

/* // Ejemplo 14: Uso de rest operator
const nuevoObjeto = {
    a: "Algo",
    b: "Otro algo",
    c: "Algo más",
};

// Rest operator
const { b, ...losDemas } = nuevoObjeto;

console.log(b);
console.log(losDemas);
console.log(losDemas.a); */

/* // Ejemplo 15: Square Brackets Javascript Object Key
const animalSounds = {cat: 'meow', dog: 'bark'};
const animal = 'lion';
const sound = 'roar';

const res1 = {
    animal: sound,
    ...animalSounds, 
};   

const res2 = {
    [animal]: sound,
    ...animalSounds, 
}; 

console.log("res1", res1); // res1 {cat: 'meow', dog: 'bark', animal: 'roar'}
console.log("res2", res2); // res2 {cat: 'meow', dog: 'bark', lion: 'roar'}
//https://stackoverflow.com/questions/32515598/square-brackets-javascript-object-key */

/* // Ejemplo 16: Rest parameters

sumar_1(10, 15, 30, 5, 13, 47, 98); // [10, 15, 30, 5, 13, 47, 98]
console.log("Res 2: ", sumar_2(10, 15, 30, 5) ) // 60

function sumar_1(...numeros) {
    console.log("Res 1: ", numeros);
}

function sumar_2(...numeros) {
    return numeros.reduce((acumulador, unProducto) => acumulador + unProducto, 0);
} */

/* // Ejemplo 17: Uso de Set
const orderSets = new Set(["res", "german", "mancilla", "chavez", "res", "ss22", "res,"])
console.log(orderSets);
console.log(orderSets.size);
console.log(orderSets.has("pizza"));
console.log(orderSets.has("german"));
orderSets.add("ps4");
orderSets.add("ps8")
orderSets.delete("res")
console.log(orderSets);

for (const order of orderSets) {
    console.log(order);
}

const staff = ["waiter", "chef", "waiter", "manager", "chef", "waiter"];
const staffUnique = [...new Set(staff)];
console.log(staffUnique); */

/* // Ejemplo 18: Uso de Map
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']).set('open', 11).set('close', 23).set(true, 'We are open :D').set(false, 'We are closed :(');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));
console.log(rest.has('categories'));
rest.delete(2);
// rest.clear();

const time = 8;
console.log(rest.get( time > (rest.get('open') && time < rest.get('close')) ));

const arr = [1, 2];
rest.set(arr, 'Test');
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size);
console.log(rest.get(arr)); */

/* // Ejemplo 19: Uso de Map con iteration

// Maps: Iteration
const question = new Map([
    ['question', 'What is the best programming language in the world?'],
    [1, 'C'],
    [2, 'Java'],
    [3, 'JavaScript'],
    ['correct', 3],
    [true, 'Correct 🎉'],
    [false, 'Try again!'],
]);         console.log(question);


openingHours = { thu: {open: 12,close: 22}, fri: {open: 11,close: 23}, sat: {open: 0,close: 24} }
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log("Convert object to map: ", hoursMap);

// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
    if (typeof key === 'number'){
        console.log(`Answer ${key}: ${value}`);
    }
}

const answer = 3;
console.log(question.get(question.get('correct') === answer));

//Convert map to array
console.log([...question]);
console.log(question.entries());

console.log([...question.keys()]);
console.log([...question.values()]); */

/* // Ejemplo 21: Split and join
console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schmedtmann'.split(' '));

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
    const names = name.split(' ');
    const namesUpper = [];

    for (const n of names) {
        namesUpper.push(n[0].toUpperCase() + n.slice(1));
        namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
    }
    console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann'); */

/* // Ejemplo 22: Padding
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
    const str = number + ""; // Lo que esta a la derecha de number es para convertir el dato de tipo numero a string.
    const last = str.slice(-4);
    const res = last.padStart(str.length, '*');
    return res;
};

console.log(maskCreditCard(64637836));
console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard('334859493847755774747')); */

/* // Ejemplo 23: Repeat
const message2 = 'Bad waether... All Departues Delayed... ';
console.log(message2.repeat(3));

const planesInLine = function (n) {
    console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
};

planesInLine(5);
planesInLine(3);
planesInLine(12); */

/* // Ejemplo 24: Working With Strings - Part 1
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('portugal'));

console.log(airline.slice(4));
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat 😬');
  else console.log('You got lucky 😎');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('jonas'));
console.log(typeof new String('jonas'));

console.log(typeof new String('jonas').slice(1)); */

/* // Ejemplo 25: Working With Strings - Part 2

const airline = 'TAP Air Portugal';

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnAS'; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement = 'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate'));
// console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate'));

// Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Airb'));

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
    console.log('Part of the NEW ARirbus family');
}

// Practice exercise
const checkBaggage = function (items) {
    const baggage = items.toLowerCase();

    if (baggage.includes('knife') || baggage.includes('gun')) {
        console.log('You are NOT allowed on board');
    } else {
        console.log('Welcome aboard!');
    }
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection'); */

/* // Ejemplo 26: Working With Strings - Part 3

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const flights = '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';


// console.log(flights.split("+"));
for (const iter of flights.split("+")) {
    // console.log(iter.split(";"));
    const [type, from, to, time] = iter.split(";");
    const output = `${type.startsWith('_Delayed') ? '🔴' : ""} ${type.replaceAll("_", " ")} from ${getCode(from)} to ${getCode(to)} (${time.replace(":", "h")})`.padStart(45);
    console.log(output);
}

function getCode(str){
    return str.slice(0, 3).toUpperCase();
} */

/* // Ejemplo 27: Exercise for Data Structures, Modern Operators and Strings (1)
// Suppose we get data from a web service about a certain game ('game' variable on next page). In this challenge we're gonna work with that data. Your tasks:

const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        ['Neuer','Pavard','Martinez','Alaba','Davies','Kimmich','Goretzka','Coman','Muller','Gnarby','Lewandowski'],
        ['Burki','Schulz','Hummels','Akanji','Hakimi','Weigl','Witsel','Hazard','Brandt','Sancho','Gotze']
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski','Hummels'],
    date: 'Nov 9th, 2017',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    }
    
};

//1. Create one player array for each team (variables 'players1' and'players2')
const [players1,players2] = game.players;       //console.log(players1, players2);

//2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
const [gk, ...fieldPlayers] = players1;         //console.log(gk, fieldPlayers);

//3. Create an array 'allPlayers' containing all players of both teams (22 players)
const allPlayers = [...players1, ...players1];  //console.log(allPlayers);

//4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
const players1Final = ['Thiago', 'Coutinho', 'Perisic', ...players1]; //console.log(players1Final);

//5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
const {team1, x:draw, team2} = game.odds;   //console.log(team1, draw, team2);

//6. Write a function ('printGoals') that receives an arbitrary number of player names (not an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
function printGoals(...players){ //Debemos desestructurar lo que mandamos a esta funcion tambien porque, al ser 4 elementos los que recibe, y si no hacemos eso, entonces unicamente se enviara el primer elemento y no los demas. 
    //console.log(players, "and "+ `${players.length}` + " goals were scored");
}
printGoals(...game.scored);

//7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, without using an if/else statement or the ternary operator. 
let res = game.team2 > game.team1 && "Team 2 is more likely to win!!";  //console.log(res);
let res2 = game.team2 < game.team1 && "Team 1 is more likely to win!!";  //console.log(res2);

//8. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
for (const [i, player] of game.scored.entries()) {
    //console.log(`Goal ${i + 1}: ${player}`);
}

//9. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
let average = 0;
for (const odd of Object.values(game.odds)) {
    average = average + odd/3;
}
//console.log(average);

//10. Print the 3 odds to the console, but in a nice formatted way, exactly like this: Odd of victory Bayern Munich: 1.33, Odd of draw: 3.25, Odd of victory Borrussia Dortmund: 6.5
//    Get the team names directly from the game object, don't hardcode them (except for "draw"). Hint: Note how the odds and the game objects have the same property names
for (const [team, odd] of Object.entries(game.odds)) {
    let res = ( team === "x" ? "draw" : ("victory "+ game[team]) ); // team retorna un string, en este caso, sera team1 y team2. Pero, al ser ambos de tipo STRING, quiere decir que vienen de esta forma "team1" y "team2". Por eso al final queda game[team], si necesidad de poner los "".
    //console.log(`Odd of ${res}: ${odd}`);
}

//11. Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value: { Gnarby: 1, Hummels: 1, Lewi: 2}
const scorers = {};
for (const player of game.scored) {
    scorers[player] ? scorers[player]++ : (scorers[player] = 1);//En la primer y segunda iteracion no existe nada. No es hasta la tercera iteracion cuando ahi se repite "Lewandowski", por lo que ahora en este caso, se le suma 1.
};      //console.log(scorers);

const gameEvents = new Map([
    [17, '⚽ GOAL'],
    [36, '↩️ Substitution'],
    [47, '⚽ GOAL'],
    [61, '↩️ Substitution'],
    [64, '🟨 Yellow card'],
    [69, '🟥 Red card'],
    [70, '↩️ Substitution'],
    [72, '↩️ Substitution'],
    [76, '⚽ GOAL'],
    [80, '⚽ GOAL'],
    [92, '🟨 Yellow card'],
]);


// 12. Create an array 'events' of the different game events that happened (no duplicates)
const events = new Set((gameEvents.values()));   console.log(events);

// 13. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
gameEvents.delete(64);   console.log(gameEvents.values());

// 14. Compute and log the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
console.log(`An event happened, on average, every ${(90/gameEvents.size)} minutes`);
const des = [...gameEvents.keys()].pop();

// 15. Loop over 'gameEvents' and log each element to the console, marking whether it's in the first half or second half (after 45 min) of the game: [FIRST HALF] 17: ⚽ GOAL
for (const [key, value] of gameEvents) {
    console.log( key < 45 ? `[FIRST HALF] ${key + ": " + value}` : `[SECOND HALF] ${key + ": " + value}` );
} */

/* // Ejemplo 28: Exercise for Data Structures, Modern Operators and Strings (2)
// Write a program that receives a list of variable (SEE BELOW) names written in underscore_case and convert them to camelCase.

// underscore_case
//  first_name
// Some_Variable
//   calculate_AGE
// delayed_departure

// Should produce this output (5 separate console.log outputs):
// underscoreCase    ✅
// firstName         ✅✅
// someVariable      ✅✅✅
// calculateAge      ✅✅✅✅
// delayedDeparture  ✅✅✅✅✅

// Hints:
// § Remember which character defines a new line in the textarea
// § The solution only needs to work for a variable made out of 2 words, like a_b
// § Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 


document.body.append(document.createElement('textarea'));

let btn = document.createElement("button");
btn.innerHTML = "Click Me";
document.body.append(btn);

document.querySelector("button").addEventListener("click", function(){
    const text = document.querySelector("textarea").value;
    const rows = text.split("\n");

    for (const [i, iter] of rows.entries()) {
        let [first, second] = iter.toLowerCase().trim().split("_");
        let output = `${first}${second.replace(second[0], second[0].toUpperCase())}`;
        console.log(`${output.padEnd(20, " ")}${"✅".repeat(i + 1)}`);
    }
}); */


//         $$$$$$$$$$$$$$$ Numbers, dates, Intl and timers $$$$$$$$$$$$$$$


/* //Ejemplo 1: Conversion, Parseo y verificar si es un numero, indefinido o infinito
//Convertion
console.log(Number("23"));
console.log(+"23");
console.log(parseInt("23"));

//Parsing
console.log("\n");
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e23', 10));
console.log(Number.parseInt('  2.5rem  '));
console.log(Number.parseFloat('  2.5rem  '));

// Check if value is NaN
console.log("\n");
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(23 / 0));

// Checking if value is number
console.log("\n");
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20X'));
console.log(Number.isFinite(23 / 0));

// Checking if value is number
console.log("\n");
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0)); */

/* //Ejemplo 2: Acceso a propiedades del objeto Math, y metodo Min y Max. 
console.log("--> euler: "+ Math.E);
console.log("--> pi: "+ Math.PI);
console.log("--> sqrt: "+ Math.sqrt(25));
console.log("--> sqrt: "+ 25**(1/2));

const numeros = [55, 13, -25, 93, 4]; 
console.log("Los numeros SIN spread son: ",numeros);
console.log("Los numeros CON spread son: ",...numeros); //... pasan de un array a cada numero separado de manera individual
const minimo = Math.min(...numeros); 
const maximo = Math.max(...numeros);
console.log("El menor es: ", minimo);
console.log("El mayor es: ", maximo); */

/* //Ejemplo 3: Use of numeric separators
const diameter = 287_460_000_000;// 287,460,000,000
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.1415;
console.log(PI);

console.log(Number('230_000'));   //NaN
console.log(parseInt('230_000')); //230000 */

/* //Ejemplo 4: Aplicacion para metodo de redondeo con ceil, floor, round y Aplicacion para metodo de raiz cuadrada
console.log(Math.ceil(.95));   // Expected output: 1
console.log(Math.ceil(4));     // Expected output: 4
console.log(Math.ceil(7.004)); // Expected output: 8
console.log(Math.ceil(-7.004));// Expected output: -7

console.log("\n");

console.log(Math.trunc(20.49));  // Expected output: 20
console.log(Math.trunc(20.50));  // Expected output: 20
console.log(Math.trunc(-20.50)); // Expected output: -20
console.log(Math.trunc(-20.51)); // Expected output: -20

console.log("\n");

console.log(Math.floor(.95));    // Expected output: 0
console.log(Math.floor(4));      // Expected output: 4
console.log(Math.floor(7.004));  // Expected output: 7
console.log(Math.floor(-7.004)); // Expected output: -8

console.log("\n");

console.log(Math.round(20.49));   // Expected output: 20
console.log(Math.round(20.50));   // Expected output: 21
console.log(Math.round(-20.50));  // Expected output: -20
console.log(Math.round(-20.51));  // Expected output: -21

console.log("\n");

console.log(+Math.sqrt(9).toFixed(4));
console.log(+Math.sqrt(2).toFixed(6));
console.log(+(2.7).toFixed(0));
console.log(+(2.345).toFixed(2)); */

/* //Ejemplo 5: Uso del metodo random para la generacion de numeros psudo-aleatorios, entre [0, 1), entre [0, limite) y entre [limiteInferior, limiteSuperior).

for (let i = 0; i < 5; i++) {
    console.log(Math.random());
}

console.log("\n");

for (let i = 0; i < 5; i++) { 
    console.log(Math.random()*10);
}

console.log("\n");

let limiteInferior = parseInt(0); 
let limiteSuperior = parseInt(10);

for (let i = 0; i < 5; i++) {
    const x = generateRandomNumber(limiteInferior, limiteSuperior);
    console.log(x);
}

function generateRandomNumber (limiteInferior, limiteSuperior){
    return Math.trunc(Math.random()*(limiteSuperior-limiteInferior) + 1) + limiteInferior;  // De 1 a 10
    //return Math.trunc(Math.random()*(limiteSuperior-limiteInferior) + limiteInferior);    // De 0 a 9
} */

/* //Ejemplo 6: Ejercicio de creacion de numeros aleatorios
// Crear un proyecto de node que genere 10000 números aleatorios en un rango de 1 a 20.
// Crear un objeto cuyas claves sean los números salidos y el valor asociado a cada clave será la cantidad de veces que salió dicho número. Representar por consola los resultados.
const objeto = {};

for (let i = 0; i < 10000; i++) {
    const numAleatorio = Math.trunc(Math.random()*20) + 1;
    objeto[numAleatorio] ? objeto[numAleatorio]++ : objeto[numAleatorio] = 1;
}

console.log(objeto); */

/* //Ejemplo 7: Uso de BigInt
console.log(2 ** 53 - 1); //The biggest number in JS
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1); //This numbers and the next three are unstable ones and must not be used.
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(4838430248342043823408394839483204n);
console.log(BigInt(48384302));

// Operations
console.log(10000n + 10000n);
console.log(36286372637263726376237263726372632n * 10000000n);
// console.log(Math.sqrt(16n));

const huge = 20289830237283728378237n;
const num = 23;
console.log(huge * BigInt(num));

// Exceptions
console.log(20n > 15);
console.log(20n === 20);
console.log(typeof 20n);
console.log(20n == '20');

// Divisions
console.log(11n / 3n); //It shows only the integer.
console.log(11 / 3);   //It shows the number with decimals. */

/* //Ejemplo 8: Obtener la fecha y hora actuales. Creacion de instancias de objetos Date con la clase date con fechas personalizadas. Y obtener datos de las fechas en formato STRING.
let fechaActual = new Date();  console.log("La fecha actual del sistema es: ", fechaActual);
let fecha1 = new Date(2023, 3, 22);  console.log("La fecha actual del sistema es: ", fecha1);
let fecha2 = new Date(2023, 11, 24, 23, 59, 59);  console.log("La fecha actual de navidad es: ", fecha2); 
let fecha3 = new Date("Aug 02 2023 18:05:41" );  console.log("La fecha actual de navidad es: ", fecha3); 
let fecha4 = new Date("December 17, 2021" ); console.log("La fecha actual de navidad es: ", fecha4); 

console.log("\n", "Los valores singulares de la fecha de navidad son: ",{
    year: fecha2.getFullYear(),
    month: fecha2.getMonth(),
    date: fecha2.getDate(), 
    week: fecha2.getDay(),
    hour: fecha2.getHours(),
    minute: fecha2.getMinutes(),
    second: fecha2.getSeconds(),
    isoString: fecha2.toISOString(),
    time: fecha2.getTime()
});

//Obtener los datos de las fechas en cadenas de texto (STRING)
console.log("\n"+ "toDateString: ", fechaActual.toDateString());
console.log("toLocalString: ", fechaActual.toLocaleString());
console.log("toLocalDateString: ", fechaActual.toLocaleDateString());
console.log("toTimeString: ", fechaActual.toTimeString());
console.log("toLocaleTimeString: ", fechaActual.toLocaleTimeString());

//Creamos una nueva fecha, y despues logeamos esa fecha sin necesidad de poner "new"
console.log("\n"+ new Date(1690259566417));
console.log(Date.now());

//Convertir una fecha a numero
const future = new Date(2037, 10, 19, 15, 23);
console.log("\n"+"La fecha convertida en milisegundos es: "+ (+future));

//Calcular la diferencia entre 2 fechas (diferencia = fechaSuperior - fechaInferior)
let fechaMiCumple = new Date(2024, 3, 22);
let hoy = new Date();
const diferencia = fechaMiCumple - hoy; // Marca de timempo (milisegundos)
const milisegundosPorDia = 86400000;    // 86400000mS = 86400s = 1440min = 24h
console.log("\n"+ "--> La diferencia de fechas entre hoy y mi cumpleanos es: " + Math.round((diferencia/milisegundosPorDia))); */

/* //Ejemplo 9: Internationalizing Dates (Intl)
const now = new Date();
const options = {
    hour:"numeric",
    minute: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long"
}

const locale = navigator.language;
const res = new Intl.DateTimeFormat(locale, options).format(now);
// const res = new Intl.DateTimeFormat("pt-PT", options).format(now);
console.log(res); */

/* //Ejemplo 10: Internationalizing Numbers (Intl)
const num = 3884764.23;

const options = {
    style: 'currency',
    unit: 'celsius',
    currency: 'EUR',
    // useGrouping: false,
};

console.log('US:      ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria:   ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(navigator.language,new Intl.NumberFormat(navigator.language, options).format(num)); */


//         $$$$$$$$$$$$$$$ DOM & EVENTS $$$$$$$$$$$$$$$


/* //Ejemplo 1: Acceso a la variable global document y sus propiedades
console.log("Cual es nuestro documento? ", document.documentElement);
console.log("Cual es nuestro body? ", document.body);
console.log("Cual es nuestro head? ", document.head); */

/* //Ejemplo 2: Obtener un elemento del HTML a partir de su id, clase o etiqueta HTML. Y tambien acceder a un elemento con el querySelector y querySelectorAll
console.log("Acceder a un elemento con el querySelector", document.querySelector("#formulario_HTML .mb-3"));
console.log("Acceder a un elemento con el querySelectorAll", document.querySelectorAll("#formulario_HTML .mb-3"));
console.log("Obtener un elemento del HTML a partir de su id: ", document.getElementById("bienvenida"));
console.log("Obtener un elemento del HTML a partir de su clase: ",document.getElementsByClassName("texto"));
console.log("Obtener un elemento del HTML a partir de su etiqueta HTML: ", document.getElementsByTagName("p")); */

/* //Ejemplo 3: Recorrer una coleccion de nodos devueltos por alguna query
let items = document.getElementsByTagName("h1");
console.log("Los elementos de nuestra pagina que estan fabricados a partir de la etiqueta h1 son: ",items);

for (const unItem of items) {
    console.log("--> ", unItem);
} */

/* //Ejemplo 4: Como modificamos el contenido del texto de un nodo
let frase_obtenida = "Hola, bienvenidos a la clase de Javascript 😈";
let nodo = document.getElementById("titulo");
console.log("El texto original que modificaremos es: ", document.getElementById("titulo").innerText);
nodo.innerText = frase_obtenida;

document.getElementById("subtitulo").className = "coloreado";
document.getElementById('frase').classList.add('coloreadoX2');

document.getElementById("subtitulo").innerHTML = "<strong>Hola soy german!!</strong>";
document.getElementById("frase").innerText = "Hola";
document.getElementById("bienvenida").textContent = "Adios"; */

/* //Ejemplo 5: Crear una lista de elementos a partir del contenido de un array y luego eliminar nodos
let paises = ["Argentina", "Brazil", "Mexico", "Peru", "Suecia"];

let nodoPaises = document.getElementById("paises"); //Obtenemos el elemento "paises" del HTML
nodoPaises.innerHTML = ""; //Al dejar las comillas vacias, se borra el contenido del elemento "paises" en el HTML.

for (const unPais of paises) {
    let nuevoItem = document.createElement("li"); //Creamos un elemento "li" para el elemento "ul" del HTML
    nuevoItem.innerText = unPais; //Le agregamos el nombre que se encuentra en la posicin "unPais". Que va desde "Argentina" hasta "Suecia".
    nodoPaises.append(nuevoItem); //Una vez que creamos el nuevo elemento "li", es importante AGREGARLO, ya que unicamente lo creamos en la linea anterior.
}

let paisesRecuperados = document.querySelector("li");
console.log("-->", paisesRecuperados);
paisesRecuperados[2].remove(); */

/* //Ejemplo 6: Creacion de un elemento HTML en JS, añadicion de nodos en determinada posicion, y eliminacion de nodos.
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookied for improved functionality and analytics. <button class="res">Got it!</button>';
const body = document.querySelector('body');
body.append(message);                 //Sirve para colocar el nodo al final
// body.append(message.cloneNode(true)); //Sirve para duplicar el nodo y colocarlo debajo del principal
// body.prepend(message);                //Sirve para colocar el nodo al inicio
// body.after(message);                  //Cumple la misma funcion que body.append(message)
// body.before(message);                 //Cumple la misma funcion que body.prepend(message)

document.querySelector('.res').addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
}); */

/* //Ejemplo 7: Escribir dentro de los inputs a travez del .value
document.getElementById("nombres").value = "Cual es tu nombre?";
document.getElementById("apellidos").value = "Cual es tu apellido?"; */

/* //Ejemplo 8: Uso de plantillas
const producto = {id: 1001, nombre: "Carne asada", precio: 140};

//Creamos un elemento div 
let contenedor = document.createElement("div");

//Definimos el innerHTML del elemento con una plantilla de texto
contenedor.innerHTML = `<h3> ID: ${producto.id}</h3>
                        <p> Producto: ${producto.nombre}</p>
                        <b> $ ${producto.precio}</b>`;

//Agregamos el contenedor creado al body
document.body.appendChild(contenedor);

//Formas de concatenar o mostrar en pantalla
let concatenado = "id: "+ producto.id+" - Nombre: "+ producto.nombre + " - precio: $"+ producto.precio;   console.log("Concatenado", concatenado);
let plantilla = `id: ${producto.id} - Nombre: ${producto.nombre} - Precio: $${producto.precio}`;          console.log("Plantilla  ", plantilla);  */

/* //Ejemplo 9: Agregar un elemento con estilizado
//METODO 1
const producto1 = {id: 1001, nombre: "Carne asada", precio: 140};
let contenedor1 = document.createElement("div");
contenedor1.style.marginTop = "50px";
contenedor1.style.marginBottom = "50px";
contenedor1.style.padding = "40px";
contenedor1.style.borderRadius = "20px";
contenedor1.style.background = "rgb(1, 135, 108)";
contenedor1.style.color = "rgb(250, 255, 255)";
contenedor1.style.opacity = "0.8";
contenedor1.innerHTML = `<h3> ID: ${producto1.id}</h3><p> Producto: ${producto1.nombre}</p><b> $ ${producto1.precio}</b>`;
contenedor1.className = 'border pad';
document.getElementById("main").append(contenedor1); //append coloca el hijo hasta el final, mientras que el prepend coloca el hijo hasta el inicio.
// document.body.appendChild(contenedor1);


//METODO 1.2
const producto2 = {id: 1001, nombre: "Carne asada", precio: 140};
let contenedor2 = document.createElement("div");
contenedor2.classList.add("res");
// contenedor2.textContent = "Hello world!";
contenedor2.innerHTML = `<h3> ID: ${producto2.id}</h3><p> Producto: ${producto2.nombre}</p><b> $ ${producto2.precio}</b>`;
contenedor2.className = 'border pad';
document.getElementById("main").append(contenedor2); //append coloca el hijo hasta el final, mientras que el prepend coloca el hijo hasta el inicio.
// document.body.appendChild(contenedor2);


// METODO 2.1
document.addEventListener('DOMContentLoaded', function() {
    const producto3 = {id: 1001, nombre: "Carne asada", precio: 140};
    let contenedor3 = document.createElement("div");
    contenedor3.style.marginTop = "50px";
    contenedor3.style.marginBottom = "50px";
    contenedor3.style.padding = "40px";
    contenedor3.style.borderRadius = "20px";
    contenedor3.style.background = "rgb(1, 135, 108)";
    contenedor3.style.color = "rgb(250, 255, 255)";
    contenedor3.style.opacity = "0.8";
    contenedor3.innerHTML = `<h3> ID: ${producto3.id}</h3><p> Producto: ${producto3.nombre}</p><b> $ ${producto3.precio}</b>`;
    contenedor3.className = 'border pad';
    document.getElementById("main").append(contenedor3); //append coloca el hijo hasta el final, mientras que el prepend coloca el hijo hasta el inicio.
    // document.body.appendChild(contenedor3);
}, true);


// METODO 2.2
document.addEventListener('DOMContentLoaded', function() {
    const producto4 = {id: 1001, nombre: "Carne asada", precio: 140};
    let contenedor4 = document.createElement("div");
    contenedor4.classList.add("res");
    // contenedor4.textContent = "Hello world!";
    contenedor4.innerHTML = `<h3> ID: ${producto4.id}</h3><p> Producto: ${producto4.nombre}</p><b> $ ${producto4.precio}</b>`;
    contenedor4.className = 'border pad';
    document.getElementById("main").append(contenedor4); //append coloca el hijo hasta el final, mientras que el prepend coloca el hijo hasta el inicio.
    // document.body.appendChild(contenedor4);
}, true); */

/* //Ejemplo 10: Agregar eventos a un nodo mediante el addEventListener y mediante la propiedad con el evento necesario

// METODO 1.1
const btnInscribir = document.getElementById("btnInscribir");
btnInscribir.addEventListener("click", function() {
    console.log("Hola");
});

//METODO 1.2
function saludar() {
    console.log("Hola, bienvenido!")
}
const btnInscribir = document.getElementById("btnInscribir");
btnInscribir.addEventListener("click", saludar);

//METODO 2.1
const btnInscribir = document.getElementById("btnInscribir");
btnInscribir.onclick = function() {
    console.log("Hola, bienvenido!")
};

// METODO 2.2
function saludar() {
    console.log("Hola!")
}
const btnInscribir = document.getElementById("btnInscribir");
btnInscribir.onclick = function(){
    saludar();
} */

/* //Ejemplo 11: Agregar eventos a un nodo mediante el atributo de evento de la etiqueta (No es recomendable usar en proyectos de produccion)
//Esto va en el HTML, dentro del form (Esto va en el HTML, NO en el documento .js)
//<button type="button" class="btn btn-primary" id="btnInscribir" onclick="alert('Hola Mundo!');">Inscribir</button> */

/* //Ejemplo 12: Agregar a un nodo el evento del movimiento del mouse, los eventos de keydown y keyup para un input, el evento change y el evento input.

//Uso del mousemove
const title = document.getElementsByTagName("h1")[0]; //[0] representa el numero de los h1 que se encuentran en el HTML. Como en este caso solo hay uno, entonces inicializa en 0 y asi sucesivamente, dependiendo del tipo de etiqueta que estemos utilizando.
console.log("--> H1", title);
title.addEventListener("mousemove",() => {
    console.log("--> El mouse se esta moviendo sobre el titulo de la pagina <--")
});

//Uso del mouseenter
const title2 = document.querySelector("h1");
const res = function(evento){
    alert("--> El mouse se esta moviendo solo una vez <--");
}

title2.addEventListener("mouseenter", res);
setTimeout(() => title2.removeEventListener("mouseenter", res), 3000);

//Uso del keydown
const input1 = document.getElementById("apellidos");  //Agregar a un nodo los eventos de keydown y keyup para un input.
input1.addEventListener("keydown",() => {
    console.log("--> La tecla bajo <--")
})

//Uso del keyup
input1.addEventListener("keyup",() => {
    console.log("--> La tecla subio <--")
})

//Uso del change
const input2 = document.getElementById("nombres"); //Agregar a un nodo el evento change.
input2.addEventListener("change",() => {
    console.log("--> El valor del input cambio <--", input2.value);
    input2.value = input2.value.trim();
});

//Uso del input
const input3 = document.getElementById("correo"); //Agregar a un nodo el evento change (Simulando un keylogger).
input3.addEventListener("input",() => {
    console.log("--> Ejecutaste el evento INPUT <--");
}); */

/* //Ejemplo 13: uso del evento submit para validar los inputs de un formulario.

//Para agregar opciones al select HTML del HTML cuando presionemos el recuadro.
class Ocupacion {
    constructor(numero, name) {
        this.numero = numero;
        this.nombre = name;
    }
}

const ocupaciones = [
    new Ocupacion(1, "Estudiante"),
    new Ocupacion(2, "Docente"),
    new Ocupacion(3, "Desarrollador"),
    new Ocupacion(4, "Administrador de proyectos"),
];

let ocupacionList = document.getElementById("ocupacion");

ocupaciones.forEach((unaOcupacion) => {
    let item = document.createElement("option");
    item.value = unaOcupacion.numero.toString();
    item.innerText = unaOcupacion.nombre;
    ocupacionList.append(item);
});

class Participante { //Uso de eventos para rellenar los espacios en blanco y desplegar la informacion
    constructor(numero, apellido, nombre, ocupacion, correo, quiereBoucher = false) {
        this.numero = numero;
        this.apellido = apellido;
        this.nombre = nombre;
        this.ocupacion = ocupacion;
        this.correo = correo;
        this.quiereBoucher = quiereBoucher;
    }
}

let participantes = [];

const formulario = document.getElementById("formulario_HTML");      console.log(formulario);
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();          //Cancelamos el comportamiento del evento
    validarFormulario(evento.target); //.target sirve para pasar el conjunto de items, elementos, componentes, inputs que tenga nuestro formulario dentro que contenga info
});                                   //Es decir, se accede a los elementos del formulario a donde pertenete submit y NO a informacion del submit. O sea, el objeto que "disparo" o "activo el evento."

function validarFormulario(data) {
    // console.log("--> Validando formulario", data); //Recivimos el conjunto de elementos, items, etc. recividos de la linea 1331 y despues los imprimimos.
    // const hijos = data.children; //Asignamos los elementos del formulario a una nueva variable. En ella se encuentran 4 divs, el form-check y el btnInscribir
    // console.log("--> Que hay dentro de children", hijos);

    // for (let i = 0; i < 4; i++) {
    //     const unHijo = hijos[i]; //Asignamos individualmente los elementos del formulario a una nueva variable para despues acceder a sus hijos. (En este caso, solo queremos tomar en cuenta los primros 4 elementos, que son 4 divs)
    //     const valor = unHijo.children[1].value; //Colocamos [1].value porque es donde se encuentra el label que queremos mostrar de los 4 divs del formulario, y despues guardamos ese elemento (hijo) en una nueva variable. En este caso. Son puros input's y el contenido que escribimos en ellos.
    //     console.log("--> El valor almacenado en el input " + unHijo.children[0].innerText + " es: " ,{valor}); //unHijo.children[0].innerText muestra la primer posicion que pertenece al label en cada div, y entonces al poner innerText, mostamos el nombre que le asignamos a cada uno entre los > <.
    // }

    // Recuperaremos de cada uno de los inputs, el valor que ingreso/selecciono el usaurio
    const apellidos = document.getElementById("apellidos").value;     console.log("Apellidos: "+ apellidos);
    const nombres = document.getElementById("nombres").value;         console.log("Nombres: "+ nombres);
    const ocupacion = document.getElementById("ocupacion").value;     console.log("Ocupacion: "+ ocupacion);
    const correo = document.getElementById("correo").value;           console.log("Correo: "+ correo);
    const participar = document.getElementById("participar").checked; console.log("Participar: "+ participar);// Mediante la propiedad checked accedemos al valor booleano true/false que representa si el radiobutton o el checkbox fue "tildado/seleccionado"

    // Instanciamos la creacion de un objeto con la forma de un Participante
    const unaOcupacion = ocupaciones.find((evento) => evento.numero.toString() === ocupacion);                         console.log("unaOcupacion", unaOcupacion);
    const unParticipante = new Participante(participantes.length+1,apellidos,nombres,unaOcupacion,correo,participar);  console.log("--> Un participante a ser anadido", unParticipante);

    // Anadimos un elemento a la lista de aprticipantes (aun no incorporamos un control sobre existentes o similar)
    participantes.push(unParticipante);           console.log("--> Que elementos posee mi array de participantes",participantes);

    // Pintar la lista en la interfaz de usuario (solo para demostrar en la interfaz el cambio anadido -- profundizaremos este tema a medida que avanzamos con las clases.)
    let lista = document.getElementById("listaParticipantes");
    lista.innerHTML = ""; //Borramos el innerHTML de 'lista' colocando las comillas vacias para limpiar su contenido.
    participantes.forEach((individual) => {
        let item = document.createElement("p");
        item.innerText = individual.apellido + ", " + individual.nombre;
        lista.append(item);
    });

    // Limpiar todos y cada uno de los inputs
    document.getElementById("apellidos").value = "";
    document.getElementById("nombres").value = "";
    document.getElementById("ocupacion").value = "0";// el valor de este por default es 0 porque es la primera opciOn del combo de selecciOn
    document.getElementById("correo").value = "";
    document.getElementById("participar").value = "off";// para bootstrap --> on: true y off: false 
} */


/* //Ejemplo 14: Finding coordenates and position, and use of scroll
btnScrollTo.addEventListener("click", function(evento){
    const s1coords = section1.getBoundingClientRect(); 
    console.log("Section position: ", s1coords);                              //Representa la posicion de la seccion
    console.log("Learn more botton position: ", evento.target.getBoundingClientRect()); //Representa la posicion del boton "learn more"
    console.log("Current scroll (X/Y): ", window.scrollX, window.scrollY);
    console.log("Height/width viewport: ", document.documentElement.clientHeight, document.documentElement.clientWidth);
    
    //Scrolling (method 1)
    // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY);

    //Scrolling (method 2)
    // window.scrollTo({
    //     left: s1coords.left + window.scrollX, 
    //     top: s1coords.top + window.scrollY,
    //     behavior: "smooth"
    // });

    //Scrolling (method 3)
    section1.scrollIntoView({behavior: "smooth"});
}); */

/* //Ejemplo 15: Creating and inserting elements, use of styles atributes, non-standard and classes
// Creating and inserting elements
const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
    message.parentElement.removeChild(message);
});


// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.height = Number.parseInt(getComputedStyle(message).height, 10) + 50 + 'px'; //El segundo elemento en parseInt representa el radix (base del sistema numerico, en este caso 10 es decimal)
console.log(message.style.color);
console.log(message.style.backgroundColor);
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

document.documentElement.style.setProperty("--color-primary", "orange");


// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);
logo.alt = 'Beautiful minimalist logo';

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes
logo.clasName = 'jonas'; // Don't use because this will override all the existing classes and it will allow us only put one class on any element.*/

/* //Ejemplo 16: Use and difference between target and currentTarget
function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(){
    return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`
}

//En el HTML, estos tres querySelector que tiene el nav, nav__links y nav__link, esan agrupados en ese orden de arriba hacia abajo (O sea, un arbol). Si presiono el elemento padre (nav), unicamente se ejecutara ese evento, pero si ejecuto el ultimo (nav__link), se ejecutaran los 3 eventos ya que debe pasar por sus elementos anteriores para llegar hasta ese ultimo evento.
//Recordar que en un EventListener el this siempre apunta al elemento en el cual se adjunta ese EventListener.
//Para el caso de los target y currentTarget, se puede apreciar la diferencia cuando se hace click en los elementos hijos. Por ejemeplo. Si presiono el nav, no habra ninguna diferencia ya que es el elemento padre. Pero si presionamos nav__links, los target y currentTarget de este hijo seran los mismos, mientras que, en cuando ahora se ejecute el nav, el target seguira siendo el mismo ejecutado en el nav__links, pero en el currentTarget ahi si tomara el target actual, o sea, el del nav.
document.querySelector('.nav').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV e.target: ', e.target);
    console.log('NAV e.currentTarget: ', e.currentTarget);
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor(); 
    console.log('CONTAINER e.target: ', e.target, );
    console.log('CONTAINER e.currentTarget:', e.currentTarget);
});

document.querySelector('.nav__link').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor(); 
    console.log('LINK e.target: ', e.target);
    console.log('LINK e.currentTarget: ', e.currentTarget);

    // console.log(e.currentTarget === this);
    // e.stopPropagation();
}); */

/* //Ejemplo 17: Page navigation, uso de scrollIntoView y diferencia entre usar this y target en addEventListener.
//Metodo 1 (Esto es una mala practica cuando existen muchos elementos, porque tenemos muchas copias de la misma callback function, lo cual hara que la pagina sea mas lenta)
// document.querySelectorAll(".nav__link").forEach(function(evento){
//     evento.addEventListener("click", function(iter){
//         iter.preventDefault();

//         //Aqui usamos this en este addEventListener porque, estamos trabajando directamente con cada link (nav__link) por medio del foreach, por lo que, el this representa el elemento actual en el que se esta trabajando al precionar el boton
//         const id = this.getAttribute("href"); //Retorna unicamente el nombre del atriuto contenido en esa etiqueta. Si usamos const id = this.href, entonces tendremos el link completo que aparece en la barra de navegacion
//         document.querySelector(id).scrollIntoView({behavior: "smooth"});
//     })
// })

//Metodo 2
document.querySelector(".nav__links").addEventListener("click", function(evento){
    evento.preventDefault();

    //Aqui usamos evento.target porque en este caso estamos utilizando el <ul> como elemento padre, y sus hijos son <li> y <a>. Ahora, con el addEventListener podemos hacer click en el elemento padre o incluso sus hijos y JS ejecutara la tarea deseada. Si usamos this como en el metodo 1, este solo funcionara para elelemento actual o el padre, es decir <ul>.
    if (evento.target.classList.contains("nav__link")) {
        const id = evento.target.getAttribute("href"); //Retorna unicamente el nombre del atriuto contenido en esa etiqueta. Si usamos const id = this.href, entonces tendremos el link completo que aparece en la barra de navegacion
        document.querySelector(id).scrollIntoView({behavior: "smooth"});
    }
}); */

/* //Ejemplo 18: Use of childNodes, children, firstElementChild, lastElementChild, parentNode, parentElement and closest.
const h1 = document.querySelector("h1");

// Going downwards: child
console.log("h1.querySelectorAll('.highlight')", h1.querySelectorAll(".highlight")); //Muestra todos los hijos de h1 con el nombre highlight
console.log("h1.childNodes", h1.childNodes); // Retorna una lista de nodos de los nodos hijos de un elemento. En este caso, los hijos de h1. (Casi no se usa)
console.log("h1.children", h1.children); //Retorna una coleccion HTML de los elementos hijos de un elemento y solo funciona para hijos directos. En este caso, los elementos de h1. (Se usa mucho)
h1.firstElementChild.style.color = 'white'; //Este se usa para recuperar (y/o modificar) el primer elemento hijo.
h1.lastElementChild.style.color = 'orangered'; //Este se usa para recuperar (y/o modificar) el ultimo elemento hijo.

// Going upwards: parents (parentNode y parentElement nos permiten acceder al elemento del elemento que estamos usando. En este caso, <div class="header__title"> es padre de h1.)
console.log("h1.parentNode", h1.parentNode);  
console.log("h1.parentElement", h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)'; //closese() se usa para seleccionar el elemento mas cercano a h1, por lo general es lo inverso al querySelector, ya que en lugar de buscar los elementos hijos, este busca los elementos padres.
console.log(h1.closest('.header'));

h1.closest('h1').style.background = 'var(--gradient-primary)';
console.log(h1.closest('h1'));

// Going sideways: siblings
console.log(h1.previousElementSibling); //Returns the previous element at the same node tree level
console.log(h1.nextElementSibling); //Returns the next element at the same node tree level
console.log(h1.previousSibling); //Returns the previous node at the same node tree level
console.log(h1.nextSibling); //Returns the next node at the same node tree level
console.log(h1.parentElement.children); //This allows access to the h1's parent and then it allows us to access to all its children, which are h1, h4, button and img.

[...h1.parentElement.children].forEach(function (evento) {
    if (evento !== h1) evento.style.transform = 'scale(0.5)';
}); */

/* //Ejemplo 19: Building a Tabbed Component
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (evento) {
    const clicked = evento.target.closest('.operations__tab');  console.log(clicked);
    
    // Guard clause
    if (!clicked) return;

    //Realizamos un barrido en cada uno de los 3 botones y en cada uno de los 3 contenidos de texto. Dependiendo del boton seleccionado, a este se le eliminaran sus "active"
    tabs.forEach(evento => evento.classList.remove('operations__tab--active'));
    tabsContent.forEach(evento => evento.classList.remove('operations__content--active'));

    //Una vez eliminado los "active" en el boton y el contenido seleccinado, ahora se procede a "activar" el boton y su contenido seleccionado.
    clicked.classList.add('operations__tab--active');

    //Dependiendo del boton que se haya presionado, este realizara la animacion en el boton, y tambien se desplegara el contenido de texto del boton seleccionado.
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active'); 
});

//Debemos añadir el closest(), ya que operations__tab-container tiene de hijos tres elementos botones con un span cada uno. Por lo que al presionar el boton, especificamente
//el texto (span), no funcionara correctamente el boton. Es por eso que agregamos el closest(), para que al presionar el boton, considere unicamente el elemento mas cercano
//con el nombre operations__tab (incluyendo su hijo <span>). 
//Cabe mencionar que, si precionamos donde esta el <div class="operations__tab-container"> entonces tendremos un null en consola, ya que no existe ningun elemento padre con el 
//class ".operations__tab". Para eso usamos el Guard clause, para que al no haber un click en el botton, simplemente salga de la funcion y no ejecute las lineas siguientes. */

/* // Ejemplo 20.1: Passing Arguments to Event Handlers (Method 1)

// Menu fade animation 
function handleHover(evento) {
    
    //Recordar que cuando utilizamos bind(), la keyword "this" representa los parametros que le enviamos a la funcion, en este caso, 0.5 y 1.
    console.log(this, evento.currentTarget);

    if (evento.target.classList.contains('nav__link')) {
        const link = evento.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(function(iter) {
            if (iter !== link) iter.style.opacity = this;
        });

        logo.style.opacity = this;
    }
};

// Usamos bind para retornar una nueva funcion de esa funcion handleHover, y de esa forma, no tener que usar una funcion que llame a otra funcion.
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1)); */

/* // Ejemplo 20.2: Passing Arguments to Event Handlers (Method 2) 
// Menu fade animation
function handleHover(evento, opacity) {

    console.log(evento.currentTarget);

    if (evento.target.classList.contains('nav__link')) {
        const link = evento.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(function(iter){
            if (iter !== link) iter.style.opacity = opacity;
        });

        logo.style.opacity = opacity;
    }
};

//Debido a que addEventListener requiere una funcion como parametro, no podemos simplemente usar la funcion de handleHover directamente ahi porque esta al final del dia retorna un valor, lo cual es incorrecto cuando usamos addEventListener.
nav.addEventListener('mouseover', function(evento){
    handleHover(evento, 0.5);
    console.log(this);
});

nav.addEventListener('mouseout', function(evento){
    handleHover(evento, 1);
    console.log(this);
}); */

/* //Ejemplo 21: Sticky navigation

const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

window.addEventListener('scroll', function () {
    console.log(window.scrollY);
    window.scrollY > initialCoords.top ? nav.classList.add('sticky') : nav.classList.remove('sticky');
}); */

/* //Ejemplo 22.1: The Intersection Observer API

const obsCallback = function(entries, observer){ //Whenever the first section (our target) is intersecting the viewport at 10%, the function will get called and that's no matter if we're scrolling up or down.
    entries.forEach(evento => console.log(evento));
} 

const obsOptions = { 
    root: null,     //root is the element that the target is intersecting. We write null and we'll be able to observe our target element intersecting the entire wiewport (the entire rectangle which shows the current portion of the page)
    // threshold: 0.1,  //This is the percent of intersection at which the obersver callback will be called
    threshold: [0, 0.2] //0 means that our callback will trigger each time that the target element moves complitelly out of the view. and 1 when the 100% of the target is actually visible in the viewport.
}

//             new IntersectionObserver(callback,    options);
const IO_API = new IntersectionObserver(obsCallback, obsOptions); // Our "callback" and "options" will be pased into our so called IntersectionObserver object.
IO_API.observe(section1); //This is the target element that will intersect in root. */

/* //Ejemplo 22.2: The Intersection Observer API
const stickyNav = function(entries){
    const [entry] = entries; //entries is always an array because the options in IntersectionObserver can have multiple thresholds, and for each threshold, there will be an entry in the array, even if there is only one threshold.
    console.log(entry);

    if (!entry.isIntersecting) { //When the target isn't intersecting the root, then we want the sticky class to be applied.
        nav.classList.add("sticky");
    }else{
        nav.classList.remove("sticky");
    }
}

const options = {
    root: null, //We select null because we are interested in the entire viewport
    threshold: 0, //A value of 0 means that even a single visible pixel counts as the target being visible. That's to say, when the header shows a 0% of itself, then the function will get called .

    //We use getBoundingClientRect().height to calculate dynamically the height (for responsive webpages) of the nav without the needed of hard coding and tupe an specific height. It'll be 90px.
    rootMargin: `-${nav.getBoundingClientRect().height}px` //This value is in pixels and will be applied outside of the target element
};

const headerObserver = new IntersectionObserver(stickyNav, options);
headerObserver.observe(header); */

/* //Ejemplo 23: Revealing Elements on Scroll
const allSections = document.querySelectorAll(".section");

const revealSection = function(entries, observer){
    const [entry] = entries;     console.log(entry)

    if(entry.isIntersecting === false) return;
    entry.target.classList.remove("section--hidden");

    observer.unobserve(entry.target);
};
const opciones = {
    root: null,
    threshold: 0.15, //We use something greater than zero because we don't want to show the section right as it enters the viewport, but a litte latter.
}

const sectionObserver = new IntersectionObserver(revealSection, opciones)

allSections.forEach(function(section){
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
}); */

/* //Ejemplo 24: Lazy Loading Images
const imgTarget = document.querySelectorAll("img[data-src]");  // console.log(imgTarget);

const loadImg = function(entries, observer){
    const [entry] = entries;   //console.log(entry);

    if(entry.isIntersecting === false) return;

    //Replace the src ("imgs/grow-lazy.jpg") with data-src ("imgs/grow.jpg"). That's to say, src is the blur image and the data-src is the high-quality image.
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function(){
        entry.target.classList.remove("lazy-img");
    })

    observer.unobserve(entry.target)
}

const Opciones = {
    root: null,
    threshold: 0,
    rootMargin: "200px"
}

const imgObserver = new IntersectionObserver(loadImg, Opciones);
imgTarget.forEach(evento => imgObserver.observe(evento)); */

/* //Ejemplo 24: Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector(".dots");
let curSlide = 0;
const maxSlide = slides.length;


function goToSlide(slide) {
    slides.forEach(function(evento, iter){
        evento.style.transform = `translateX(${100 * (iter - slide)}%)`; //0%, 100%, 200%
        // console.log(`${iter} , ${evento.style.transform}`);
    })
};

function nextSlide() {
    curSlide === maxSlide - 1 ? curSlide = 0 : curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide)
};

function prevSlide() {
    curSlide === 0 ? curSlide = maxSlide - 1 : curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide)
};

function createDots() {
    slides.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML('beforeend',
            `<button class="dots__dot" data-slide="${i}"></button>`
        );
    });
};

function activateDot(slide){
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};

function init(){
    createDots();
    goToSlide(0);
    activateDot(0);
}

init();
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (evento) {
    console.log(evento)
    if (evento.key === 'ArrowLeft') prevSlide();
    if (evento.key === 'ArrowRight') nextSlide();
});

dotContainer.addEventListener('click', function (evento) {
    if (evento.target.classList.contains('dots__dot')) {
        const slide = evento.target.dataset.slide;  //const { slide } = e.target.dataset;
        goToSlide(slide);
        activateDot(slide);
    }
}); */

/* //Ejemplo 25: Lifecycle DOM Events
document.addEventListener('DOMContentLoaded', function (evento) {
    console.log('HTML parsed and DOM tree built!', evento);
});

window.addEventListener('load', function (evento) {
    console.log('Page fully loaded', evento);
});

window.addEventListener('beforeunload', function (evento) {
    evento.preventDefault();
    console.log(evento);
    evento.returnValue = '';
}); */


//         $$$$$$$$$$$$$$$ JSON, storage $$$$$$$$$$$$$$$


/* // Ejemplo 1: setItem en localStorage para crear datos en el local storage. getItem para recuperar informacion almacenada. Y buscar si existe algo o no.
localStorage.setItem("saludar", "Hola mundo");
localStorage.setItem("existe", true);
localStorage.setItem("cantidad", parseInt(155)); 

const mensaje = localStorage.getItem("saludar");
const isExistente = localStorage.getItem("existe");
const cantidad = localStorage.getItem("cantidad");
const res = localStorage.getItem("nombreUsuario"); // "nombreUsuario" no existe

console.log("Mensaje: ", {mensaje});
console.log("Existe el elemento almacenado? ", {isExistente});
console.log("Cuantos pedidos hiciste? ", {cantidad});
res ? console.log("Informacion recuperada", {res}) : console.log("Informacion NO recuperada", {res}); */

/* // Ejemplo 2: Crear informacion dentro del sessionStorage con el metodo setItem(), y recuperar info almacenada en el mismo con getItem().
sessionStorage.setItem("Bienvenida", "Hola mundo");
sessionStorage.setItem("EsValido", true);
sessionStorage.setItem("unNumero", 155);

const isValido = sessionStorage.getItem("unNumero") == 155 ? true : false;
console.log("Existe el producto buscado?", {isValido});
console.log("Que tipo de dato persiste sin convertirlo?", {resultado: typeof sessionStorage.getItem("EsValido")});
console.log("Que tipo de dato persiste convertiendolo?", {resultado: typeof isValido}); */

/* // Ejemplo 3: Como guardar elementos de un array y como recuperarlos
const MY_ARRAY = [100, 500, 963];
//console.log("Que tipo de dato mi array?", {resultado: typeof MY_ARRAY, MY_ARRAY});

localStorage.setItem("myArray", MY_ARRAY);

const valorRecuperado = localStorage.getItem("myArray"); //console.log(typeof valorRecuperado, valorRecuperado);
console.log("Que tipo de dato es recuperado?", {resultado: typeof valorRecuperado, valorRecuperado});

//COMO CONVERTIR CADA ELEMENTO DEL ARRAY (SABIENDO QUE SON NUMEROS) A NUMEROS NUEVAMENTE (METODO MANUAL)
const valorCambiado = localStorage.getItem("myArray").split(","); //console.log(typeof valorCambiado, valorCambiado);
console.log( "Que tipo de dato es valorCambiado?", {resultado: typeof valorCambiado, myArray: valorCambiado.filter((evento)=>parseInt(evento))} ); */

/* // Ejemplo 4: Como recorrer todos y cada uno de los elementos almacenados dentro de nuestro local storage o session storage
console.log("Recuperar todos los elementos de la local storage");
for (let i = 0; i < localStorage.length; i++) {
    const clave = localStorage.key(i);
    console.log("En la clave <"+ clave+ "> esta este dato", {valor: localStorage.getItem(clave)});
}

console.log("\nRecuperar todos los elementos de la session storage");
for (let i = 0; i < sessionStorage.length; i++) {
    const clave = sessionStorage.key(i);
    console.log("En la clave <"+clave + "> esta este dato ",{valor: sessionStorage.getItem(clave)});
} */

/* // Ejemplo 5: eliminar elementos concretos, y tambien eliminar todos los elementos en local storage y el session storage.
// localStorage.removeItem("nombre"); 
localStorage.clear();
// sessionStorage.removeItem("Bienvenida")
// sessionStorage.clear(); */

/* // Ejemplo 6: Editar informacion ya existente dentro de nuestro local storage o session storage
const nombre = "german";
localStorage.setItem("saludar", nombre);
sessionStorage.setItem("unNumero", 8); */

/* // Ejemplo 7: Recibir los datos JSON 
const cars = `[
    {
        "modelo": "Ford mustang",
        "production": "2010",
        "millaje": "12000"
    },
    {
        "modelo": "Honda accord",
        "production": "2021",
        "millaje": "4560"
    },
    {
        "modelo": "Nissan Sentra",
        "production": "2016",
        "millaje": "58200"
    }
]`;

//console.log(typeof cars);

const jsonData = JSON.parse(cars); //Convertimos a un object con parse 
const carrosNuevos = jsonData.filter((evento) => evento.production > 2010 && evento.millaje < 30000); //console.log(carrosNuevos);
const newCars = JSON.stringify(carrosNuevos); //Convertimos a un string con stringify

const fs = require('fs');
const carroNuevo = {
    modelo: "Mini Cooper",
    produccion: "2022",
    millaje: "500"
};
const newCar = JSON.stringify(carroNuevo);
fs.writeFileSync('cars.json', newCar, (error) => {
    if (error) throw error;
    console.log("Informacion recivida");
}); */

/* // Ejemplo 8: Almacenar informacion de un objeto con JSON, despues recuperaramos los objetos en forma de string (stringify) y luego en forma de object (parse)
class Carrera {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre.trim();
    }
}

const unaCarrera = new Carrera(100, "Analista de sistemas")
console.log("Los datos de la carrera antes de almacenarse son: ",{unaCarrera}); //Intancia de una clase que esta tipificada fuertemente

localStorage.setItem("carrera", JSON.stringify(unaCarrera));
const unaCarreraRecuperada = localStorage.getItem("carrera");
console.log("La carrera recuperada con stringify es: ", {unaCarreraRecuperada});

const recuperada = JSON.parse(localStorage.getItem("carrera"));
console.log("La carrera recuperada con parse es: ", {recuperada}); */

/* // Ejemplo 9: Almacenar un array de objetos en el local storage o session storage
class Carrera {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre.trim();
    }
}

const carreras = [
    new Carrera(1, "Analista en Sistemas de Computacion"),
    new Carrera(2, "Tec. Universitaria en celulosa y Papel"),
    new Carrera(3, "Tec. Universitaria en Tecnologias de la Informacion"),
];
console.log("Mi array sin convertir es: ", {carreras});

localStorage.setItem("carreras", JSON.stringify(carreras));
let res = localStorage.getItem("carreras");

console.log("Las carreras recuperadas en formato string (stringify) son: ", {res});

//objeto recuperado de un JSON, en el cual no vamos a tener metodos. Ya que el JSON solo perciste atributos y valores, no metodos ni mucho menos los recupera. 
const convertido = JSON.parse(res);
console.log("Las carreras recuperadas en formato object (parse) son: ", {convertido}); */

/* // Ejemplo 10: Cookies
// console.log(navigator.cookieEnabled);
// document.cookie = 'firstName=german; expires='+ new Date(2024, 12, 12).toUTCString() + '; path=/';
// console.log(document.cookie);

const firstText = document.querySelector("#firstText");
const lastText = document.querySelector("#lastText");
const submitBtn = document.querySelector("#submitBtn");
const cookieBtn = document.querySelector("#cookieBtn");

submitBtn.addEventListener("click", () => {
    setCookie("firstName", firstText.value, 365);
    setCookie("lastName", lastText.value, 365);
});
cookieBtn.addEventListener("click", () => {
    firstText.value = getCookie("firstName");
    lastText.value = getCookie("lastName");
});

function setCookie(name, value, daysToLive){
    const date = new Date();
    date.setTime(date.getTime() +  (daysToLive * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`
}

function deleteCookie(name){
    setCookie(name, null, null);
}

function getCookie(name){
    const cDecoded = decodeURIComponent(document.cookie);
    const cArray = cDecoded.split("; ");
    let result = null;
    
    cArray.forEach(element => {
        if(element.indexOf(name) == 0){
            result = element.substring(name.length + 1)
        }
    })
    return result;
} */


//         $$$$$$$$$$$$$$$ Asincronia, promesas, AJAX & FETCH $$$$$$$$$$$$$$$


/* // Ejemplo 0: setTimeout y setInterval
function temporizador (callback) {
    setTimeout(() => {
        callback();
    }, 2000);
};

function operacion(){
    console.log("Tarea 2");
}

console.log("Tarea 1");
temporizador(operacion);
console.log("Tarea 3");


function contador() {
    let contador = 1;
    console.log("Iniciando contador");
    let timer = setInterval(() => {
        console.log("Contador: ", contador);
        contador++;
        if (contador > 5) {
            clearInterval(timer);
        }
    }, 1000);
};

console.log("Tarea 1");
contador();
console.log("Tarea 3"); */

/* // Ejemplo 1: Creacion de una funcionalidad asincriona con setTimeout 

const ingredients = ['olives', 'spinach', 'pepperoni'];
const pizzaTimer = setTimeout(function (ing1, ing2, ing3){
    return console.log(`Here is your pizza with ${ing1}, ${ing2} and ${ing3} 🍕`);
},1500, ...ingredients); //Tod0s los argumentos que pasemos despues del delay, seran argumentos de la funcion

console.log('Waiting...');

if (ingredients.includes('res')) clearTimeout(pizzaTimer);

// setInterval(function () {
//     const now = new Date();
//     console.log(now);
// }, 1000); */

/* // Ejemplo 2: Creacion de un countdown hacia abajo

const SEGUNDOS = 3;
for (let LEFT = 1; LEFT <= SEGUNDOS; LEFT++) {
    setTimeout(() => {
        console.log(((SEGUNDOS+1-LEFT).toString() + " segundos left"));
    }, LEFT*1000);
}  */

/* // Ejemplo 3: Aplicacion del modelo asincrono para momstrar a una de las letras de dos palabras

// for (let letra of "hola") {
//     setTimeout (() => {
//     console.log(letra)
//     }, 1000)
// }

// for (let letra of "mundo") {
//     setTimeout (() => {
//     console.log(letra)
//     }, 1500)
// }

for (let index = 0; index < "hola".length; index++) {
    setTimeout (() => {
    console.log("hola"[index])
    }, (index+1)*500)
} */

/* // Ejemplo 4: Uso del setInterval para ejecutar continuamente funcionalidades cada x cantidad de segundos.
setInterval(() => {
    console.log("Tic-Toc")
}, 1000) */

/* // Ejemplo 5: Ejemplo de como suspender un setInterval y clearTimeout
console.log("Inicio");

let counter = 0
const interval = setInterval(() => {
    counter++;
    console.log("Counter: ", counter);
    if (counter >= 5) {
    clearInterval(interval);
    console.log("Se removió el intervalo");
    }
}, 1000);

const fin = setTimeout(() => {//Esta nunca se llega a ejecutar
    console.log("fin");
}, 2000);
clearTimeout(fin); */

/* // Ejemplo 6: Como conocer los estados de una promesa     
function eventoFuturo (){
    return new Promise( (resolve, reject) => {

    });
}
console.log( eventoFuturo() ) // Promise { <pending> } */

/* // Ejemplo 7: Uso de los resultados de una Promesa para cambiar sus estados
function eventoFuturo1(res){
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            res ? resolve('Promesa resuelta') : reject('Promesa rechazada');
        }, 1000)
    })
}
//Devuelve pending porque la funcion se ejecutara y esperara 1500mS por el setTimeout, pero como no hay nada que haga que "espere" a que esto se resuelva, entonces no se mostrara nada.
console.log( eventoFuturo1(true) ) // Promise { <pending> }
console.log( eventoFuturo1(false) ) // Promise { <pending> } */

/* // Ejemplo 8: Uso del Then y Catch para catpturar los resultados y aprovechamiento de las posibilidades de respuestas de una promesa
function eventoFuturo (res) {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            res ? resolve('Promesa resuelta') : reject('Promesa rechazada')
        }, 1000)
    });
}

console.log("1. Primer proseso");

eventoFuturo(true)//eventoFuturo(false)
.then( (response) => {
    console.log(response); // Promesa resuelta
})
.catch( (error) => {
    console.log(error)
})
.finally( () => {
    console.log("Fin del proceso con true")
    //console.log("Fin del proceso con false")
}); */

/* // Ejemplo 9: Uso del fetch
fetch("https://jsonplaceholder.typicode.com/users")
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("Terminó la ejecución");
  });

console.log(respuesta); */

/* // Ejemplo 10: Problema practico del then y catch utilizando el fetch
let showSearchingUsers = document.getElementById("showSearchingUsers");
let showSearchingPosts = document.getElementById("showSearchingPosts");
//showSearchingUsers.style.display = "block";

fetch("https://jsonplaceholder.typicode.com/users")
.then((response) => {
    console.log("--> Respuesta sin formatear", response);
    return response.json();
})
.then((json) => {
    console.log("--> Esta es la respuesta del recurso formateado",json);
    showSearchingUsers.style.display = "block";
    renderUsersTableDetails(json);
    showSearchingUsers.style.display = "none";
});

function renderUsersTableDetails(users = []) {
    let usersTableBody = document.getElementById("usersTableBody");
    usersTableBody.innerHTML = "";
    users.forEach((element) => {
        renderUserDetail(element);
    });
}

function renderUserDetail(user) {// Sección para consultar Usuarios
    let productDetail = document.getElementById("usersTableBody");
    let record = document.createElement("tr");
    record.innerHTML = `
        <td>${user.name}</td>
        <td><a href="mailto:${user.email}?Subject=Lo%20contactamos%20para%20ofrecerle%20un%20curso">${user.email}</a></td>
        <td>${user.username}</td>
        <td><a href="${user.website}" target="_blank">${user.website}</a></td>`;

    productDetail.appendChild(record);
} */

/* // Ejemplo 11: Ejercicio con un array, usando tambien ASYNC/AWAIT
const productos = [
    {marca: "Nissan", modelo: 'Sentra', precio: 1500},
    {marca: "Toyota", modelo: 'Camry', precio: 2500},
    {marca: "Honda", modelo: 'Accord', precio: 3500}
];
// const BD = [];


function getDatos(){
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            productos[0].precio === 1500 ? resolve(productos) : reject(new Error ("No existe")) ;
        }, 1500);
    });
}

pedirPosts();
async function pedirPosts(){
    try{
        const datosFetched = await getDatos();
        console.log(datosFetched);
    }catch(error){
        console.log(error.message);
    }finally{
        console.log("Proceso terminado :)");
    }
}; */

/* // Ejemplo 12: Ejemplo del uso de Promesa para recuperar informacion de una base de datos

const BD_X = [
    {id: 1, nombre: 'Producto 1', precio: 1500},
    {id: 2, nombre: 'Producto 2', precio: 3500}
];
const BD_Y = [
    {id: 3, nombre: 'Producto 3', precio: 2000},
    {id: 4, nombre: 'Producto 4', precio: 3000}
];
//const BD = [];

function obtenerUsuarios(id){
    return new Promise( (resolve, reject) => {
        if (BD_X.find(evento => evento.id === id)) {
            console.log("El usuario existe");
            resolve(obtenerNombres(id))
        }else{
            reject("El usuario no existe")
        }
    });
}

function obtenerNombres(id){
    return new Promise( (resolve, reject) => {
        if (BD_Y.find(evento => evento.id === id)) {
            resolve("El nombre existe")
        }else{
            reject("El nombre no existe")
        }
    });
}

obtenerUsuarios(1)
.then((res) => {
    return res;
})
.then((data) => {
    console.log(data);
})
.catch((error) => {
    console.error(error);
}); */

/* // Ejemplo 13: fetch utilizando el then/catch y ASYNC/AWAIT
console.log( fetch('https://jsonplaceholder.typicode.com/photos') );

fetch("https://jsonplaceholder.typicode.com/photos")
.then((response) => response.json())
.then((json) => {
    console.log("JSON", json);
})
.catch( (error) => {
console.log(error)
})
.finally( () => {
    console.log("Fin del proceso :)")
});   

(async function() {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    let custom = await response.json();
    console.log("---> Respuesta formateada de la consulta", custom);
})() */

/* // Ejemplo 14: Ejercicio de calculadora positiva con promesas
// Se crearán un conjunto de funciones gestionadas por promesas y un entorno ASÍNCRONO donde podremos ponerlas a prueba.
// ✓ Definir función suma:
//   - Debe devolver una promesa que se resuelva siempre que ninguno de los dos sumandos sea 0
//   - En caso de que algún sumando sea 0, rechazar la promesa indicando “Operación innecesaria”.
//   - En caso de que la suma sea negativa, rechazar la promesa indicando “La calculadora sólo debe devolver valores positivos
// ✓ Definir función resta:
//   - Debe devolver una promesa que se resuelva siempre que ninguno de los dos valores sea 0
//   - En caso de que el minuendo o sustraendo sea 0, rechazar la promesa indicando “Operación inválida
//   - En caso de que el valor de la resta sea menor que 0, rechazar la promesa indicando “La calculadora sólo puede devolver valores positivos”
// ✓ Definir una función multiplicación:
//   - Debe devolver una promesa que se resuelva siempre que ninguno de los dos factores sea negativo
//   - Si el producto es negativo, rechazar la oferta indicando “La calculadora sólo puede devolver valores positivos
// ✓ Definir la misma función división utilizada en esta clase.
// ✓ Definir una función asíncrona “cálculos”, y realizar pruebas utilizando async/await y try/catch

function dividir(numero1, numero2) {
    return new Promise((resolve, reject) => {
        if (numero2 === 0) {
            reject("No se puede dividir por 0");
        } else {
            resolve(numero1 / numero2);
        }
    });
}

function suma(numero1, numero2) {
    return new Promise((resolve, reject) => {
        if (numero1 === 0 || numero2 === 0) {
            reject("Operación innecesaria");
        } else {
            const resultado = numero1 + numero2;
            resolve(resultado);
        }
    });
}

function resta(numero1, numero2) {
    return new Promise((resolve, reject) => {
        if (numero1 === 0 || numero2 === 0) {
            reject("Operación innecesaria");
        } else {
            const resultado = numero1 - numero2;
            if (resultado <= 0) {
                reject("La calculadora solo devuelve numeros positivos");
            } else {
            resolve(resultado);
            }
        }
    });
}

function multiplicar(numero1, numero2) {
    return new Promise((resolve, reject) => {
        if (numero1 < 0 || numero2 < 0) {
            reject("Operación innecesaria");
        } else {
            const resultado = numero1 * numero2;
            if (resultado < 0) {
                reject("La calculadora solo devuelve numeros positivos");
            } else {
                resolve(resultado);
            }
        }
    });
}

async function calculos(numero1, numero2) {
    try {
        const resultadoSuma = await suma(numero1, numero2);
        console.log("Resultado Suma: " + resultadoSuma);

        const resultadoResta = await resta(numero1, numero2);
        console.log("Resultado Resta: " + resultadoResta);

        const resultadoMultiplicacion = await multiplicar(numero1, numero2);
        console.log("Resultado Multiplicar: " + resultadoMultiplicacion);

        const resultadoDivision = await dividir(numero1, numero2);
        console.log("Resultado division: " + resultadoDivision);
    } catch (error) {
        console.log(error);
    }
}

calculos(1, 1); */

/* // Ejemplo 15: Realizar una solicitud POST
fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
        title: "Me encanta la programación con Chaman",
        body: "Un texto que comente la historia de uno  de los desarrolladores que más la peleó aprendiendo.",
        userId: 100,
    }),
    headers: {
        "Content-type": "application/json;charset=UTF-8",
    },
})
.then((response) => {
    console.log("--> El resultado de la respuesta POST es", response);
    return response.json();
})
.then((json) => {
    console.log("--> Respuesta del body de la petición", json);
}); */

/* // Ejemplo 16: Cómo recuperar datos de una localizacion externa (http://) e una interna (.json) con rutas relativas

recuperarPosteos();

function recuperarPosteos() {
    let bodyTable = document.getElementById("tableBody"); // Pintar la tabla de carreras en la UI
    bodyTable.innerHTML = "";
    toggleLoadingContainer(true);
    setTimeout(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")  //Localizacion externa
    // fetch("/ApuntesDeClase/data/posts.json")                //Localizacion interna
        .then((resultado) => resultado.json()) // Obtuvimos la respuesta --> Tomar los datos del body (.json())
        .then((data) => {                      // Obtenemos la colección de posteos
            data.forEach((post) => {
            let record = document.createElement("tr");
            record.innerHTML = 
            `<tr>
            <td scope="row">${post.id}</td>
            <td scope="row">${post.title}</td>
            <td scope="row">${post.body}</td>
            </tr>`;
            bodyTable.append(record);
        });
    })
        .catch((error) => {
            let record = document.createElement("tr");
            record.innerHTML = 
            `<tr>
                <td colspan="3" scope="row">Ocurrio un error al recuperar los datos</td>
            </tr>`;
            bodyTable.append(record);
        })
        
        .finally(() => {
            toggleLoadingContainer(false);
        });
    }, 2000);
}

function toggleLoadingContainer(isLoading = false) {
    const loadingContainer = document.getElementById("loadingMessage");
    if (isLoading) {
        loadingContainer.classList.remove("visually-hidden");
    } else {
        loadingContainer.classList.add("visually-hidden");
    }
} */

/* // Ejemplo 17: Uso de ASYNC/AWAIT para crear funciones asincrónas que se comportan como si fueran sincronas
console.log("Previo a hacer la solicitud");
async function pedirPosts(){
    const respuesta = await fetch("./data/posts.json");  
    console.log("respuesta: ",respuesta);
    const data = await respuesta.json();  
    console.log("Data: ",data);
};

pedirPosts(); */

/* // Ejemplo 18: Uso de los parámetros de configuración para el método fetch (CREACIÓN DE UN RECURSO)
const CONFIGURACION = {
    method: "POST",
    body: JSON.stringify({
        title: "Nuestro posteo personal",
        body: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas 'Letraset', las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
        userId: 1,
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
};

fetch("https://jsonplaceholder.typicode.com/posts", CONFIGURACION)
.then((response) => response.json())
.then((data) => console.log(data)); */

/* // Ejemplo 19: Uso de los parámetros de configuración para el método fetch (MODIFICACIÓN DE UN RECURSO)
const CONFIGURACION = {
  method: "PUT",// PUT/GETCH
  body: JSON.stringify({
    title: "Le cambio el título",
    body: "Un nuevo contenido para el body de este post",
    userId: 1,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
};
//fetch("https://jsonplaceholder.typicode.com/posts/{id}", CONFIGURACION)
fetch("https://jsonplaceholder.typicode.com/posts/10", CONFIGURACION)
  .then((response) => response.json())
  .then((data) => console.log(data)); */

/* // Ejemplo 20: Uso de los parámetros de configuración para el método fetch (ELIMINACIÓN DE UN RECURSO)
const CONFIGURACION = {
  method: "DELETE",
};
//fetch("https://jsonplaceholder.typicode.com/posts/{id}", CONFIGURACION)
fetch("https://jsonplaceholder.typicode.com/posts/10", CONFIGURACION)
  .then((response) => response.json())
  .then((data) => console.log(data)); */

/* // Ejemplo 21: Asynchronous JS, promises and ajax (old way)
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

function getCountryDataAndNeighbour(country) {

    //AJAX call country 1
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();

    request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //Render country 1
    renderCountry(data);

    //Get neighbour country
    const [neighbour] = data.borders;

    if(!neighbour) return;

    //AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function (){
        const [data2] = JSON.parse(this.responseText);
        console.log(data2);

        renderCountry(data2, "neighbour")
    })

    });
};

function renderCountry(data, className = ''){
    //Metodo 1
    const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${Number(data.population / 1000000).toFixed(1)} people</p>

            <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
            <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
        </div>
    </article>`;

    //Metodo 2
    // <p class="country__row"><span>🗣️</span>${Object.values(Object.values(data.currencies)[0])[0]}</p>
    // <p class="country__row"><span>💰</span>${Object.values(data.languages)[0]}</p>

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

getCountryDataAndNeighbour("russia");

// setTimeout(() => {
//     console.log('1 second passed');
//     setTimeout(() => {
//         console.log('2 seconds passed');
//         setTimeout(() => {
//             console.log('3 second passed');
//             setTimeout(() => {
//                 console.log('4 second passed');
//             }, 1000);
//         }, 1000);
//     }, 1000);
// }, 1000); */

/* // Ejemplo 22: Asynchronous JS, promises and ajax (new way);
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const request = fetch("https://restcountries.com/v3.1/name/russia");
console.log(request);

function getCountryData(country){
    //Country 1
    getJSON(`https://restcountries.com/v3.1/name/${country}`, "Country not found")
    .then(function(data){
        console.log(data);
        renderCountry(data[0]);
        const neighbour = data[0]?.borders?.[0]; //If we chose austrlia, then there won't be any key with the name "border" in the object, so we'll get an "undefined". That's why we use the Optional chaining (?.)
        // const neighbour = "frfsag"; //Line to execute an error
        console.log(neighbour);

        if (!neighbour) throw new Error("No neighbour found!");
        
        //Country 2
        return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`, "Country not found")
        .then(function(data){
            return renderCountry(data[0], "neighbour");
        })
    })
    .catch(function(err){
        console.log(`${err} 😡😡😡`);
        renderError(`Something went wrong 😡😡😡 ${err.message}. Try again!`); //$ {err} = TypeError: Failed to fetch    {err.message} = Failed to fetch
    })
    .finally(function(){
        countriesContainer.style.opacity = 1;
    })
}

function getJSON(url, errorMsc = "Something went wrong"){
    return fetch(url)
    .then(function(response){
        console.log(response);

        if(!response.ok) throw new Error(`${errorMsc} (${response.status})`); //When we use "throw" in any of our methods, means that it will terminate the currecnt function, and the promise will immediately reject. So, the proimse returned by this first ".then" will be a rejected promise. And that rejection will then propagate all the way down to the catch handler, which we already have set up right down. 
        return response.json(); //json is a function that is available on all responses of the fetch method. json is an asyncronous function and it'll also return a new promise.
    })
}

function renderCountry(data, className = ''){
    //Metodo 1
    const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${Number(data.population / 1000000).toFixed(1)} people</p>

            <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
            <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
        </div>
    </article>`;

    //Metodo 2
    // <p class="country__row"><span>🗣️</span>${Object.values(Object.values(data.currencies)[0])[0]}</p>
    // <p class="country__row"><span>💰</span>${Object.values(data.languages)[0]}</p>

    countriesContainer.insertAdjacentHTML('beforeend', html);
    // countriesContainer.style.opacity = 1;
}

function renderError(msg){
    countriesContainer.insertAdjacentText("beforeend", msg);
    // countriesContainer.style.opacity = 1;
}

btn.addEventListener("click", function(){
    getCountryData("russia");
    // getCountryData("australia"); 
    // getCountryData("gtrgt"); //Line to execute an error
}); */

/* // Ejemplo 23 Excercise no. 1

// In this challenge you will build a function 'whereAmI' which renders a country only based on GPS coordinates. For that, you will use a second API to geocode coordinates. 
// So in this challenge, you’ll use an API on your own for the first time. Your tasks:
// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat') and a longitude value ('lng') (these are GPS coordinates, examples are in test data below).
// 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API 
//    to do reverse geocoding: https://geocode.xyz/api. The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
//    promises to get the data. Do not use the 'getJSON' function we created, that is cheating 
// 3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a message 
//    like this to the console: “You are in Berlin, Germany”
// 4. Chain a .catch method to the end of the promise chain and log errors to the console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() 
//    does not reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message
// 6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
// 7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

const countriesContainer = document.querySelector('.countries');

function whereAmI(lat, lng){
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(function(res){
        if(!res.ok) throw new Error(`Problem with geocoding (${res.status})`)
        return res.json();
    })
    .then(function(data){
        console.log(data);
        console.log(`You are in ${data.city}, ${data.country}`);
        return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
    })
    .then(function(res){
        if(!res.ok) throw new Error(`Country not found (${res.status})`)
        return res.json();
    })
    .then(function(data){
        return renderCountry(data[0])
    })
    .catch(function(err){
        console.log(`${err.message} 😈`);
    })
}

function renderCountry(data){
    //Metodo 1
    const html = `
    <article class="country">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${Number(data.population / 1000000).toFixed(1)} people</p>

            <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
            <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
        </div>
    </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

whereAmI(52.508, 13.381); // (Latitude, Longitude)
// whereAmI(19.037, 72.873);
// whereAmI("ukrj", "brths"); */

/* // Ejemplo 24: The Event Loop
console.log("Test start");

setTimeout(function(){ //This and the Promise.resolve() will be executed at the end. So, coat outside of any callback, will run first
    console.log("0 sec timer");
}, 0);

//This allow us to build a promise, so to create a promise that is immediately resolved.
Promise.resolve("Resolved promise 1")
.then(function(res){
    console.log(res);   
});

Promise.resolve("Resolved promise 2")
.then(function(res){
    for (let i = 0; i < 10000000; i++) {};
    console.log(res);
})

console.log("Test end"); */

/* // Ejemplo 25: Building a Simple Promise

const lotteryPromise = new Promise(function(resolve, reject){ //All of this will create new promise. As soon as the promise constructor runs, it will automatically execute this executor function that we pass in. And as it executes this function here, it will do so by passing in two other arguments. And those arguments are the resolve and reject functions.
    console.log("Lottery dray is happening...")
    setTimeout(function(){
        Math.random() >= 0.5 ? resolve("You win 💰") : reject(new Error ("You lost 💰"));
    }, 2000)
});

lotteryPromise.then(function(res){console.log(res)}).catch(function(err){console.error(err)}); */

/* // Ejemplo 26: Promisifying setTimeout
function wait(seconds){
    return new Promise(function(resolve){ //This doesn't need the reject function because it's impossible for the timer to fail. 
        setTimeout(resolve, seconds);
    })
} 

wait(1000)//This will create a promise that wait for one second at first, and after that second it will resolve.
.then(function() {
    console.log('1 second passed');
    return wait(1000); //Now we have to return a new promise
})
.then(function() {
    console.log('2 second passed');
    return wait(1000);
})
.then(function() {
    console.log('3 second passed');
    return wait(1000);
})
.then(function(){
    console.log('4 second passed');
}); */

/* // Ejemplo 27: Promisifying the Geolocation API
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

function getPosition(){
    return new Promise(function(resolve, reject){
        // navigator.geolocation.getCurrentPosition( //If getCurrentPosition automatically calls the pos function, and if it also automatically passes in the position, then we can simply do the next line.
        //     pos => resolve(pos), 
        //     err => reject(err)); 
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

function whereAmI(){
    getPosition()
    .then(function(pos){
        console.log(pos)
        const {latitude: lat, longitude: lng} = pos.coords;
        return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`); //We return a new promise
    })
    .then(function(res){
        if(!res.ok) throw new Error(`Problem with geocoding (${res.status})`)
        return res.json(); //We return a new promise
    })
    .then(function(data){
        console.log(data);
        console.log(`You are in ${data.city}, ${data.country}`);
        return fetch(`https://restcountries.com/v3.1/name/${data.country}`); //We return a new promise
    })
    .then(function(res){
        if(!res.ok) throw new Error(`Country not found (${res.status})`)
        return res.json(); //We return a new promise
    })
    .then(function(data){
        return renderCountry(data[0]); //We return a new promise
    })
    .catch(function(err){
        console.log(`${err.message} 😈`);
    });
};

function renderCountry(data){
    const html = `
    <article class="country">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${Number(data.population / 1000000).toFixed(1)} people</p>

            <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
            <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
        </div>
    </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

btn.addEventListener("click", whereAmI); */

/* // Ejemplo 28: Excercise no. 2
// 1. Create a function 'createImage' which receives 'imgPath' as an input. This function returns a promise which creates a new image (use document.createElement('img')) and 
//    sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. 
//    The fulfilled value should be the image element itself. In case there is an error loading the image (listen for the'error' event), reject the promise
// 2. Consume the promise using .then and also add an error handler
// 3. After the image has loaded, pause execution for 2 seconds using the 'wait' function we created earlier
// 4. After the 2 seconds have passed, hide the current image (set display CSS property to 'none'), and load a second image (Hint: Use the image element returned by the 
//    'createImage' promise to hide the current image. You will need a global variable for that)
// 5. After the second image has loaded, pause execution for 2 seconds again
// 6. After the 2 seconds have passed, hide the current image

// Test data: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to “Fast 3G” in the dev tools Network tab, otherwise images load too fast
const imgCountainer = document.querySelector(".images");

function createImage(imgPath){
    return new Promise(function(resolve, reject){
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener("load", function(){
            imgCountainer.append(img);
            resolve(img);
        });

        img.addEventListener("error", function(){
            reject(new Error("Image not found"));
        });
    })
}

function wait(seconds){
    return new Promise(function(resolve){ //This doesn't need the reject function because it's impossible for the timer to fail. 
        setTimeout(resolve, seconds);
    })
} 

let currentImg;
createImage("imgs/img-1.jpg")
.then(function(res){
    currentImg = res;
    console.log("Image 1 loaded");
    return wait(2000);
})
.then(function(){
    currentImg.style.display = "none";
    return createImage("imgs/img-2.jpg");
})
.then(function(img){
    currentImg = img;
    console.log("Image 2 loaded");
    return wait(2000);
})
.then(function(){
    currentImg.style.display = "none";
})
.catch(function(err){
    console.error(err);
}); */

/* // Ejemplo 29: Consuming Promises with Async/Await
//Running Promises in Parallel Consuming Promises with Async/Await
const countriesContainer = document.querySelector('.countries');

async function whereAmI(country){
    try{
        //Geolocation
        const pos = await getPosition();
        const {latitude: lat, longitude: lng} = pos.coords;
        
        //Revers geocoding
        const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        if(!resGeo.ok) throw new Error("Problem getting location data");
        const dataGeo = await resGeo.json(); //This returns a new promise
        // console.log(resGeo);
        // console.log(dataGeo);
    
        //Country data
        const res = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.country}`); //This will return a promise. So, await will stop decode execution at this point of the function until the promise is fulfull, and so until the data has been fetched. This isn't blocking the main threat of execution. So, it isn't blocking the call stack.
        if(!res.ok) throw new Error("Problem getting location country");
        const data = await res.json(); //This returns a new promise
        // console.log(res);
        // console.log(data);
    
        renderCountry(data[0]);

        return `You are in ${dataGeo.city}, ${dataGeo.country}`;
    }
    catch(err){
        console.error(`${err} 😈`);
        renderError(`😈 ${err.message}`);

        //Reject promise returned from async function 
        throw error;
    }
};

function getPosition(){
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

function renderCountry(data){
    const html = `
    <article class="country">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${Number(data.population / 1000000).toFixed(1)} people</p>

            <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
            <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
        </div>
    </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
};

function renderError(msg){
    countriesContainer.insertAdjacentText("beforeend", msg);
};

//Metodo 1 con async await, usando IIEF (Immediately Invoked Function Expressions)
console.log("1: Will get location");
(async function () {
    try {
        const city = await whereAmI();
        console.log(`2: ${city}`);
    } catch (err) {
        console.error(`2: ${err.message} 💥`);
    }
    console.log('3: Finished getting location');
})();

//Metodo 2 con then y catch
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location')); */

/* // Ejemplo 31: Running Promises in Parallel
async function get3Countries(c1, c2, c3){
    try {
        //If we use this method, then the 3 functions will run one after the other. So, if we use the second method, then the 3 functions wll run at the same time.
        const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
        const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
        const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
        console.log([data1.capital, data2.capital, data3.capital]);

        //This is a helper function on this promise constructor. So it's a static method. Now, this function takes in an array of promises and it will return a new promise (or also an array), which will then run all the promises in the array at the same time.
        const data = await Promise.all([
            getJSON(`https://restcountries.com/v2/name/${c1}`), 
            getJSON(`https://restcountries.com/v2/name/${c2}`), 
            getJSON(`https://restcountries.com/v2/name/${c3}`)
        ]);
        console.log(data.map(event => event[0].capital))

    } catch (err) {
        console.log(err);
    }    
}

function getJSON(url, errorMsc = "Something went wrong"){
    return fetch(url)
    .then(function(response){
        // console.log(response);

        if(!response.ok) throw new Error(`${errorMsc} (${response.status})`); //When we use "throw" in any of our methods, means that it will terminate the currecnt function, and the promise will immediately reject. So, the proimse returned by this first ".then" will be a rejected promise. And that rejection will then propagate all the way down to the catch handler, which we already have set up right down. 
        return response.json(); //json is a function that is available on all responses of the fetch method. json is an asyncronous function and it'll also return a new promise.
    })
}

get3Countries("russia", "germany", "japan"); */

/* // Ejemplo 32: Other Promise Combinators: race, all, allSettled and any
//It recives an array of promises and it also return a promise. Now, this promise returned by race is settled as asoon as one of the input promises settle. (settled means that a value is available and it doesn't matter if the promise gor rejecetd or fulfilled). So, in Promise.race(), basically the first settled promise wins the race.
(async function(){
    const res = await Promise.race([
        getJSON(`https://restcountries.com/v2/name/russia`),
        getJSON(`https://restcountries.com/v2/name/germany`),
        getJSON(`https://restcountries.com/v2/name/japan`)
    ]);

    console.log(res[0]);
})();

function getJSON(url, errorMsc = "Something went wrong"){
    return fetch(url)
    .then(function(response){
        // console.log(response);

        if(!response.ok) throw new Error(`${errorMsc} (${response.status})`); //When we use "throw" in any of our methods, means that it will terminate the currecnt function, and the promise will immediately reject. So, the proimse returned by this first ".then" will be a rejected promise. And that rejection will then propagate all the way down to the catch handler, which we already have set up right down. 
        return response.json(); //json is a function that is available on all responses of the fetch method. json is an asyncronous function and it'll also return a new promise.
    });
}

function timeout(sec){
    return new Promise(function(_, reject){
        setTimeout(function(){
            reject(new Error("Request took long time!!"));
        }, sec*1000)
    })
}

//Promise.race() takes an iterable of promises as input and returns a single Promise. This returned promise settles with the eventual state of the first promise that settles. So, it will run the method that first happens, and then the rest of the methods will be rejected. So, that basically will then abort the fetch that is happening
Promise.race([
    getJSON(`https://restcountries.com/v2/name/mexico`),
    timeout(10),
])
.then(res => console.log(res[0])).catch(err => console.error(err));

//It takes in an array of promises again, and it will simply return an array pf all the settled promises, no matter if the promises got rejected or not. The difference with between each other, is that Promise.all() will short circuit as soon as one promises rejects, but Promse.allSettled simply never short circuits. It will only return all the results of all the promises.
Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
])
.then(res => console.log(res));

//It's a static method. Now, this function takes in an array of promises and it will return a new promise (or also an array), which will then run all the promises in the array at the same time.
Promise.all([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
])
.then(res => console.log(res)).catch(err => console.error(err));

// Promise.any() takes in an array of multiple promises and this one will then return the first fulfilled promise and it will simply ignore rejected promises. It's similar to Promise.race() with the difference that rejected promises are ignored, and so therefore the results of Promise.any() is always gonna be a fulfilled promise, unless of course all of them reject. 
Promise.any([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
])
.then(res => console.log(res)).catch(err => console.error(err)); */

/* // Ejemplo 33: Excercise no. 3
// Your tasks:
// 1. Write an async function 'loadNPause' that recreates Challenge #2, this time using async/await (only the part where the promise is consumed, reuse the 'createImage' 
//    function from before). Compare the two versions, think about the big differences, and see which one you like more

// 2. Create an async function 'loadAll' that receives an array of image paths 'imgArr'
// 3. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
// 4. Check out the 'imgs' array in the console! Is it like you expected?
// 5. Use a promise combinator function to actually get the images from the array 
// 6. Add the 'parallel' class to all the images (it has some CSS styles)

// Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img3.jpg']. To test, turn off the 'loadNPause' function

const imgCountainer = document.querySelector(".images");

function createImage(imgPath){
    return new Promise(function(resolve, reject){
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener("load", function(){
            imgCountainer.append(img);
            resolve(img);
        });

        img.addEventListener("error", function(){
            reject(new Error("Image not found"));
        });
    })
}

function wait(seconds){
    return new Promise(function(resolve){ //This doesn't need the reject function because it's impossible for the timer to fail. 
        setTimeout(resolve, seconds);
    })
} 

async function loadNPause(){
    try {
        let img; 

        //Load image 1
        img = await createImage("imgs/img-1.jpg");
        console.log("Image 1 loaded");
        await wait(2000);
        img.style.display = "none";

        //Load image 2
        img = await createImage("imgs/img-2.jpg");
        console.log("Image 2 loaded");
        await wait(2000);
        img.style.display = "none";

        //Load image 3
        img = await createImage("imgs/img-3.jpg");
        console.log("Image 3 loaded");
        await wait(2000);
        img.style.display = "none";

    } catch (err) {
        console.log(err);
    }
}

async function loadAll(imgArr){
    try {
        const imgs = imgArr.map(async function(event){
            return await createImage(event)
        });
        console.log(imgs);

        const imgsEl = await Promise.all(imgs); //When we map the array of imgs by using async-await, we get a promise (fulfilled) and not the three images of each one. So, if we'd want to get the three images we'd have to use the Promise.all(imgs), because all the promises are stored in imgs.
        console.log(imgsEl);

        imgsEl.forEach(event => event.classList.add("parallel"));

    } catch (err) {
        console.log(err);
    }
}

// loadNPause();
loadAll(['imgs/img-1.jpg', 'imgs/img-2.jpg', 'imgs/img-3.jpg']); */

/* // Ejemplo 34: Top-Level await
//it's very important to remember that using top-level await, so await outside of any async function will block the entire module in a way that we really couldn't block code execution before.
const res = await fetch('https://jsonplaceholder.typicode.com/posts'); // this await keyword here, which is now outside of an async function, is blocking the entire execution of this module.
const data = await res.json();
console.log("data", data);

async function getLastPost() { //calling an async is not necessary because it returns a new promise ( Promise {<pending>} )
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();

    return { 
        title: data.at(-1).title, 
        text: data.at(-1).body 
    };
};

const lastPost = getLastPost();
console.log("lastPost", lastPost);

const lastPost2 = await getLastPost();
console.log("lastPost2", lastPost2); */




















// node src/Frontend/frontend.js