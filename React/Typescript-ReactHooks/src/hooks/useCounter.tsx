import { useContext } from "react";
import { CounterContext } from "../context/CounterContext";

type UseCounterHookType = {
    count: number,
    increment: () => void,
    decrement: () => void,
};

export function useCounter(): UseCounterHookType {
    const { state: { count }, increment, decrement } = useContext(CounterContext); //Step 3 to use context
    return { count, increment, decrement };
};