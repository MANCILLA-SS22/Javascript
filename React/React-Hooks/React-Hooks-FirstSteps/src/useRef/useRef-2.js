import React, { useEffect, useRef, useState } from 'react'

function App(){
    const [name, setName] = useState("");
    const renderedCount = useRef(1);
    const prevName = useRef("");
    const inputRef = useRef();
    
    useEffect(() => {
        prevName.current = name;
        renderedCount.current += 1;
    }, [name]);

    function focusInput(){
        inputRef.current.focus();
        // inputRef.current.value = "Some Value";
    }

    return (
        <>
            <input ref={inputRef} value={name} onChange={event => setName(event.target.value)} />
            <div>My name is {name}</div>
            <div>I rendered {renderedCount.current} times</div>
            <div>And it used to be {prevName.current}</div>
            <button onClick={focusInput}>Focus</button>
        </>
    )
}

export default App