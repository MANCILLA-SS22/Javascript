const INITIAL_STATE = {
  title: "",
  desc: "",
  price: 0,
  category: "",
  tags: [],
  images: {sm: "", md: "", lg: ""},
  quantity: 0,
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

export {INITIAL_STATE, formReducer};