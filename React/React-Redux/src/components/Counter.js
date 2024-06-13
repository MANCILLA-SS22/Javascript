import classes from '../components/css/Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/counterSlice.js';

function Counter() {
  const dispatch = useDispatch();
  //With "counter", we make React-redux aware of the fact that we wanna dive into the slice into the state produced by the slice's reducer (mainStore.js), and then in that state slice 
  //we simply have a property named "value" or "showCounter" (counterSlice.js).
  const ctr = useSelector(state => state.counter.value);
  const showCtr = useSelector(state => state.counter.showCounter);

  // "counterActions" is an object which has the reducer method names (increment, decrement, increase, toggleCounter) as keys. Now we call those actions which will be executed as methods.
  function toggleCounterHandler() {
    dispatch(counterActions.toggleCounter());
  };

  function incrementHandler() {
    dispatch(counterActions.increment());
  } 

  function decrementHandler() {
    dispatch(counterActions.decrement());
  }

  function increaseHandler() {
    dispatch(counterActions.increase(10)); //We can send any kind of data and we'll get an object with the "type" and "payload" keys (they're default keys and aren't up to you)
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCtr && <div className={classes.value}>{ctr}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button> 
    </main>
  );
};

export default Counter;