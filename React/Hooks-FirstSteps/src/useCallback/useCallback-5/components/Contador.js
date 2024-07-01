import { useCallback, useState } from "react";
import ContadorHijo from "./ContadorHijo";

function Contador(){
  const [contador, setContador] = useState(0);
  const [input, setInput] = useState("");

  const sumar = useCallback(function(){
    setContador(contador + 1);
  }, [contador]);

  const restar = useCallback(function(){
    setContador(contador - 1);
  }, [contador]);

  function handleInput(e){
    setInput(e.target.value);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Contador</h2>
      <nav>
        <button onClick={sumar}>+</button>
        <button onClick={restar}>-</button>
      </nav>
      <h3>{contador}</h3>
      <input type="text" onChange={handleInput} value={input} />
      <ContadorHijo contador={contador} sumar={sumar} restar={restar} />
    </div>
  );
};

export default Contador;

//Cada que se ejecute, ya sea "restar" o "sumar", la aplicacion se va a renderizar y se mostrara el console.log que aparece en ContadorHijo.js. Pero ahora, cuando introduzcamos 
//un valor en el input, habra un cambio de estado tambien pero las 2 funciones de arriba no se ejecutaran ya que gracias al useCallback, este evitara un re-render puesto que en si
//arreglo de dependencias, la variable "contador" no se ve modificada. Y finalmente, la "memo" se encarga de memorizar un componente y lo vuelve a renderizar siempre y cuando
//una de sus propiededaes cambie.