import {createContext, useState, useContext } from "react";

const userContext = createContext();
const userToggleContext = createContext();

export function useUserContext() {
    return useContext(userContext);
}

export function useUserToggleContext() {
    return useContext(userToggleContext);
}

function UserProvider(props) {
    const [user, setUser] = useState(null);

    function cambiaLogin() {
        user ? setUser(null) : setUser({name: 'Luis',email: 'luis@mail.com'});
    }

    return (
        <userContext.Provider value={user}>
            <userToggleContext.Provider value={cambiaLogin}>
                {props.children}
            </userToggleContext.Provider>
        </userContext.Provider>
    );
}

export default UserProvider;