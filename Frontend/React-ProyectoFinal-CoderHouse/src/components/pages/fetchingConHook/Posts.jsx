import { useFetch } from "../../hooks/useFetch"

function Posts() {

    //Metodo 1: Enviandolo como objeto
    const {datos} = useFetch([], "https://jsonplaceholder.typicode.com/posts"); // Aqui SI importa el nombre, ya que se utiliza el nombre del objeto que se retorno en el hook. en este caso, "datos", que es el nombre de la clave en el objeto.
    console.log(datos);

    /* //Metodo 2: Enviandolo como arreglo
    const [posts] = useFetch([], "https://jsonplaceholder.typicode.com/posts"); //Aqui NO importa el nombre dentro del []
    console.log(posts); */
    
    return (
        <div>Posts</div>
    )
}

export default Posts