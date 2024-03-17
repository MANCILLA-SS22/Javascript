import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

function useTheme(){
    return useContext(ThemeContext);
}

function useThemeUpdate(){
    return useContext(ThemeUpdateContext);
}

function ThemeProvider({children}){
    const [darkTheme, setDarkTheme] = useState(true);

    function toggleTheme(){
        setDarkTheme(prevDarkTheme => !prevDarkTheme);
    }

    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}

export {useTheme, useThemeUpdate, ThemeProvider};