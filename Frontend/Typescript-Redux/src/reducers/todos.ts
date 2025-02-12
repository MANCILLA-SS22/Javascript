import { Todo, ActionTypes, Action } from "../actions/main";

function todosReducer(state: Todo[] = [], action: Action): Todo[]{
    switch(action.type){
        case ActionTypes.fetchTodos:
            return action.payload;

        case ActionTypes.deleteTodos:
            return state.filter((todo: Todo) => todo.id !== action.payload);

        default:
            return state;
    }
};

export{todosReducer}