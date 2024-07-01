import { useState } from "react";

function Form() {
    const [userData, setUserData] = useState({Name: "",lastName:""}); //console.log(userData);

    function handleSubmit(evento){ //console.log(evento);
        evento.preventDefault();
        
        if (!userData.lastName.includes("@") || userData.Name.length < 3) {
            console.log("El campo no es vallido");
            return; //Este return ocaciona que la funcion se corte o ya no se ejecute.
        }

        let data = {
            "nombreUsuario": userData.Name,
            "apellidoUsuario": userData.lastName
        }
    console.log(data);
    }

    function handleChange(evento){
        setUserData({...userData, [evento.target.name]: evento.target.value});   console.log([evento.target.name], " --- ", evento.target.name);
    }   
/*  Usamos corchetes en evento.target.name porque lo que estamos reciviento es un STRING. Por lo cual, para acceder a un elemento string de un objeto, no podemos hacer 
    algo como esto: evento.target.name. Para ello, debemos usar todo eso dentro de unos corchetes para obtener el string dentro de los "", y de esa manera, poder apceder a la clave
    el atributo "name" en evento.target.name representa el perteneciente al formulario, los cuales son los de Name y lastName */
    
    return (
        <div>
            <h2>Este es el formlario</h2>    
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Ingrese su nombre" name="Name" onChange={handleChange}/>
                <input type="text" placeholder="Ingrese su apellido" name="lastName" onChange={handleChange}/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default Form

/* import { useState } from "react";

function Form() {
    const [userData, setUserData] = useState({name: "",lastName:""})
    console.log(userData);

    function handleSubmit(evento){
        evento.preventDefault();
        //console.log(evento);

        let data = {
            nombreUsuario: userData.name,
            apellidoUsuario: userData.lastName
        }
    console.log(data);
    }

    function handleName(evento){
        setUserData({...userData, name: evento.target.value})
    }

    function handleLastName(evento){
        setUserData({...userData, lastName: evento.target.value })
    }
    


    return (
        <div>
            <h2>Este es el formlario</h2>    
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Ingrese su nombre" name="name" onChange={handleName}/>
                <input type="text" placeholder="Ingrese su apellido" name="lastName" onChange={handleLastName}/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default Form */

/* import { useState } from "react";

function Form() {

    //Este estado sirve para guardar la informacion contenida en los imputs. Si no los tenemos, estos no mandaran la informacion contenida en ellos al backend.
    const [userData, setUserData] = useState(""); 
    //console.log(userData);

    function handleSubmit(evento){
        evento.preventDefault();
        console.log(evento);

        let data = {
            nombreUsuario: userData
        }
    console.log(data);
    }

    //La funcion handleName representa un onChange. Lo que quiere decir que siempre que haya el mas minimo cambio en el imput, el onChange se dispara.
    function handleName(evento){
        setUserData(evento.target.value);
        //console.log(evento.target.name);
    }

    return (
        <div>
            <h2>Este es el formlario</h2>
    
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Ingrese su nombre" name="name" onChange={handleName}/> 
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
} 

export default Form */

