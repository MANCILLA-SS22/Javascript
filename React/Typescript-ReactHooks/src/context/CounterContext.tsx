import { createContext, useReducer, ChangeEvent, ReactElement, useCallback, useContext } from "react"

type StateType = {
    count: number;
    text: string;
}

type ReducerAction = {
    type: REDUCER_ACTION_TYPE,
    payload?: string,
}

type UseCounterContextType = ReturnType<typeof useCounterContext>;

type ChildrenType = {
    children?: ReactElement | ReactElement[] | undefined
};

type UseCounterHookType = {
    count: number,
    increment: () => void,
    decrement: () => void,
};

type UseCounterTextHookType = {
    text: string,
    handleTextInput: (e: ChangeEvent<HTMLInputElement>) => void,
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const initState: StateType = { count: 0, text: '' };
const enum REDUCER_ACTION_TYPE { INCREMENT, DECREMENT, NEW_INPUT, };

const initContextState: UseCounterContextType = {
    state: initState,
    increment: () => { },
    decrement: () => { },
    handleTextInput: (e: ChangeEvent<HTMLInputElement>) => { },
};

const CounterContext = createContext<UseCounterContextType>(initContextState);

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

    const increment = useCallback(function(){
        dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT });
    }, []);

    const decrement = useCallback(function(){
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

function CounterProvider({ children }: ChildrenType): ReactElement {
    return (
        <CounterContext.Provider value={useCounterContext(initState)}>
            {children}
        </CounterContext.Provider>
    );
};

function useCounter(): UseCounterHookType {
    const { state: { count }, increment, decrement } = useContext(CounterContext);
    return { count, increment, decrement };
};

function useCounterText(): UseCounterTextHookType {
    const { state: { text }, handleTextInput } = useContext(CounterContext);
    return { text, handleTextInput };
};

export { CounterProvider, useCounter, useCounterText }