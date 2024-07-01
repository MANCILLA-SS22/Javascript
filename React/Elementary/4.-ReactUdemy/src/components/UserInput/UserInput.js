import React, {useState} from "react";

const initialUserInput = {
    currentSavings: 10000,
    yearlyContribution: 1200,
    expectedReturn: 7,
    duration: 10,
}

function UserInput(props){

    const [userInput, setUserInput] = useState(initialUserInput);
    
    function submiHandler(event){
        event.preventDefault();

        props.onCalculate(userInput);
    }

    function resetHandler(){
        setUserInput(initialUserInput);
    }

    function inputChangeHandler(input, value){ //Since inputChangeHandler is passed as a value to onChange, will only be executed by react whenever the value in this input changes. So therefore, indirectly inputChangeHandler will only be executed when the input value changes. We must use arrow functions in this function because we have to pass in two arguments (input and value) instead of only one. That's to say, if we wouldn't use arrow functions, then we would be just passin in one argument, which will be "event". An arrow function prevents the inputChangeHandler() function from executing after the component is mounted. It onlys execute when users add a new character.         
        setUserInput(function(prevInput){ //We have to call setUserInput when the inputChangeHandler is triggered, becasue there, we want to update the state object and stor the latest entered values in that state object. Now, in inputChangeHandler, we want to set our state to a new object, which of course should be based on the old object because we don't want to discard the values that we're not changing. Sp, that's why we use this anonymus arrow function for updating the state by passing a function to this state updating dunction (setUserInput). And finally, this function will recieve the latest values (previously stored user input) in "prevInput" , and should then yield a new object representing the new state. 
            return{
                ...prevInput, //We use spread operator because we want to OVERWRITE (update) an specific value (or more) in the object. If we wouldn't use the spread operator, we would be getting new values in the object. This is also used to mantain the whole object with their other values, but with old old utdated. If we se this, then we'll get a new object with the only change made, and the rest of the object will disappear.
                [input]: value //To understand the [input], see the Ejemplo 13: Square Brackets Javascript Object Key in "ApunteDeClase".
            }
        })
    }

    // console.log(userInput);

    return(
        <form onSubmit={submiHandler} className="form">
            <div className="input-group">
                <p>
                    <label htmlFor="current-savings">Current Savings ($)</label>
                    {/*Remember that value={userInput.currentSavings} is used to show the actual number (Or in this case, the state value), in the DOM. */}
                    <input onChange={(event) => inputChangeHandler("currentSavings", event.target.value)} value={userInput.currentSavings} type="number" id="current-savings" />
                </p>
                <p>
                    <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
                    <input onChange={(event) => inputChangeHandler("yearlyContribution", event.target.value)} value={userInput.yearlyContribution} type="number" id="yearly-contribution" />
                </p>
            </div>
            <div className="input-group">
                <p>
                    <label htmlFor="expected-return">Expected Interest (%, per year)</label>
                    <input onChange={(event) => inputChangeHandler("expectedReturn", event.target.value)} value={userInput.expectedReturn} type="number" id="expected-return" />
                </p>
                <p>
                    <label htmlFor="duration">Investment Duration (years)</label>
                    <input onChange={(event) => inputChangeHandler("duration", event.target.value)} value={userInput.duration} type="number" id="duration" />
                </p>
            </div>
            <p className="actions">
                <button onClick={resetHandler} type="reset" className="buttonAlt">Reset</button>
                <button type="submit" className="button">Calculate</button>
            </p>
        </form>
    )
};

export default UserInput;
