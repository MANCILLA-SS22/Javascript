import React from 'react';
import './CourseGoalItem.css';

function CourseGoalItem(props){
  return (
    <li className="goal-item" onClick={() => props.onDelete(props.id)}> {/* <li className="goal-item" onClick={() => deleteHandler()}> This one and the previos one are the same thing */}
      {props.children} {/* Remember that, when using "props.children", we pass all the content from CourseGoalItem in CourseGoaListtem. This content will be the text in all the divs. */}
    </li>               
  );
};

export default CourseGoalItem;
