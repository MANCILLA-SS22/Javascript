import {  useContext } from "react";
import TodoItem from "./TodoItem";
import classes from "./Todos.module.css";
import { TodosContext } from "../store/todos-contex";

function Todos() {
    const {items, removeTodo} = useContext(TodosContext);

    return (
        <div>
            <ul className={classes.todo}>
                {items.map(item => <TodoItem key={item.id} text={item.text} onRemoveTodo={removeTodo.bind(null, item.id)} />)}
                {/* {items.map(item => <TodoItem key={item.id} text={item.text} onRemoveTodo={function(){removeTodo}} />)} */}
            </ul>
        </div>
    );
};

export default Todos;

/* import { FC, PropsWithChildren, ReactNode } from "react";

// const Todos: FC<{ children: ReactNode, items: string[] }> = function(props){
const Todos: FC<PropsWithChildren<{ items: string[] }>> = function (props) {
    return (
        <>
            <ul>
                {props.items.map(event => <li key={event}>{event}</li>)}
            </ul>
        </>
    )
}

export default Todos; */