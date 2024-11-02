import { createContext, useReducer, ChangeEvent, ReactElement, useCallback } from "react";

const enum REDUCER_ACTION_TYPE { INCREMENT, DECREMENT, NEW_INPUT };

type StateType = {
    count: number;
    text: string;
}

type ReducerAction = {
    type: REDUCER_ACTION_TYPE,
    payload?: string,
}

type ChildrenType = {
    children?: ReactElement | ReactElement[] | undefined
};

const initState: StateType = { count: 0, text: '' };

type UseCounterContextType = ReturnType<typeof useCounterContext>;
const initContextState: UseCounterContextType = {
    state: initState,
    increment: (): void => { },
    decrement: (): void => { },
    handleTextInput: (e: ChangeEvent<HTMLInputElement>) => { },
};

const CounterContext = createContext<UseCounterContextType>(initContextState); //Step 1 to use context

function reducer(state: StateType, action: ReducerAction): StateType {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.INCREMENT:
            return { ...state, count: state.count + 1 };

        case REDUCER_ACTION_TYPE.DECREMENT:
            return { ...state, count: state.count - 1 };

        case REDUCER_ACTION_TYPE.NEW_INPUT:
            return { ...state, text: action.payload ?? '' };

        default:
            throw new Error()
    }
}

function useCounterContext(initState: StateType) {
    const [state, dispatch] = useReducer(reducer, initState)

    const increment = useCallback(function () {
        dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT });
    }, []);

    const decrement = useCallback(function () {
        dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT });
    }, []);

    const handleTextInput = useCallback(function (e: ChangeEvent<HTMLInputElement>) {
        dispatch({
            type: REDUCER_ACTION_TYPE.NEW_INPUT,
            payload: e.target.value
        });
    }, []);

    return { state, increment, decrement, handleTextInput };
}

function CounterProvider({ children }: ChildrenType): ReactElement { ////Step 2 to use context
    return (
        <CounterContext.Provider value={useCounterContext(initState)}>
            {children}
        </CounterContext.Provider>
    );
};

export { CounterContext, CounterProvider };