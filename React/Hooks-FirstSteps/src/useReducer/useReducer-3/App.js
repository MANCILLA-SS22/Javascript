import React, { useReducer, useState } from "react";
import Todo from "./Todo.js";
import { INITIAL_STATE, reducer } from "./TodoFunction.js";

function App(){
  const [state, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  function handleSubmit(event){
    event.preventDefault();
    dispatch({type: INITIAL_STATE.ADD_TODO, payload: {name: name}});
    setName("");
  }

  return (    
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={event => setName(event.target.value)}/>
      </form>
      {
        state.map(event => <Todo key={event.id} event={event} dispatch={dispatch}/>)
      }
    </>
  );
};

export default App