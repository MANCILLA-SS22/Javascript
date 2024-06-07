import { useFetch } from "../../hooks/useFetch"

function Users(){

    /* //Metodo 1: Enviandolo como objeto
    const {datos} = useFetch([], "https://jsonplaceholder.typicode.com/users"); // Aqui SI importa el nombre, ya que se utiliza el nombre del objeto que se retorno en el hook. en este caso, "datos", que es el nombre de la clave en el objeto.
    console.log(datos); */

    //Metodo 2: Enviandolo como arreglo
    const [users] = useFetch([], "https://jsonplaceholder.typicode.com/users"); //Aqui NO importa el nombre dentro del []
    console.log(users);

    return (
        <div>Users</div>
    )
}

export default Users