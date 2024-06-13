import { createContext, useState } from 'react';

const UserProgressContext = createContext({
    progress: '',
    showCart: function(){},
    hideCart: function(){},
    showCheckout: function(){},
    hideCheckout: function(){},
});

export function UserProgressContextProvider({ children }) {
    const [userProgress, setUserProgress] = useState('');

    function showCart() {
        setUserProgress('cart');
    }

    function hideCart() {
        setUserProgress('');
    }

    function showCheckout() {
        setUserProgress('checkout');
    }

    function hideCheckout() {
        setUserProgress('');
    }

    const userProgressCtx = { progress: userProgress, showCart, hideCart, showCheckout, hideCheckout };

    return (
        <UserProgressContext.Provider value={userProgressCtx}>
            {children}
        </UserProgressContext.Provider>
    );
}

export default UserProgressContext;
