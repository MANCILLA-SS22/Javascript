//Elemento custom hook
import { useState } from "react"

export function useCount(initial, stock, minimo) {
                        //  1       5       1
        const[count, setCount] = useState(initial);

        function decrement(){
            if (count > minimo) {
                setCount(count - 1)
            }
        }

        function increment(){
            if (count < stock) {
                setCount(count + 1)
            }
        }

        function reset(){
            setCount(initial)
        }
        
    return {count, decrement, increment, reset}
}