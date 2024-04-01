import {SingletonClass} from "./singleton.js"

// Ejemplos
function singletonDesignPatternX1(){
    let clase_01 = SingletonClass.getInstance(); console.log(clase_01);
    let clase_02 = SingletonClass.getInstance(); console.log(clase_02);
    let clase_03 = SingletonClass.getInstance(); console.log(clase_03);    
}

export {singletonDesignPatternX1}