import React, { useEffect, useState } from "react";

function Interval() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        function intervalId(){
            console.log("Interval");
            setCount(function(prevCount){
                return prevCount + 1;
            });
        };

        return function(){
            clearInterval(intervalId)
        }
    }, []);

    return(
        <div>
            <h1>{count}</h1>
        </div>
    )
}

function App(){
    const [show, setShow] = useState(true);

    return (
        <div>
            {show && <Interval/>}
            <button onClick={() => setShow(!show)}>Mostrat/Ocultar</button>
        </div>
    )
}

export default App;