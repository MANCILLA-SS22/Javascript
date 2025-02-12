import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export interface FetchTodosAction {
    type: ActionTypes.fetchTodos;
    payload: Todo[];
}

export interface DeleteTodosAction {
    type: ActionTypes.deleteTodos;
    payload: number;
}

function fetchTodos() {
    return async function (dispatch: Dispatch<FetchTodosAction>) {
        const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');

        dispatch<FetchTodosAction>({
            type: ActionTypes.fetchTodos,
            payload: response.data
        });
    };
};

function deleteTodo(id: number): DeleteTodosAction {
    return {
        type: ActionTypes.deleteTodos,
        payload: id
    }
}

export { fetchTodos, deleteTodo };