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

export { ACTION_TYPES, INITIAL_STATE, postReducer}