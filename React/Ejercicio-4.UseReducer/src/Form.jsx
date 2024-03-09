import React, { useReducer, useRef } from "react";

function Form() {

  const INITIAL_STATE = {
  title: "",
  desc: "",
  price: 0,
  category: "",
  tags: [],
  images: {sm: "", md: "", lg: ""},
  quantity: 0,
};

  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const tagRef = useRef();

  function handleChange(event) {
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
    tags.forEach((tag) => dispatch({ type: "ADD_TAG", payload: tag })); //tag will be a number selected in the tags input.
  };

  function formReducer(state, action) {
  switch (action.type) {

    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value, //We use [action.payload.name] so we can use (uptdate) the actual value of variable as key.
      };

    case "ADD_TAG":
      return {
        ...state,
        tags: [...state.tags, action.payload], // We keep the previous array (...state.tags), and then we'll add one more (action.payload)
      };

    case "REMOVE_TAG":
      return {
        ...state,
        tags: state.tags.filter((tag) => tag !== action.payload),
      };

    case "INCREASE":
      return {
        ...state,
        quantity: state.quantity + 1,
      };

    case "DECREASE":
      return { 
        ...state, 
        quantity: state.quantity - 1 
      };

    default:
      return state;
  }
};

console.log(state)

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
