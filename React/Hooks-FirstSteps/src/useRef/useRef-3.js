//Uso de useRef
import React, { useRef } from "react";

function App() {
    const count = useRef(0);

    function handleClick(incrementar){
        incrementar ? count.current++ : count.current--;
        
        //Gracias al uso de useRef, podemos visualizar en consola el valor inicial (actual) que se esta modificando. Lo cual con useState no es posible por ser una funcion asincrona y mostrar siempre el valor previo al cambio de estado (render).
        console.log(`Contador ${count.current}`);
    };

    console.log("Render!!"); //Al usar useRef, esta linea de codigo se ejecutara UNICAMENTE cuando se cargue la aplicacion, ya que el hook useRef, en este caso, evita que la aplicacion se re-renderice cada vez que modifiquemos algo.

    return (
        <>
            <button onClick={() => handleClick(false)}>Decrementar</button>
            <button onClick={() => handleClick(true)}>Incrementar</button>
        </>
    );
}

export default App;



//Uso de useState
// import React, { useState } from "react";

// function App() {
//     const [count, setCount] = useState(0); //We can avoid useState running everytime we render our component. This is so we can avoid our program getting slow.

//     function handleClick(incrementar){
//         incrementar ? setCount(count + 1) : setCount(count - 1);
        
//         //Al usar useState, el cual es una funcion (hook) asincrona, obtendremos en consola siempre el valor anterior, pero en nuestro render el valor actual. Es decir, cuando cargamos la pagina, count = 0, y al precionar el boton "incrementar", 
//         //el estado cambiara y en la aplicacion veremos ahora el numero 1, pero en la consola obtendremos siempre el valor enterior, que es 0. 
//         console.log(`Contador ${count}`); 
//     };

//     console.log("Render!!"); //Al usar useState, esta linea de codigo se ejecutara una y otra vez segun presionemos los botones de abajo, lo cual a nivel de un proyecto grande, no es bueno reenderizar muchas veces nuestro codigo.

//     return (
//         <>
//             <button onClick={() => handleClick(false)}>Decrementar</button>
//             <div>{count}</div>
//             <button onClick={() => handleClick(true)}>Incrementar</button>
//         </>
//     );
// }

// export default App;