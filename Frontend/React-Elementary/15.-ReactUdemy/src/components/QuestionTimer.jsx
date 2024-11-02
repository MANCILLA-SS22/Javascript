import React, { useEffect, useState } from 'react'

function QuestionTimer({timeout, onTimeout, mode}){
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(() => {
            onTimeout;
        }, timeout);
    
        return function() {
            clearTimeout(timer)
        }
    }, [timeout, onTimeout]);
    

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100)
        }, 100)
    
        return function(){
            clearInterval(timer)
        }
    }, []);
    

    return <progress id='question-time' max={timeout} value={remainingTime} className={mode} />
}

export default QuestionTimer;