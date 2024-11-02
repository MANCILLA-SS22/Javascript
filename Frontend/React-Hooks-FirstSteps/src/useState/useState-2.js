import React, { useState } from "react";

function Appx3() {
  const [state, setState] = useState({count: 4, theme: "Init"});
  const count = state.count;
  const theme = state.theme;

  function decrementCount(){
    setState(function(prevState){
        return {
            //When we don't use the spread operator, then we overwrite everything within this object into the state value. That's to say, we won't see the "Init" string but the count and the blue and red string.
            ...prevState, 
            count: prevState.count - 1,
            theme: prevState.theme = "blue"
        }
    })
  }

  function incrementCount(){
    setState(function(prevState){
        return {
            //When we don't use the spread operator, then we overwrite everything within this object into the state value. That's to say, we won't see the "Init" string but the count and the blue and red string.
            ...prevState, 
            count: prevState.count + 1,
            theme: prevState.theme = "red"
        }
    })
  }

  return (
    <>
      <button onClick={decrementCount}>-</button>
      <span>{count}</span>
      <span>{theme}</span>
      <button onClick={incrementCount}>+</button>
    </>
  );
}

export default Appx3;