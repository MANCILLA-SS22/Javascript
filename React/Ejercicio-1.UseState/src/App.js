import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(5);

  function incrementCount(){
    // setCount(count + 1);
    setCount(prevCount => prevCount + 1);
  }

  function decrementCount(){
    // setCount(count - 1);
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

export default App;

// To understand which method to use, let's consider that we duplicate this line of code and the previous one. So we'd have at the first leg:  
    
    // setCount(count + 1);
    // setCount(count + 1);

// and in the second leg: 

    // setCount(prevCount => prevCount + 1);
    // setCount(prevCount => prevCount + 1);

// Without the prevCount function, and when clicking the decrement button, the number will decrease from 5 to 4 even though we duplicate the same line of code. The reason for 
// this is that our count value in setCount(count + 1) is just the alue of count when we render our function. So, we're calling setCount function and returning 4 twice. So, 
// they're overwriting each other.

// On the other hand, when we duplicate the line of code with prevCount and we press the decrement button, then the number will decrease from 5 to 3 and so on. This is like so
// because we're substracting 1 number from the previous count. So basically, we must use the previous state (prevCount) whenever we use useState().
// This is the right way to update the state because by increasing or decrementing, we need to consider the previous state.
