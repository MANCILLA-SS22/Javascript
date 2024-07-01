let persona = {
    nombre: "maria",
    edad: 22,
}

let prop = "edad"
console.log( persona.prop) // dot notation
console.log( persona[prop] ) // bracket notation

persona["nombre completo"] = "juan perez"


const mostrarPropiedad = (propiedad)=>{
    console.log( persona[propiedad])
}

mostrarPropiedad("nombre")

console.log(persona["nombre completo"])