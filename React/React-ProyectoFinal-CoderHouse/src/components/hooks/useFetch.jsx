import { useEffect, useState } from "react"

export function useFetch(initial, endpoint) {
    const [data, setData] = useState(initial)
    useEffect(() => {
        const data = fetch(endpoint)
        data
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((err) => console.log(err))
    }, [endpoint]) //Cada vez que cambie el endpoint (dentro del []), se vuelve a ejecutar la peticion del useEffect

    /* //Metodo 1: Enviandolo como objeto.  "datos" es el nombre que se utilizara para poder retornar como variable, ya que se esta enviando un objeto (que debe tener clave-calor) que se va a desestructurar.
    return {datos: data} */

    //Metodo 2: Enviandolo como arreglo 
    return [data]     
}