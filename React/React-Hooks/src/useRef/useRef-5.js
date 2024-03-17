import React, { useRef, useState } from "react";

function App() {
    const [randomInput, setRandomInput] = useState("");
    const [seconds, setSeconds] = useState(0);
    const renders = useRef(0);
    const timerId = useRef();

    function handleCheck(event){
        setRandomInput(event.target.value);
        renders.current++;
    };

    function startTimer(){
        timerId.current = setInterval(() => {
        renders.current++;
        setSeconds(prev => prev + 1)
        }, 1000);
    }

    function stopTimer(){
        clearInterval(timerId.current);
        timerId.current = 0;
    }

    function resetTimer(){
        stopTimer();
        if(seconds){
            renders.current++;
            setSeconds(0);
        }
    }

    return (
        <main>
            <input type="text" value={randomInput} placeholder="Random Input" onChange={handleCheck}/>
            <p>Renders: {renders.current++}</p>
            <br />
            <section>
                <button onClick={startTimer}>Start</button>
                <button onClick={stopTimer}>Start</button>
                <button onClick={resetTimer}>Start</button>
            </section>
            <br />
            <p>Seconds: {seconds}</p>
            <br />
            <p>{randomInput}</p>
        </main>
    );
}

export default App;