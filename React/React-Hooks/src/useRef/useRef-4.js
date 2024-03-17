import React, { useEffect, useRef, useState } from "react";

function App() {
    const timer = useRef(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        timer.current = setInterval(() => setCount(prevValue => prevValue + 1), 1000);
    }, []); //Ponemos un array vacio porque, una vez que se haga el renderizado, se ejecutara lo que hay dentro de este useEffect y SOLO una vez. Y al no haber nada adentro, significa que el valor percistira aunque los estados cambien.

    function handleClick(){
        clearInterval(timer.current);
        timer.current = 0;
    }

    console.log("Render!!");

    return (
        <>
            <p>Count: {count}</p>
            <button onClick={handleClick}>Parar!</button>
        </>
    );
}

export default App;