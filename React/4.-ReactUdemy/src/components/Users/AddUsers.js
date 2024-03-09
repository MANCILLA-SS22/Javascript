/* //Metodo sin useRefs();
import React, {useState} from "react";
import Card from "../UI/Card.js";
import classes from "./AddUser.module.css"
import Button from "../UI/Button.js";
import ErrorMessage from "../UI/ErrorMessage.js";
import Wrapper from "../Helpers/Wrapper.js";

function AddUser(props) {
    
    const initialFormValues = {
        username: '',
        age: '',
    }

    const [formValues, setFormValues] = useState(initialFormValues);
    const [error, setError] = useState();
    
    function handleInputChange(event){
        setFormValues({
            ...formValues, //We use spread operator because we want to OVERWRITE (update) an specific value (or more) in the object. If we wouldn't use the spread operator, we would be getting new values in the object. This is also used to mantain the whole object with their other values, but with old old utdated. If we se this, then we'll get a new object with the only change made, and the rest of the object will disappear.
            [event.target.name]: event.target.value,
        })
    }

    function addUserHandler(event){
        event.preventDefault();
        if(formValues.username.trim().length === 0 || formValues.age.trim().length === 0){
            setError({
                title: "Invalid input!",
                message: "Please enter a valid name (non-empty values)."
            })
            return;
        }

        if(+formValues.age < 1){
            setError({
                title: "Invalid input!",
                message: "Please enter a valid age (> 0)."
            })
            return;
        }

        props.onAddUser(formValues.username, formValues.age);
        setFormValues(initialFormValues);
    }

    function handleError(){
        setError(null);
    }

    return (
        <Wrapper>
            {error && <ErrorMessage title={error.title} message={error.message} onConfirm={handleError} />}
            <Card className={classes.input}>
                This form should be output inside of the card, and the card component should output what's passed between the opening and closing tags off card. 
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={formValues.username} onChange={handleInputChange}/>
                    <label htmlFor="age">Age</label>
                    <input type="number" id="age" name="age" value={formValues.age} onChange={handleInputChange}/>
                    <Button type="submit">Add user</Button>
                </form>
            </Card>
        </Wrapper>
    )
} 

export default AddUser;*/

import React, {useRef, useState} from "react";
import Card from "../UI/Card.js";
import classes from "./AddUser.module.css"
import Button from "../UI/Button.js";
import ErrorMessage from "../UI/ErrorMessage.js";
import Wrapper from "../Helpers/Wrapper.js";

function AddUser(props) {
    const nameInputRef = useRef(); //console.log(nameInputRef);
    const ageInputRef = useRef();  //console.log(ageInputRef);

    const [error, setError] = useState();
    
    //It returns a value which allow to work with that ref later, so which allow us to work with that element to which we're goning to connect it. You can connect any HTML element to one of your references.
    //With that, we're connecting these refs with the JSX code (in the return section) that is rendered in by the same component. So, when react reaches the code in the return section and then reaches that code, it will actually set the values stored in the two variables bellos to the native DOM elements, that is rendered based on the two inputs.
    //We plan on connecting this ref with the first input which allow to enter a username and then the age.
    

    function addUserHandler(event){
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredAge = nameInputRef.current.value;

        if(enteredName.trim().length === 0 || enteredAge.trim().length === 0){
            setError({
                title: "Invalid input!",
                message: "Please enter a valid name (non-empty values)."
            })
            return;
        }

        if(+enteredAge < 1){
            setError({
                title: "Invalid input!",
                message: "Please enter a valid age (> 0)."
            })
            return;
        }

        props.onAddUser(enteredName, enteredAge);
        nameInputRef.current.value = "";
        ageInputRef.current.value = "";

    }

    function handleError(){
        setError(null);
    }

    return (
        <Wrapper>
            {error && <ErrorMessage title={error.title} message={error.message} onConfirm={handleError} />}
            <Card className={classes.input}>
                {/* This form should be output inside of the card, and the card component should output what's passed between the opening and closing tags off card.  */}
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" ref={nameInputRef}/>
                    <label htmlFor="age">Age</label>
                    <input type="number" id="age" name="age" ref={ageInputRef}/>
                    <Button type="submit">Add user</Button>
                </form>
            </Card>
        </Wrapper>
    )
}

export default AddUser;