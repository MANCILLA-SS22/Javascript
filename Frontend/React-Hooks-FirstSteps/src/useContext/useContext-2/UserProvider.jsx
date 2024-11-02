import {createContext, useState, useContext } from "react";

//Al crear estas variables con ayuda del createContext, estamos diciendo que los componentes hijos tendran acceso a la informacion contenida en otros componentes. De esta manera, evitamos el tener que pasar las props de forma 
//secuencial. Es decir, de un componente hijo al siguiente.
const userContext = createContext();
const userToggleContext = createContext();

function useUserContext() {
    return useContext(userContext);
}

function useUserToggleContext() {
    return useContext(userToggleContext);
}


function UserProvider(props){
    const [usuario, setUsuario] = useState(null);

    function logginToggle() {
        usuario ? setUsuario(null) : setUsuario({name: 'Luis',email: 'luis@mail.com'});
    }
    const hi = "Hola Mundo!"
    
    const obj = { //Podemos pasar un objeto con todas las funciones, variables, etc. que deseemos al componente proveedor de contexto. Y asi, el componente hijo podra acceder a toda esta informacion
        logginToggle, 
        hi
    }

    return (
        <userContext.Provider value={usuario}> {/* Cualquier componenete que se encuentre dentro de userContext.Provider, tendra acceso a todo lo que se encuentre en la variable 'user'. */}
            <userToggleContext.Provider value={obj}> {/* Cualquier componenete que se encuentre dentro de userToggleContext.Provider, tendra acceso a todo lo que se encuentre en la variable 'cambiaLogin'. */}
                {props.children} {/* Todo esto sera inyectado en todos los compopnentes hijos de nuestro componente UserProvider. En este ejemplo, unicamente tenemos uno y es <Hijo/> */}
            </userToggleContext.Provider>
        </userContext.Provider>
    );
}

export {UserProvider, useUserContext, useUserToggleContext};