import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";


const ResultModal = forwardRef(function({targetTime, remainingTime, onReset}, ref){ 
    const dialogRef = useRef();
    const userLost = remainingTime <= 0;
    const formattedRewmainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - (remainingTime / (targetTime*1000))) * 100);
    const res = userLost ? <h2>You lost!</h2> : <h2>Your Score: {score}</h2>

    

    useImperativeHandle(ref, function () { //This "ref" comes from  forwardRef(function({targetTime, remainingTime, onReset}, ref){}
        return {
            open(){
                dialogRef.current.showModal();
            }
        }
    }); 
    
    return createPortal(
        <dialog className='result-modal' ref={dialogRef} onClose={onReset}>
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

//When we use forwardRef, its first parameter refers to the props and the second one is the ref attribute passed by the parent component.

//const dialogRef = useRef();
//We'll need a separate ref for reaching out to the dialog because the idea now is to detach the <dialog> element, which is used in ResultModal from any other outer components. In this case, from TimerChallenge.