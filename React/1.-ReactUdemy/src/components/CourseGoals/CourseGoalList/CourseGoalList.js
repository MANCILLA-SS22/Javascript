import React from 'react';

import CourseGoalItem from '../CourseGoalItem/CourseGoalItem';
import './CourseGoalList.css';

function CourseGoalList(props){

  
  return (
    <ul className="goal-list">
      {
        props.items.map(function(goal){
          return(
            <CourseGoalItem key={goal.id} id={goal.id} onDelete={props.onDeleteItem}>
              {goal.text}
            </CourseGoalItem>
          )
        })
      }
    </ul>
  );
};

export default CourseGoalList;
