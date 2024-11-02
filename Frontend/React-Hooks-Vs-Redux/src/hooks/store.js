//Con custom hooks
import { useState, useEffect } from 'react';

let globalState = {};
let listeners = [];
let actions = {}; 

function useStore(shouldListen = true) {
    const setState = useState(globalState)[1];

    useEffect(() => {
        if (shouldListen) listeners.push(setState); 

        return function (){ //React will automatically call this CLEANUP function for you when the component is unmounted to remove all the necessary subscriptions that were earlier created in the useEffect or any other cleanup code that you might want to run for example some deallocation of some resource etc. This is important because otherwise these subscriptions can pile up and cause memory leaks in your application.
            if (shouldListen) listeners = listeners.filter(event => event !== setState);
        }
    }, [setState, shouldListen]);

    function dispatch(actionIdentifier, id) {
        const newState = actions[actionIdentifier](globalState, id);  //"actions" is an object of functions, that's why we use parenthesis at the end.
        globalState = { ...globalState, ...newState };
        for (const event of listeners) event(globalState);
    };

    return [globalState, dispatch];
};

function initStore(userActions, products) {
    actions = { ...actions, ...userActions };            console.log("actions", actions);
    globalState = { ...globalState, ...products };       console.log("globalState", globalState);
};

export { useStore, initStore }