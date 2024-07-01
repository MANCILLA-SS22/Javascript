import { useEffect, useState } from 'react'

function useCounter (forwards = true) {

    const [counter, setCounter] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            forwards ? setCounter((prevCounter) => prevCounter + 1) : setCounter((prevCounter) => prevCounter - 1);
        }, 1000);
    
        return function(){
            clearInterval(interval);
        }

    }, [forwards]);

    return counter; //We can return whatever we want when we're using custom hooks.
}
export default useCounter;