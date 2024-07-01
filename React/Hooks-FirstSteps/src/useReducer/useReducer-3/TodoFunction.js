const INITIAL_STATE = {
    ADD_TODO: "add-todo",
    TOGGLE_TODO: "toggle-todo",
    DELETE_TODO: "delete-todo"
};

function reducer(state, action){
    switch(action.type){
        case INITIAL_STATE.ADD_TODO:
            return [...state, newTodo(action.payload.name)];

        case INITIAL_STATE.TOGGLE_TODO:
            return state.map(function(event){
                if(event.id === action.payload.id) return {...event, complete: !event.complete};
                return event;
            });

        case INITIAL_STATE.DELETE_TODO:
            return state.filter(event => event.id !== action.payload.id);

        default:
            return state;
    }
}

function newTodo(name){
    return {id: Date.now(), name: name, complete: false}
}

export {INITIAL_STATE, reducer}