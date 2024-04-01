import process from "node:process";

function processFunc(){

    // console.log(process);
    // console.log(process.argv); // npm run start
    // console.log(process.argv.slice(2)); // --> ["--mode", "dev"]    

    // Listener (primer metodo)
    process.on("exit", function(code){ //Termina el proceso cuando hay un error
        console.log("Este codigo se ejecuta antes de salir del proceso.");
        console.log("Codigo de salida del proceso: " + code);
    });
    
    // Listener (segundo metodo)
    process.on("uncaughtException", function(exception){ // NO termina el proceso aun cuando hay un error
        console.log("Esta exception no fue capturada, o controlada.");
        console.log(`Exception no capturada: ${exception}`)
    });
    
    // Listener (tercer metodo)
    process.on("message", function(message){
        console.log("Este codigo se ejecutará cuando reciba un mensaje de otro proceso.");
        console.log(`Mensaje recibido: ${message}`);
    });
};

export {processFunc};