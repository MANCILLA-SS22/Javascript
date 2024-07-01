import React, { useReducer, useRef } from "react";
import { formReducer, INITIAL_STATE } from "./formReducer";

function Form() {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const tagRef = useRef();

  function handleChange(event){
    dispatch({
      type: "CHANGE_INPUT",
      payload: { 
        name: event.target.name, 
        value: event.target.value 
      }
    });
  };

  function handleTags() {
    const tags = tagRef.current.value.split(",");
    console.log(tags)
    tags.forEach((tag) => dispatch({ type: "ADD_TAG", payload: tag })); //tag will be a number selected in the tags input.
  };

  return (    
    <div>
      <form>
        <input type="text" placeholder="Title" onChange={handleChange} name="title" />
        <input type="text" placeholder="Desc" onChange={handleChange} name="desc" />
        <input type="number" placeholder="Price" onChange={handleChange} name="price" />
        <p>Category:</p>
        <select onChange={handleChange} name="category">
          <option value="sneakers">Sneakers</option>
          <option value="tshirts">T-shirts</option>
          <option value="jeans">Jeans</option>
        </select>
        <p>Tags:</p>
        <textarea ref={tagRef} placeholder="Seperate tags with commas..."></textarea>
        <button onClick={handleTags} type="button">Add Tags</button>
        <div className="tags">
          {state.tags.map((tag) => (
            <small onClick={() => dispatch({ type: "REMOVE_TAG", payload: tag })} key={tag}>
              {tag}
            </small>
          ))}
        </div>
        <div className="quantity">
          <button onClick={() => dispatch({ type: "DECREASE" })} type="button"> - </button>
          <span>Quantity ({state.quantity})</span>
          <button onClick={() => dispatch({ type: "INCREASE" })} type="button"> + </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
