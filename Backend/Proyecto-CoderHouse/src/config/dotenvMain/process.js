import process from "node:process";

function processFunc(){
    process.on("exit", function(code){ //Termina el proceso cuando hay un error
        console.log("Este codigo se ejecuta antes de salir del proceso.");
        console.log("Codigo de salida del proceso: " + code);
    });
    
    process.on("uncaughtException", function(exception){ // NO termina el proceso aun cuando hay un error
        console.log("Esta exception no fue capturada, o controlada.");
        console.log(`Exception no capturada: ${exception}`)
    });
};

export {processFunc};