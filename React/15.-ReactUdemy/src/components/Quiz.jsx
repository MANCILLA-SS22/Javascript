import { useCallback, useState } from 'react';
import QUESTIONS from "../questions.js"
import Question from './Question.jsx';
import Summary from './Summary.jsx';

function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
    setUserAnswers(prevUserAnswers => {
      return [...prevUserAnswers, selectedAnswer]
    });
  }, []);
  
  const handleSkipAnswer = useCallback(function handleSkipAnswer(){
    handleSelectAnswer(null)
  },[handleSelectAnswer]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = (activeQuestionIndex === QUESTIONS.length);
  if (quizIsComplete) return <Summary userAnswers={userAnswers} />;
  
  return (
    <div id='quiz'>
      <Question key={activeQuestionIndex} index={activeQuestionIndex} onSelectAnswer={handleSelectAnswer} onSkipAnswer={handleSkipAnswer}/>
    </div>
  )
}

export default Quiz;