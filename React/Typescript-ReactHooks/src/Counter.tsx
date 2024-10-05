import { ReactNode } from 'react'
import { useCounterText } from './hooks/useCounterText';
import { useCounter } from './hooks/useCounter';

type ChildrenType = {
    children: (num: number) => ReactNode
}

function Counter({ children }: ChildrenType) {
    const { count, increment, decrement } = useCounter();
    const { text, handleTextInput } = useCounterText();

    return (
        <>
            <h1>{children(count)}</h1>
            <div>
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
            </div>
            <input type="text" onChange={handleTextInput} />
            <h2>{text}</h2>
        </>
    )
}
export default Counter