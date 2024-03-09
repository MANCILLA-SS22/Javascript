import React, {useRef, useState} from 'react';
import classes from "./MealItemForm.module.css";
import Input from '../../UI/Input';

function MealItemForm(props) {
    const amountInputRef = useRef();
    const [amountIsValid, setAmountIsValid] = useState(true);
    
    const res = {
        id: "Amount_" + props.id ,
        type: "Number",
        min: "1",
        max: "5",
        step: '1',
        defaultValue: "1"
    }

    const ss = !amountIsValid && <p>Please enter a valid amount (1-5)</p>


    function submitHandler(event){
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label="Amount" input={res} ref={amountInputRef} />
            <button>+ Add</button>
            {ss}
        </form>
    )
}

export default MealItemForm