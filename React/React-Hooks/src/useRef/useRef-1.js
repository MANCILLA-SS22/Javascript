import React, { useEffect, useRef, useState } from 'react'

function App(){
    const [contador, setContador] = useState(0);
    const nombre = useRef("German");
    const renderCount = useRef(0);
    const botonContadorRef = useRef();

    
    useEffect(() => {
        console.log(botonContadorRef.current);
        if(renderCount.current === 0){
            renderCount.current += 1;
            return
        };
        console.log(`El contador se actualizo y su nuevo valor es ${contador}`);
    }, [contador]);

    function cambiarNombre(){
        nombre.current = "Mancilla";
        console.log(`Tu nuevo nombre es ${nombre.current}`);
    }

    return (
        <div>
            <h1>Contador: {contador}</h1>
            <button ref={botonContadorRef} onClick={() => setContador(contador + 1)}>+1</button>
            <br />
            <h1>Nombre: {nombre.current}</h1>
            <button onClick={cambiarNombre}>Cambiar Nombre</button>
        </div>
    )
}

export default App