import { Router } from 'express';
import { fork } from 'child_process';

const router = Router();

//Al no utilizar Child process, cuando se quiera cargar los siguientes dos endpoints en diferentes pestanas, por ejemplo ejecutando la de "/suma" primero y despues la de "/", el resultado sera que la que 
//tiene "/" no cargara hasta que "/suma" haya terminado su proceso, ya que esta realiza una operacion que va desde 0 hasta un numero muy grande. Pero cuando ahora se utiliza child process, especificamente 
//con "fork", ese inconveniente podra ser eliminado. Ahora bien, cada proceso sera independiente del uno con el otro.

// Con Child Process - Fork 
let count = 0
router.get('/suma_01', function(req, res){
    res.render('index', { count: count++ });
});


router.get("/suma_02", function(req, res){
    const child = fork("./Ejercicio-45/src/forks/operations.js");
    child.send({message: "Iniciar calculo"}); //El padre envia un mensaje al hijo
    child.on("message", function(result){
        res.send(`El resultado de la operacion es ${result}`); //Solo hasta que el hijo nos responda
    });

});

export default router;

// (1) El padre realiza un fork al proceso hijo.
// (2) El padre envía un mensaje al proceso hijo
// (3) El proceso hijo tiene su propio listener, al recibir el mensaje del padre, entiende que tiene que comenzar con su cálculo.
// (4) Una vez que el hijo termina de calcular, le reenvía un mensaje al padre, donde el contenido del mensaje será el resultado.
// (5) Ese resultado se envía al cliente.

/* //sin Child Process - Fork 
let count = 0
router.get('/', function(req, res){
    res.render('index', { count: count++ });
});


router.get("/suma", function(req, res){
    res.send(`El resultado de la operacion es: ${operacionCompleja()}`)
});


function operacionCompleja(){
    let result = 0;
    for (let i = 0; i < 5e9; i++){
        result += i;
    }
    return result;
};  */