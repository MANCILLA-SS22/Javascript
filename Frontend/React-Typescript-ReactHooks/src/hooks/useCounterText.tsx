import { ChangeEvent, useContext } from "react";
import { CounterContext } from "../context/CounterContext";

type UseCounterTextHookType = {
    text: string,
    handleTextInput: (e: ChangeEvent<HTMLInputElement>) => void,
};

export function useCounterText(): UseCounterTextHookType {
    const { state: { text }, handleTextInput } = useContext(CounterContext); //Step 3 to use context
    return { text, handleTextInput };
};