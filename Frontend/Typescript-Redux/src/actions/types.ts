import { DeleteTodosAction, FetchTodosAction } from "./todos";

enum ActionTypes{
    fetchTodos = "FETCH_TODOS",
    deleteTodos = 'DELETE_TODOS'
}

type Action = FetchTodosAction | DeleteTodosAction;

export { ActionTypes, type Action }