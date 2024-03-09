// Using custom Hooks
import Input from './Input';
import {isEmail, isNotEmpty, hasMinLength} from '../util/validation.js'
import { useInput } from '../hooks/useInput';

function StateLogin() {
    const {
        value: emailValue, 
        handleInputChange: handleEmaillChange, 
        handleInputBlur: handleEmailBlur, 
        hasError: emailHasError
    } = useInput("", (value) => isEmail(value) && isNotEmpty(value))
    
    const {
        value: passwordValue, 
        handleInputChange: handlePasswordChange,
        handleInputBlur: handlePasswordBlur, 
        hasError: passwordHasError
    } = useInput("", (value) => hasMinLength(value, 6));

    function handleSubmit(event) {
        event.preventDefault();

        if (emailHasError || passwordHasError) {
            return;
        }

        console.log(emailValue, passwordValue);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="control-row">
                <Input label="Email" id="email" error={emailHasError && "Please enter a valid email!"} type="email" name="email" value={emailValue} onChange={handleEmaillChange}  onBlur={handleEmailBlur}/>
                <Input label="Password" id="password" error={passwordHasError && "Please enter a valid password!"} type="password" name="password" value={passwordValue} onChange={handlePasswordChange} onBlur={handlePasswordBlur} />
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
};

export default StateLogin;




// Without using custom Hooks
/* import React, { useState } from 'react';
import Input from './Input';
import {isEmail, isNotEmpty, hasMinLength} from '../util/validation.js'

function StateLogin() {
    const [enteredValues, setEnteredValues] = useState({
        email: "",
        password: ""
    });
    
    const [didEdit, setDidEdit] = useState({
        email: false,
        password: false
    });

    const emailIsinvalid = didEdit.email && !isEmail(enteredValues.email) && !isNotEmpty(enteredValues.email);
    const passwordIsInvalid = didEdit.password && !hasMinLength(enteredValues.password, 6);

    function handleSubmit(event) {
        event.preventDefault();
        
        // setEnteredValues({
        //     email: "",
        //     password: ""
        // });
    }

    function handleInputChange(identifier, value){
        setEnteredValues(function (prevValues){
            return{
                ...prevValues, //We pass our existing key values pairs by using (...), because we canna update one of the 2 fields in the useState object, 
                [identifier]: value //The other field with its current value shouldn't be lost, and then we would uptdate the field that is identified by the "identifier" parameter. This syntax allow us to dynamically access a property in an object and set a property where the name of the property is stored in a variable or parameter
            }
        });

        setDidEdit(function (prevEdit){
            return{
                ...prevEdit,
                [identifier]: false
            }
        });
    };

    function handleInputBlur(identifier){
        setDidEdit(function (preEdit){
            return{
                ...preEdit,
                [identifier]: true
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="control-row">
                <Input label="Email" id="email" error={emailIsinvalid && "Please enter a valid email!"} type="email" name="email"  onChange={(event) => handleInputChange("email", event.target.value)} value={enteredValues.email} onBlur={() => handleInputBlur("email")}/>
                <Input label="Password" id="password" error={passwordIsInvalid && "Please enter a valid password!"} type="password" name="password"  onChange={(event) => handleInputChange("password", event.target.value)} onBlur={() => handleInputBlur("password")} value={enteredValues.password}/>                
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
};

export default StateLogin; */