import React, { useEffect, useState } from "react";

function App() {
    const [count, setCount] = useState(0);
    const [play, setPlay] = useState(true);

    useEffect(() => {
        if (!play) return;
        
        const intervalId = setInterval(() => {
            console.log("Interval");
            setCount(function(prevCount){
                return prevCount + 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [play]);

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => setPlay(!play)}>{play ? "Pause" : "Play"}</button>
        </div>
    )
}

export default App;