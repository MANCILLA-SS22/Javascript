import classes from "./TodoItem.module.css";

type Props = { // interface Props {
    text: string;
    onRemoveTodo: { ():void };
};

function TodoItem({ text, onRemoveTodo }: Props) {  // function Todos({ items, children }: Props): React.JSX.Element {
    
    return <li className={classes.item} onClick={onRemoveTodo}>{text}</li>
}

export default TodoItem;

//We don't need the "key" because it is inferred by typescript that react component can have key as a prop we do not need to define it manually