import React, { useState } from 'react';
import CourseGoalList from './components/CourseGoals/CourseGoalList/CourseGoalList';
import CourseInput from './components/CourseGoals/CourseInput/CourseInput';
import './App.css';

function App(){
  const arr = [
    { text: 'Do all exercises!', id: 'g1' }, 
    { text: 'Finish the course!', id: 'g2' }
  ];

  const [courseGoals, setCourseGoals] = useState(arr);

  let content = (<p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>);
  if (courseGoals.length > 0) content = (<CourseGoalList items={courseGoals} onDeleteItem={deleteItemHandler} />);

  function addGoalHandler(enteredText){
    setCourseGoals(function(prevGoals){
      const updatedGoals = [...prevGoals];
      updatedGoals.unshift({ text: enteredText, id: Math.random().toString() });
      return updatedGoals;
    });
  };

  function deleteItemHandler(goalId){
    setCourseGoals(function(prevGoals){
      const updatedGoals = prevGoals.filter(goal => goal.id !== goalId);
      return updatedGoals;
    });
  };

  return (
    <div>
      <section id="goal-form"> <CourseInput onAddGoal={addGoalHandler}/> </section>
      <section id="goals"> {content} </section>
    </div>
  );
};

export default App;
