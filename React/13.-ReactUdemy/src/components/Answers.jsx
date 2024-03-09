import { useRef } from 'react'

function Answers({answers, selectedAnswer, answerState, onSelect}) {
    const shuffledAnswers = useRef();

    if(!shuffledAnswers.current){
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5); //We create a new array because when using sort(), we modify the original array, not create a new one. If we return a negative number, those elements will be swapped. If we return a positive number, they will stay in  the order they are.
    }

    const res2 = shuffledAnswers.current.map(function(answer){
        const isSelected = selectedAnswer === answer;
        let cssClass = "";

        if(answerState === 'answered' && isSelected) cssClass = 'selected';
        if((answerState === 'correct' || answerState === 'wrong') && isSelected) cssClass = answerState;

        return (
            <li key={answer} className='answer'>
                <button onClick={() => onSelect(answer)} className={cssClass} disabled={answerState !== ""}>
                    {answer}
                </button>
            </li>
        )
    });

    return (
        <ul id='answers'>
            {res2}
        </ul>
    )
}

export default Answers;