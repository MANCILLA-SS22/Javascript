import { Command } from 'commander';

const program = new Command();

//primero va la variable, luego la descripcion y al final puede ir un valor por defecto.
program
.option('--test', 'Variable para correr los test', false)
.option('-d', 'Varaible para debug', false) 
.option('-p <port>', 'Puerto del servidor', 5500)
.option('--persist <persist>', 'Modo de persistencia', "mongodb")
.option('--mode <mode>', 'Modo de trabajo', 'dev')
.option('-1, --letters [letters...', 'specify letters')
.requiredOption('-u <user>', 'Usuario que va a utilizar el aplicativo.', 'No se ha declarado un usuario.');//RequireOption usa un mensaje por defecto si no está presente la opción.

program.parse(); //Parsea los comandos y valida si son correctos.

// console.log("Options: ", program.opts());
// console.log("Mode Option: ", program.opts().mode);
// console.log("Test Mode on?: ", program.opts().test);
// console.log("Persistence Mode Option: ", program.opts().persist);
// console.log("Remaining arguments: ", program.args);


// ****** Uso de listeners ******
//Listener (primer metodo)
// process.on("exit", function(code){ //Termina el proceso cuando hay un error
//     console.log("Este codigo se ejecuta antes de salir del proceso.");
//     console.log("Codigo de salida del proceso: " + code);
// });

//Listener (segundo metodo)
// process.on("uncaughtException", function(exception){ // NO termina el proceso aun cuando hay un error
//     console.log("Esta exception no fue capturada, o controlada.");
//     console.log(`Exception no capturada: ${exception}`)
// });

//Listener (tercer metodo)
// process.on("message", function(message){
//     console.log("Este codigo se ejecutará cuando reciba un mensaje de otro proceso.");
//     console.log(`Mensaje recibido: ${message}`);
// });



export default program;