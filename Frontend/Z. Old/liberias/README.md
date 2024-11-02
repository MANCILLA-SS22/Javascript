# luciobio-op-lib
Material del Afterclass de Operadores Avanzados y Librerías

Operadores Avanzados

//Ternario
cond? si.true : si.false

//And
cond?? si.true

//Or
cond || alt

//Nulish (solo devuelve alt cuando null o undefined)
cond ?? alt

//Acceso Condicional a un Objeto o Encadenamiento Opcional
objeto?.propiedad || ‘no existe la propiedad’

// Desestructuración / Alias
let {prop1, prop2} = obj

// Desestr. Array
let {[0], [1], [2]} arr

// Spread Operator …
const obj2 = {...obj, newProp: ‘value’}

//Falsy = [0, null, undefined, NaN, false, “ ”]
//Truthy = [1, ”a”, [], {}, function()]
