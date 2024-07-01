//Sin styled components
import React, { useState } from 'react';
import Button from '../../UI/Button/Button';
import './CourseInput.css';

function CourseInput(props) {
  const [enteredValue, setEnteredValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  function goalInputChangeHandler(event){
    console.log(event.target); console.log(event.target.value);
    if (event.target.value.trim().length > 0) setIsValid(true);
    setEnteredValue(event.target.value);
  };

  function formSubmitHandler(event){
    event.preventDefault();
    if(enteredValue.trim().length === 0){
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={`form-control ${!isValid ? "invalid" : ""}`}>
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler}/> {/* <input type="text" onChange={(event) => goalInputChangeHandler(event)}/> This one and the previos one are the same thing*/} 
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;