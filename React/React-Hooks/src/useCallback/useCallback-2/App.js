import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'

function App(){
    const [number, setNumber] = useState(1);
    const [dark, setDark] = useState(false);
    const [items, setItems] = useState([]);

    const getItems = useCallback(function(incrementor){
        return [number + incrementor, number + 1 + incrementor, number + 2 + incrementor];
    }, [number]);

    //Cuando haya un cambio de estado, se ejecutara este useEffect, en donde se ejecutara la funcion siempre. Pero, dicha funcion solo se ejecutara si ha cambiado. Con ayuda del
    //useCallback, establecemos que solo cuando cambie el valor "number", la variable getItems retornara una nueva funcion pero a partir del hook useCallback. 
    useEffect(() => { 
        setItems(getItems(1));
    }, [getItems])

    return (
        <div style={{backgroundColor: dark ? "#333" : "#FFF", color: dark ? "#FFF" : "#333"}}>
            <input type="number" value={number} onChange={event => setNumber(parseInt(event.target.value))} />
            <button onClick={() => setDark(prevDark => !prevDark)}>Toggle Theme</button>
            {items.map(event => <div key={event}>{event}</div>)}
        </div>
    )
}

export default App;