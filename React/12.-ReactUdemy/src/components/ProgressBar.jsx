import React, { useEffect, useState } from 'react'

function ProgressBar({timer}){
    const [remainingTime, setRemainingTime] = useState(timer);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 10)
        }, 10);
    
        return function(){
            clearInterval(timer);
        }
    }, []);

    return <progress value={remainingTime} max={timer}/>;
}

export default ProgressBar;