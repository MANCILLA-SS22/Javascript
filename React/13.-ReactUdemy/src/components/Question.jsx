import React, { useState } from 'react'
import QuestionTimer from './QuestionTimer';
import Answers from './Answers';
import QUESTIONS from "../questions.js"

function Question({index, onSelectAnswer, onSkipAnswer}) {

    const [answer, setAnswer] = useState({
        selectedAnswer: "",
        isCorrect: null
    });

    let timer = 10000;
    if(answer.selectedAnswer) timer = 1000
    if(answer.selectedAnswer !== null) timer = 2000

    let answerState = '';
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null,
        });
    
        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer,
            });
    
            setTimeout(() => {
                    onSelectAnswer(answer);
            }, 2000);
        }, 1000);
    }

    return (
        <div id='question'>
            <QuestionTimer key={timer} timeout={timer} onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null} mode={answerState} /> {/* Whenever the key changes on a component, even if that component is not part of a list, whenever it changes, REACT will destroy the old component instance and create a new */}
            <h2>{QUESTIONS[index].text}</h2>
            <Answers answers={QUESTIONS[index].answers} selectedAnswer={answer.selectedAnswer} answerState={answerState} onSelect={handleSelectAnswer}/>
            {/* answers means our available answers for the selected question. 
                selectedAnswer means the selected answer, that's to say, the latest answer stored in user answers 
                answerState means the answerState we're managing in the quiz component
            */}
        </div>
    )
}

export default Question;