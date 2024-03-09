import { Router } from "express";
import { PetsService } from "../services/dao/mongo/pets.service.js";

const router = Router();
const petsService = new PetsService();

router.get("/", async function(req, res){
    try {
        const pets = await petsService.getAll();
        if (!pets) res.status(202).json({ message: "No pets found: " });
        res.json(pets);
    } catch (error) {
        console.error("Error consultando las mascotas");
        res.status(500).send({ error: "Error consultando las mascotas", message: error });
    }
});

router.post("/", async function(req, res){
    const { name, type } = req.body;
    try {
        const result = await petsService.save({ name: name, type: type });
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo guardar la mascota." });
    }
});

router.get("/:word([a-zA-Z%C3%A1%C3%A9%20]+)", async function(req, res){
    try {
        console.log("Mascota despues de la busqueda: ", req.pet);
        // const pets = await petsService.findByName(req.params.word); //Sin regex (Cuando utilizamos regex, esta linea no es necesaria porque el router.param ya se encarga de hacer esa busqueda)
        const pets = req.pet; //Con regex
        if (!pets) {
            res.status(202).send({ message: "No pets found" });
            throw new Error('No pets found');
        }
        res.json(pets)
    } catch (error) {
        console.error(error);
    }
});

router.put("/:word([a-zA-Z%C3%A1%C3%A9%20]+)", async function(req, res){
    try {
        const result = await petsService.update({ _id: req.pet._id }, { isAdopted: false });  console.log("result", result);
        if (!result) {
            res.status(500).send({ message: "The pet could not be update" });
            throw new Error('The pet could not be update');
        }
        res.status(202).json(result);
    } catch (error) {
        console.error('Ocurrió un error:', error);
        res.status(500).send({ error: error, message: "No se pudo guardar la mascota." });
    }
});

//router.param funciona como un middleware específicamente para el parámetro matcheado. Se manda a llamar cada vez que se ingresa un parametro por URL(después de los middlewares principales) y tiene como 
//función principal el generalizar las operaciones hechas con dicho parámetro. En este caso, sirve cuando se utilizan distintas rutas pero con el mismo endpoint. En este caso, la palabra "word", que 
//tambien contendra el re-gex asignado. Y basicamente lo que hara router.param es capturar ese endpoint en de cada ruta.
router.param("word", async function(req, res, next, name){ //"name" hace referencia a lo que viene desde el enpoint, en este caso "word".
    console.log("Buscando nombre de mascota, valor: " + name);
    try {
        let result = await petsService.findByName(name);
        if (!result) {
            req.pet = null;
            throw new Error('No pets found');
        } else {
            req.pet = result;
        }
        next();
    } catch (error) {
        console.error('Ocurrió un error:', error.message);
        res.status(500).send({ error: "Error:", message: error.message });
    }
});

router.get("*", function(req, res){// Dado que estamos trabajando a nivel router, para los casos donde la palabra no cumpla con la expresión regular indicada, podemos indicar un get * a nivel router para indicar que no se está cumpliendo con la ruta. 
    res.status(400).send("Cannot get that URL!!")
});

export default router;

/*
Cuantificadores:

+: El operador "+" sirve para limitar el numero de coincidencias. Por ejemplo, en la url, si el primer parametro no coincide, entonces se seguira buscando en los demas parametros si existe alguna coincidencia. 
    Por otro lado, si no se utiliza, entonces cuando el primer parametro no cumpla ninguna coincidencia, automaticamente se descartara el resto y se ira a router.get("*", function(req, res){}
    
    Para limitar el número de coincidencias en una expresión regular, puedes utilizar cuantificadores específicos en lugar de "+" que indiquen un rango específico de repeticiones. Algunos cuantificadores comunes son:

*: Significa "cero o más veces". Puedes usarlo si deseas permitir ninguna aparición o varias apariciones del elemento.

?: Significa "cero o una vez". Úsalo si deseas permitir que el elemento aparezca opcionalmente una vez.

{n}: Significa "exactamente n veces". Especifica un número exacto de repeticiones que deseas encontrar.

{n, m}: Significa "entre n y m veces". Puedes especificar un rango de repeticiones permitidas.

Por ejemplo, si deseas encontrar una cadena que contenga exactamente tres letras minúsculas seguidas, podrías usar la expresión regular [a-z]{3}. Esto coincidirá con cadenas como "abc" pero no coincidirá con "a" ni con "abcd".

Si deseas permitir un rango de repeticiones, puedes hacerlo de la siguiente manera:

[a-z]{2,4} coincidirá con cadenas que contengan entre 2 y 4 letras minúsculas consecutivas, como "ab", "abc", o "abcd".

[0-9]{1,3} coincidirá con cadenas que contengan entre 1 y 3 dígitos, como "5", "123", o "9999".

Entonces, para limitar el número de coincidencias en tu expresión regular, simplemente ajusta los cuantificadores ({}, *, ?, etc.) según tus necesidades específicas de repeticiones.

*
*/