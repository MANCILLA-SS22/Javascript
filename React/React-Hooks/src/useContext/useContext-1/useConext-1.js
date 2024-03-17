import React from "react";
import { ThemeProvider } from "./ThemeContext";
import FunctionContextComponent from "./FunctionContextComponent";

function App() {
  return (
    <ThemeProvider>
      <FunctionContextComponent/>
    </ThemeProvider>
  )
}

export default App;

// (1) Creamos nuestro componente con toda la informacion referente al contexto. En este caso, se llama ThemeProvider. Ahora bien, todos los componentes hijos de dicho componente podran acceder a toda la informacion como variables o funciones.
// (2) Creamos nuestro contexto con ayuda de "createContext()", el cual es uan herramienta nativa de react. Este consta de una varaible a la que igualaremos dicha herramienta y podremos usar en otros componentes hijos.
// (3) Creamos nuestro provedor de contexto, al cual le mandaremos un "value" con todas las funciones o variables que seran utilizadas en otros componentes hijos. Normalmente, lo que pasamos a "value" es un objeto fuera de la funcion con toda la informacion a exportar
// (4) Finalmente, con ayuda de "useContext" podremos ahora utilizar la informacion contenida en el provider.