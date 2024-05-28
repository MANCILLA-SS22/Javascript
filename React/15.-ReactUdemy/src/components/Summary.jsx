import React from 'react';
import quizIsCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js"

function Summary({userAnswers}) {
    const skippedAnswers = userAnswers.filter(answer => answer === null);
    const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]);
    const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length) * 100);
    const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100);
    const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

    const res = userAnswers.map(function(answer, index){
        let cssClass = "user-answer";

        if (answer === null) cssClass += " skipped";
        if (answer === QUESTIONS[index].answers[0]) cssClass += " correct";
        cssClass += " wrong";

        return(
            <li key={index}>
                <h3>{index + 1}</h3>
                <p className='question'>{QUESTIONS[index].text}</p>
                <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
        )
    })

    return (
        <div id='summary'>
            <img src={quizIsCompleteImg} alt="Thropy icon" />
            <h2>Quiz Completed!</h2>
            <div id='summary-stats'>
                <p>
                    <span className='number'>{skippedAnswers}%</span>
                    <span className='text'>skippd</span>
                </p>
                <p>
                    <span className='number'>{correctAnswersShare}%</span>
                    <span className='text'>answered correctly</span>
                </p>
                <p>
                    <span className='number'>{wrongAnswersShare}%</span>
                    <span className='text'>answered incorrectly</span>
                </p>
            </div>
            <ol>{res}</ol>
        </div>
    )
}

export default Summary;