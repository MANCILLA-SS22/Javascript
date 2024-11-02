import React from 'react';
import { INITIAL_STATE } from '../useReducer-3/TodoFunction';

function Todo({event, dispatch}){
    return (
        <div>
            <span style={{color: event.complete ? "red" : "blue"}}>{event.name}</span>
            <button onClick={() => dispatch({type: INITIAL_STATE.TOGGLE_TODO, payload: {id: event.id}})}>Toggle</button>
            <button onClick={() => dispatch({type: INITIAL_STATE.DELETE_TODO, payload: {id: event.id}})}>Delete</button>
        </div>
    )
}

export default Todo