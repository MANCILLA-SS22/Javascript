import { ReactNode, useContext, useRef } from 'react';
import classes from "./NewTodo.module.css";
import { TodosContext } from '../store/todos-contex';

function NewTodo() {
    const { addTodo } = useContext(TodosContext);

    const todoTextInputRef = useRef<HTMLInputElement>(null);

    function submitHandler(event: React.FormEvent){
        event.preventDefault();

        const enteredText = todoTextInputRef.current!.value; //The "!" tells Typescript that in this spot, we know that this possibly nullish value will never be null | undefined 
        if (enteredText.trim().length === 0) return;

        addTodo(enteredText);
    };

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <label htmlFor='text'>Todo text</label>
            <input type='text' id='text' ref={todoTextInputRef} />
            <button>Add Todo</button>
        </form>
    );
};

export default NewTodo;
