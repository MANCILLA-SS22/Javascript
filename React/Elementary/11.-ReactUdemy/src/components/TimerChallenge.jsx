//Metodo 2
import React, { useState, useRef } from 'react'
import ResultModal from './ResultModal';

function TimerChallenge({ title, targetTime }) {
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000); //timeRemaining will decrease every second and targetTime*1000 will always be the same number.
    const timer = useRef(); // Every component instance of TimerChallenge component will get its own timer ref that works totally independent from the other refs that belong to the other instance of that component. Unlike varaible defined in component functions, this ref will not be reset or cleared when this component re-executes. Instead, just as with state values, React will store these timer values behind the scenes and and make sure that they don't get lost as this component function re-executes. 
    const dialog = useRef();

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000; //Whem app gets started, timerIsActive is false. When we push "start", timerIsActive goes true.

    if (timeRemaining <= 0) { //This line of code is executed when counter reaches out to 0.
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(function (prevTimeRemaining) {
                // console.log(prevTimeRemaining);
                return prevTimeRemaining - 100
            });
        }, 100); //setInterval() will get executed every 10mS over and over again.
    }

    function handleStop() {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} />
            <section className='challenge'>
                <h2>{title}</h2>
                <p className='challenge-time'>{targetTime} seconds{targetTime > 1 ? "S" : ""}</p>

                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? "stop" : "start"}
                    </button>
                </p>

                <p className={timerIsActive ? "active" : undefined}>
                    {timerIsActive ? "Time is running..." : "Timer inactive"}
                </p>
            </section>
        </>
    )
};

export default TimerChallenge;