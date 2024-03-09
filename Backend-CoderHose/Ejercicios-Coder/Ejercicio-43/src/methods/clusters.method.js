import cluster from "node:cluster";
import { cpus } from "os";
import { backend } from "../backend.js";

function clusters(){
    console.log("Preguntar si es el cluster es primario: ", cluster.isPrimary);
    
    if (cluster.isPrimary) { //Si eres un proceso primario, entonces indica que eres el principal y forkea a un trabajador
        console.log("Identificamos el ProcessID Padre:" + process.pid); 
        console.log("Soy proceso primario y voy delegar el trabajo a un Worker.");
        console.log("Numero de CPUs en mi maquina es de ", cpus().length, "y los CPU's son: ", cpus());
        console.log("Proceso primario, generando Fork para un trabajador.");

        for (let i = 0; i < cpus().length - 1; i++) { //Generando múltiples trabajadores. En este caso, depende de la cantidad de CPU's existentes en nuestra computadora.
            cluster.fork(); //se utiliza para crear un nuevo proceso hijo (worker)
        }

        cluster.on('exit', function(worker){ // Listener para manejar la muerte de un worker. Al destruir un child process, entonces se ejecuta el cluster.on("exit"). Entocnes, una vez capturado ese proceso eliminado, procederemos a crear uno nuevo aunque no tenga el mismo pid.
            console.log(`Worker ${worker.process.pid} died`);
            cluster.fork(); // Creamos un nuevo worker para reemplazar al que murio
        });

    }else{ //Si es un proceso trabajador, entonces indica que eres trabajador y procede a realizar las tareas que corresponden.
        console.log(`Soy un proceso worker con el id: ${process.pid}`);
        backend();
    }    
};

export {clusters};

//1. La palabra fork será clave para hacer referencia a que un proceso nuevo surgirá, pero se mantendrá ligado al proceso que lo generó.
//2. "isPrimary" Esta propiedad nos ayuda a corroborar si el proceso es el principal, o viene forkeado de algún proceso superior. 
//3. Sabemos que el procesamiento de nuestro servidor será siempre single-threaded. Al realizar nuestros primeros forkeos, estamos comenzando a romper el paradigma que implica. Para levantar múltiples instancias, sin que afecte demasiado en tamaño, 
//   lo primero debería ser determinar el número de hilos que podrán procesar estos multiprocesamientos, esto lo conseguiremos con ayuda de "cpus". En este caso, existen unicamente 4.
//4. Cuando un proceso se ejecuta, este tiene dentro de sus características principales una propiedad conocida como pid. Este processId es muy importante para poder trabajar con otros procesos. Cuando un proceso padre instanciaba un proceso hijo, 
//   este mantiene una referencia a partir del pid, haciéndole saber que ese proceso es parte de él.