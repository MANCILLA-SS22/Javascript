import React from "react";
import "./ExpensiveList.css";
import ExpenseItem from "./ExpensiveItem";

function ExpenseList(props){
    let expensesContent;

    !props.items.length ? 
    expensesContent = <h2 className="expenses-list__fallback">No expenses found!</h2> : 
    expensesContent = props.items.map(event => <ExpenseItem key={event.id} title={event.title} amount={event.amount} date={event.date}/>);


    return(
        <ul className="expenses-list">
            {expensesContent}
        </ul>
    )
}

export default ExpenseList;