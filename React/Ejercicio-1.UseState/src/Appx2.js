import React, { useState } from "react";

function Appx2() {

  const [count, setCount] = useState(res); //We can avoid useState running everytime we render our component. This is so we can avoid our program getting slow.
//   const [count, setCount] = useState(() => res());

  function res(){
      console.log("Hello world!");
      return 5;
    }
  

  function incrementCount(){
    setCount(prevCount => prevCount + 1);
  }

  function decrementCount(){
    setCount(prevCount => prevCount - 1); 
  }

  return (
    <>
      <button onClick={decrementCount}>-</button>
      <span>{count}</span>
      <button onClick={incrementCount}>+</button>
    </>
  );
}

export default Appx2;