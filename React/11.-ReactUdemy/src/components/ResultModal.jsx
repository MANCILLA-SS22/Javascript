import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";


const ResultModal = forwardRef(function ResultModal({targetTime, remainingTime, onReset}, ref){ //When we use forwardRef, its first parameter refers to the props and the second one is the ref attribute passed by the parent component.
    const dialogX2 = useRef(); //We'll need a separate ref for reaching out to the dialog because the idea now is to detach the <dialog> element, which is used in ResultModal from any other outer components. Im this case, from the TimerChallenge component.

    const userLost = remainingTime <= 0;
    const formattedRewmainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - (remainingTime / (targetTime*1000))) * 100);
    const res = userLost ? <h2>You lost!</h2> : <h2>Your Score: {score}</h2>

    useImperativeHandle(ref, function(){ 
        return {
            open(){
                dialogX2.current.showModal();
            }
        }

    }); 

    return createPortal(
        <dialog className='result-modal' ref={dialogX2} onClose={onReset}>
            {res}
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the time with <strong> {formattedRewmainingTime} seconds left.</strong></p>
            <form method='dialog'>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById("modal")
    );
})

export default ResultModal;