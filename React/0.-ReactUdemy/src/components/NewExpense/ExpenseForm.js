import React, {useState} from "react";
import "./ExpenseForm.css"

function ExpenseForm(props){

    /* //Metodo 1
    const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredAmount, setEnteredAmount] = useState("");
    const [enteredDate, setEnteredDate] = useState("");

    function titleChangeHandler(event){
        setEnteredTitle(event.target.value);
    }

    function amountChangeHandler(event){
        setEnteredAmount(event.target.value);
    }

    function dateChangeHandler(event){
        setEnteredDate(event.target.value);
    } 

    function submitHandler(event){
        event.preventDefault();

        const expenseData = {
            title: enteredTitle,
            amount: Number(enteredAmount),
            date: new Date(enteredDate)
        }

        props.onSaveExpenseData(expenseData);

        setEnteredTitle("");
        setEnteredDate("");
        setEnteredAmount("");

        //We put value={enteredTitle} in the input because once we submit the form, we'll update the states to an empty string. So, by having and empty string in the actual state, then the form in the webpage will display nothing (emptu string) as well.
    }
    
    return(
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input type="text" value={enteredTitle} onChange={titleChangeHandler}/> 
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input type="number" min="0.01" step="0.01" value={enteredAmount} onChange={amountChangeHandler}/>
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input type="date" min="2019-01-01" step="2023-12-31" value={enteredDate} onChange={dateChangeHandler}/>
                </div>
            </div>

            <div className="new-expense__actions">
                <button type="submit">Add Expense</button>
            </div>
        </form>
    ); */

    /* //Metodo 2
    //Whenever we update an specific value of the three states, we'll need to update all three and not just one. We also ensure that the other two pieces of data don't get lost.
    //If we would just set your new use input state to this object, you would basically dump the other keys because when you update your state, react will not merge this with 
    //the old state. It will only replece the old state with the new one. And if your new one is an object with one key value pair here, the old state will be replaced and 
    //therefore the other two keys value pairs would be lost. 
    //To solve this, you manually need to copy the other values which you're not updating here. That's why we use the spread operator in userInput. 
    //Finally, once we get the three titles, we need to overwrite the enteredTitle key. Using this method will wnsure that the other values aren't thrown away, but are also part of that new state. 

    const res = {
        enteredTitle: "",
        enteredAmount: "",
        enteredDate: ""
    }

    const [userInput, setUserInput] = useState(res)

    function titleChangeHandler(event){
        setUserInput({...userInput, enteredTitle: event.target.value})
    }

    function amountChangeHandler(event){
        setUserInput({...userInput, enteredAmount: event.target.value})
    }

    function dateChangeHandler(event){
        setUserInput({...userInput, enteredDate: event.target.value})
    } 

    function submitHandler(event){
        event.preventDefault();

        const expenseData = {
            title: userInput.enteredTitle,
            amount: Number(userInput.enteredAmount),
            date: new Date(userInput.enteredDate)
        }

        props.onSaveExpenseData(expenseData);
        setUserInput(res);
        //We put value={enteredTitle} in the input because once we submit the form, we'll update the states to an empty string. So, by having and empty string in the actual state, then the form in the webpage will display nothing (emptu string) as well.
    }
    
    // console.log(userInput.enteredTitle);

    return(
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input type="text" value={userInput.enteredTitle} onChange={(event) => titleChangeHandler(event)}/>
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input type="number" min="0.01" step="0.01" value={userInput.enteredAmount} onChange={amountChangeHandler}/>
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input type="date" min="2019-01-01" step="2023-12-31" value={userInput.enteredDate} onChange={dateChangeHandler}/>
                </div>
            </div>

            <div className="new-expense__actions">
                <button type="submit">Add Expense</button>
            </div>
        </form>
    ); */

    //Metodo 3
    //Whenever you update your state and you depend on the previous state (like in method 2), but also if you would be managing a counter, which you increment by one, for examnple
    //you shouldn't do the one on the method 2. Instead, we should call setUserInput and pass in a function to that funcion (in this case, function(prevState)). That's to say, 
    //we call the function setUserInput() and pass then pass a other function to it. Now, that function we pass in, will automatically be executed by react and it will recive the 
    //previous state snapchot(estado instantaneo) for that state for which you're calling the updating function. In this case, for the object with the three states. So, we'll get 
    //the previous state snapshot and then we should return the new state snapshot (line 75, 81 and 87). Keep in mind that React schedules state updates, it doesn't perform them 
    //instantly. And therefore, if you schedule a lot of state at the same time, you could be depending  on an outdated or incorrect state snapshot if we use the method 2. 
    //If we use this apporach, React will guarantee that the state snapshot it gives you here in this inner function, will always be the latest state snapshot keeping all 
    //scheduled state updates in mind. We should use this function syntax whenever your state update depends on the previous state. 

    const res = {
        enteredTitle: "",
        enteredAmount: "",
        enteredDate: ""
    }

    const [userInput, setUserInput] = useState(res)

    function titleChangeHandler(event){
        setUserInput(function(prevState){
            return {
                ...prevState, 
                enteredTitle: event.target.value
            }
        })
    }

    function amountChangeHandler(event){
        setUserInput(function(prevState){
            return {
                ...prevState, 
                enteredAmount: event.target.value
            }
        })
    }

    function dateChangeHandler(event){
        setUserInput(function(prevState){
            return {
                ...prevState, 
                enteredDate: event.target.value
            }
        })
    } 

    function submitHandler(event){
        event.preventDefault();

        const expenseData = {
            title: userInput.enteredTitle,
            amount: Number(userInput.enteredAmount),
            date: new Date(userInput.enteredDate)
        }

        props.onSaveExpenseData(expenseData);
        setUserInput(res);
        //We put value={enteredTitle} in the input because once we submit the form, we'll update the states to an empty string. So, by having and empty string in the actual state, then the form in the webpage will display nothing (emptu string) as well.
    }
    
    return(
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input type="text" value={userInput.enteredTitle} onChange={(event) => titleChangeHandler(event)}/>
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input type="number" min="0.01" step="0.01" value={userInput.enteredAmount} onChange={(event) => amountChangeHandler(event)}/>
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input type="date" min="2019-01-01" step="2023-12-31" value={userInput.enteredDate} onChange={(event) => dateChangeHandler(event)}/>
                </div>
            </div>

            <div className="new-expense__actions">
                <button type="submit">Add Expense</button>
            </div>
        </form>
    );

    /* //Metodo 4
    const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredAmount, setEnteredAmount] = useState("");
    const [enteredDate, setEnteredDate] = useState("");

    function inputChangeHandler(identifier, value){
        if (identifier === "title") {
            setEnteredTitle(value);
        }else if (identifier === "date") {
            setEnteredDate(value);
        }else if (identifier === "amount"){
            setEnteredAmount(value);
        }
    }

    return(
        <form>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input type="text" onChange={function(event){inputChangeHandler("title", event.target.value)}}/>
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input type="number" min="0.01" step="0.01" onChange={function(event){inputChangeHandler("date", event.target.value)}}/>
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input type="date" min="2019-01-01" step="2023-12-31" onChange={function(event){inputChangeHandler("amount", event.target.value)}}/>
                </div>
            </div>

            <div className="new-expense__actions">
                <button type="submit">Add Expense</button>
            </div>
        </form>
    ); */
}

export default ExpenseForm;