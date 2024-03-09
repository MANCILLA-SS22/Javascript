/* //Method 1: Conventional way
import classes from '../components/css/Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';

function Counter(){
  const counter = useSelector(state => state.counter);
  const show = useSelector(state => state.showCounter);
  const dispatch = useDispatch()

  function toggleCounterHandler(){
    dispatch({type: "toggle"})
  }; 

  function incrementHandler(){
    dispatch({type: "increment"});
  }

  function decrementHandler(){
    dispatch({type: "decrement"});
  }

  function increaseHandler(){
    dispatch({type: "increase", amount: 5});
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter; */

/* //Method 2: Using classes
import classes from '../components/css/Counter.module.css';
import { connect } from 'react-redux'
import { Component } from "react";

class Counter extends Component{

  toggleCounterHandler(){
    
  }; 

  incrementHandler(){
    this.props.increment();
  };

  decrementHandler(){
    this.props.decrement();
  }
  
  render(){ //Render in React JS is a fundamental part of class components. It is used to display the component on the UI returned as HTML or JSX components. The ReactDOM.render() function takes two arguments, HTML code and an HTML element.
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.incrementHandler.bind(this)}>Increment</button>
          <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
        </div>
        <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
      </main>
    );
  }
}

function mapStateToProps(state){
  return{
    counter: state.counter
  }
};

  function mapDispatchToProps(dispatch){
    return{
      increment: () => dispatch({type: "increment"}),
      decrement: () => dispatch({type: "decrement"}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter); */

//Method 3: Using classes
import classes from '../components/css/Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/counterSlice.js';

function Counter(){
  const counter = useSelector(state => state.counter.value);
  const show = useSelector(state => state.counter.showCounter);
  const dispatch = useDispatch()

  function toggleCounterHandler(){
    dispatch(counterActions.toggleCounter())
  }; 

  function incrementHandler(){
    dispatch(counterActions.increment());
  }

  function decrementHandler(){
    dispatch(counterActions.decrement());
  }

  function increaseHandler(){
    dispatch(counterActions.increase(10)); //We can send any kind of data and we'll get an object with the following keys (they're deffault keys and aren't up to you) --> {type: SOME_UNIQUE_IDENTIFIER, payload: 10}
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
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