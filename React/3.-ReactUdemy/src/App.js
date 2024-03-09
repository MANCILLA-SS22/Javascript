/* //Metodo 1
import { useState } from 'react';
import Header from './components/Header/Header';
import ResultTable from './components/ResultTable/ResultTable';
import UserInput from './components/UserInput/UserInput';

function App() {

  const [userInput, setUserInput] = useState(null);
  
  function calculateHandler(value){
    setUserInput(value)
  };
  
  const yearlyData = [];
  if (userInput){
    let currentSavings = Number(userInput.currentSavings);
    const yearlyContribution = Number(userInput.yearlyContribution);
    const expectedReturn = Number(userInput.expectedReturn / 100);
    const duration = Number(userInput.duration);
    // console.log(currentSavings, yearlyContribution, expectedReturn, duration);

    for (let i = 0; i < duration; i++){
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution
      });
    }
  }

  console.log(yearlyData); //console.log(userInput);

  return (
    <div>
      <Header/>
      <UserInput onCalculate={calculateHandler}/>
      {!userInput ? <p>No investment calculated yet</p> : <ResultTable data={yearlyData} initialInvestment={userInput.currentSavings}/>}
    </div>
  );
}

export default App; */

//Metodo 2
import { useState } from 'react';
import Header from './components/Header/Header';
import ResultTable from './components/ResultTable/ResultTable';
import UserInput from './components/UserInput/UserInput';

let yearlyData = [];
function App() {

  const [userInput, setUserInput] = useState(null);
  // const yearlyData = [];

  function calculateHandler(value){
    let currentSavings = Number(value.currentSavings);
    const yearlyContribution = Number(value.yearlyContribution);
    const expectedReturn = Number(value.expectedReturn / 100);
    const duration = Number(value.duration);
    // console.log(currentSavings, yearlyContribution, expectedReturn, duration);
    

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
      
    }
    console.log(yearlyData);
    setUserInput(value);
  };

  return (
    <div>
      <Header/>
      <UserInput onCalculate={calculateHandler}/>
      {!userInput ? <p>No investment calculated yet</p> : <ResultTable data={yearlyData} initialInvestment={userInput.currentSavings}/>}
    </div>
  );
}

export default App;