import React from 'react'
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useState } from 'react'

function Main(){
    const [cont, setCont] = useState(0);

    function doble(){
        return cont * 2;
    }

    const callback = useCallback(doble, []); //Esto guarda la funcion y nos la regresa tal y como esta cuando se ha generado. ()
    const memo = useMemo(doble, []); //Esto guarda la funcion y nos regresa directamente el resultado, NO la funcion como con useCallback.

    console.log(callback());
    console.log(memo)
    
    return (
        <div>
            <button onClick={() => setCont(cont + 1)}>Incrementar</button>
            <p>{cont}</p>
        </div>
    )
} 

export default Main;