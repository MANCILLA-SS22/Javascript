import { useReducer, useState } from "react";

function Post() {

  const ACTION_TYPES = {
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
  };
  
  const INITIAL_STATE = {
    loading: false,
    post: {},
    error: false,
  };

  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

  function postReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_START:
      return {
        loading: true,
        error: false,
        post: {},
      };
    case ACTION_TYPES.FETCH_SUCCESS:
      return {
        ...state, //At the beginning, we have {loading: true,error: false,post: {}} by default. So, there's no need to re-write the same keys & values if the result is the same as before. That's why we use the spread operator (...). And just write the ones which will be going to change its parameters.
        loading: false,
        post: action.payload,
      };
    case ACTION_TYPES.FETCH_ERROR:
      return {
        error: true,
        loading: false,
        post: {},
      };
    default:
      return state;
  }
};

  function handleFetch() {
    dispatch({ type: ACTION_TYPES.FETCH_START });
    
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: data });
      })
      .catch((err) => {
        dispatch({ type: ACTION_TYPES.FETCH_ERROR });
      });
  };

  return (    
    <div>
      <button onClick={handleFetch}>
        {state.loading ? "Wait..." : "Fetch the post"}
      </button>
      <p>{state.post?.title}</p>
      <span>{state.error && "Something went wrong!"}</span>
    </div>
  );
};

export default Post;
