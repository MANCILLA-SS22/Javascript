import React, {useState,useEffect,useReducer,useContext,useRef} from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';
import classes from './Login.module.css';

const initialState = {
  value: "", isValid: null
}

function emailReducer(state, action){ 
    //state = initialState   <>   action = parameter into the dispatch function
    if (action.type === "USER_INPUT") {
      return {value: action.val, isValid: action.val.includes("@")};
    }
    if (action.type === "INPUT_BLUR") {
      return {value: state.value, isValid: state.value.includes("@")};
    }

    return {value: "", isValid: false};    
}

function passwordReducer(state, action){
    //state = initialState   <>   action = parameter into the dispatch function
    if (action.type === "USER_INPUT") {
      return {value: action.val, isValid: action.val.trim().length > 6};
    }
    if (action.type === "INPUT_BLUR") {
      return {value: state.value, isValid: state.value.trim().length > 6};
    }

    return {value: "", isValid: false};    
}

function Login(props) {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, initialState);
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, initialState);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(function(){
    const identifier = setTimeout(function(){
      // console.log("hola");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    function res(){
        // console.log("CLEANUP");
        clearTimeout(identifier);
    }

    return res; // It's important to keep in mind that at the very first side-effect execution. this clean-up function won't be executed. But after that, the clean-up funcion will be executed before every new side-effect execution.
  }, [emailIsValid, passwordIsValid]); //If neither of the three changed, this effect function won't run.

  function emailChangeHandler(event){
    dispatchEmail({type: "USER_INPUT", val: event.target.value});
    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  function passwordChangeHandler(event){
    dispatchPassword({type: "USER_INPUT", val: event.target.value})
    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  function validateEmailHandler(){
    dispatchEmail({type: "INPUT_BLUR"});
  };

  function validatePasswordHandler(){
    dispatchPassword({type: "INPUT_BLUR"})
  };

  function submitHandler(event) {
    event.preventDefault();
    
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input ref={emailInputRef} id="email" label="E-Mail" type="email" onChange={emailChangeHandler} onBlur={validateEmailHandler} isValid={emailIsValid} value={emailState.value}/>
        <Input ref={passwordInputRef} id="password" label="Password" type="password" onChange={passwordChangeHandler} onBlur={validatePasswordHandler} isValid={passwordIsValid} value={passwordState.value}/>
        
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>Login</Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
