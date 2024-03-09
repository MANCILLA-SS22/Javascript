import React, {useState} from "react"
import NewExpense from "./components/NewExpense/NewExpense";
import Expensive from "./components/Expenses/Expensive";

const DUMMY_EXPENSES = [
    {id: "e1",title: "SSSSSSSSSS",amount: 942.12, date: new Date()},
    {id: "e2",title: "2222222222",amount: 594.12, date: new Date()},
    {id: "e3",title: "ZZZZZZZZZZ",amount: 934.12, date: new Date()},
    {id: "e4",title: "FFFFFFFFFF",amount: 829.25, date: new Date()}
  ];

function App() {

  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  function addExpenseHandler(expense){
    setExpenses(function(prevExpenses){ 
      return [...prevExpenses, expense]; //"prevExpenses" stands for the previous state and "expense" stands for the new one. In this case, at the beggining we'll get the DUMMY_EXPENSES object as "prevExpenses", then we'll get that object but with another element.
    })
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler}/>
      <Expensive items={expenses}/>
    </div>
  );
}

export default App;
