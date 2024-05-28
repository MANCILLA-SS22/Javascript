import { createContext, FC, PropsWithChildren, ReactNode, useState } from 'react';
import Todo from '../models/todo';

type TodosContextObject = {
    items: Todo[];
    addTodo: { (text: string): void };
    removeTodo: { (id: string): void };
};
type Props = {
    children: ReactNode;
}

export const TodosContext = createContext<TodosContextObject>({ items: [], addTodo: function () { }, removeTodo: function (id: string) { } });

function TodosContextProvider({ children }: Props) { //Metodo 1 Para manejo de "children"
    const [todos, setTodos] = useState<Todo[]>([]); // const todos:Todo[] = [ new Todo("React"), new Todo("Typescript") ];

    function addTodoHandler(todoText: string) { //const addTodoHandler:addTodo = function (todoText):void {
        const newTodo = new Todo(todoText);

        setTodos(function (prevTodos) {
            return prevTodos.concat(newTodo);
        });
    };

    function removeTodoHandler(todoId: string) {
        setTodos(function (prevTodos) {
            return prevTodos.filter((todo) => todo.id !== todoId);
        });
    }

    const contextValue: TodosContextObject = {
        items: todos,
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler,
    };

    return (
        <TodosContext.Provider value={contextValue}>
            {children}
        </TodosContext.Provider>
    );
};


export default TodosContextProvider;

// function TodosContextProvider({ children }: PropsWithChildren) {       //Metodo 2 Para manejo de "children"
// const TodosContextProvider: FC<Props> = function ({ children }: any){  //Metodo 3 Para manejo de "children"