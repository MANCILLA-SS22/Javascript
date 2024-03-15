import { useReducer } from "react";
import { ACTION_TYPES, INITIAL_STATE, postReducer } from "./postReducer.js";

function Post() {  
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

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
