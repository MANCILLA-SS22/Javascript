import { useEffect, useState } from "react"
import FetchingDeDatos from "./FetchingDeDatos";

function FetchingDeDatosContainer(){

    const [users , setUsers] = useState([]); //console.log(users);    

    useEffect(() => {
        const promiseData = fetch("https://jsonplaceholder.typicode.com/users");
        promiseData
        .then((res) => {//El primer then es para transformar lo que se obtuvo del fetch, a JSON. Es decir, algo que JS entienda y se pueda procesar. Cabe recalcar que, esto retorna una promesa.
            return res.json();
        })
    
        .then((data) => {//El segundo then es para capturar la respuesta, debido a que el then anterior vuelve a retornar una promesa pero ahora parseada.
            setUsers(data); 
        })
    
        .catch((err) => {
            console.log("Este es el error: ",err);
        });
    }, [])

    function createUser(){
        let data = {
            name: "German",
            username: "Mancilla",
            email: "german@gmail.com"
        }
        
        const promise = fetch("https://jsonplaceholder.typicode.com/users", {
            method: "POST",
            body: JSON.stringify(data)
        })

        promise
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log("El usuario fue creado con la siguiente info: ", data);
        })
        .catch((err) => {
            console.log(err);
        })
    }


    return <FetchingDeDatos x={users} y={createUser} />
}

export default FetchingDeDatosContainer

/*  Explicacion: Primero tenemos el useState para mostrar los cambios en la variable. El console.log de la linea 6 primer muestra un array vacio, pero al entrar al useEffect
    este hace el proceso del fetch para capturar la informacion, despues la almacena con ayuda de setUsers y finalmente sale del ciclo. Nuevamente se vuelve a la linea 5 pero
    ahora la variable users tiene un array almacenado y se muestra en el console.log, pero ahora ya no vuelve a entrar en el useEffect, puesto que este solo se usa 1 sola vez.
    Si no utilizamos el useEffect, entonces se ejecutara un bucle infinito ya que el hook useState siempre se iterara.*/