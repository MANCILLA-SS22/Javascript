import React, {useState} from "react";
import ExpensiveFilter from "./ExpensiveFilter";
import Card from "../UI/Card";
import "./Expensive.css";
import ExpenseList from "./ExpensiveList";
import ExpensesChart from "./ExpensiveChart";


function Expenses(props){

    const [filteredYear, setfilteredYear] = useState("2023");

    function filterChangeHandler(selectedYear){
        setfilteredYear(selectedYear);
    }

    let filteredExpenses = props.items.filter(function(event){
        return event.date.getFullYear().toString() === filteredYear;
    });

    return(
        <div>
            <Card className="expenses">
                <ExpensiveFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
                <ExpensesChart expenses={filteredExpenses}/>
                <ExpenseList items={filteredExpenses}/>
            </Card>
        </div>
    )
}

export default Expenses;