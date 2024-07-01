import classes from '../components/css/Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/counterSlice.js';
import { useState } from 'react';

function Counter() {
  const dispatch = useDispatch();
  //With "counter", we make React-redux aware of the fact that we wanna dive into the slice into the state produced by the slice's reducer (mainStore.js), and then in that state slice 
  //we simply have a property named "value" or "showCounter" (counterSlice.js).
  const ctr = useSelector(state => state.counter.value);
  const showCtr = useSelector(state => state.counter.showCounter);
  const [incrementAmount, setIncrementAmount] = useState(0);
  const addValue = Number(incrementAmount) || 0;

  // "counterActions" is an object which has the reducer method names (increment, decrement, increase, toggleCounter) as keys. Now we call those actions which will be executed as methods.
  function incrementHandler() {
    dispatch(counterActions.increment());
  } 

  function decrementHandler() {
    dispatch(counterActions.decrement());
  }

  function increaseHandler(val) {
    dispatch(counterActions.increase(val)); //We can send any kind of data and we'll get an object with the "type" and "payload" keys (they're default keys and aren't up to you)
  }

  function resetHandler(){
    setIncrementAmount(0);
    dispatch(counterActions.reset());
  }

  function toggleCounterHandler() {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCtr && <div className={classes.value}>{ctr}</div>}
      
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>

      <input type="text" value={incrementAmount} onChange={(e) => setIncrementAmount(e.target.value)} />
      <div>
        <button onClick={() => increaseHandler(addValue)}>Add Amount</button>
        <button onClick={resetHandler}>Reset</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button> 
    </main>
  );
};

export default Counter;