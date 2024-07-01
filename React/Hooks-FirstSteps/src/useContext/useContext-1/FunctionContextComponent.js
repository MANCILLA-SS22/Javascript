import React from 'react'
import { useTheme, useThemeUpdate } from './ThemeContext';

function FunctionContextComponent(){
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  
  const themeStyles = {
      background: darkTheme ? "#333" : "#CCC",
      color: darkTheme ? "#CCC" : "#333",
      padding: "2rem",
      margin: "2rem"
  }

  return <>
    <button onClick={toggleTheme}>Toggle Theme</button>
    <div style={themeStyles}> Function Theme </div>
  </>
}

export default FunctionContextComponent