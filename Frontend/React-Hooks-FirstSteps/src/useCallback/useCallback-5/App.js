import Contador from "./components/Contador";

function App() {
  return (
    <div>
      <h1>Memorización en React</h1>
      <hr />
      <h2>Teoria</h2>
      <h3>memo</h3>
      <ul>
        <li>Se encarga de memorizar un componente,</li>
        <li>Lo vuelve a memorizar al momento de que sus <b>props</b> cambian.</li>
        <li>Evita re-renderizados.</li>
        <li>Hay que evitarlo en la medida de lo posible, pues podría ser máscostosa la tarea de memorización que el re-renderizado del componente.</li>
        <li>
          Úsalo, cuando:
          <ul>
            <li>Tenemos muchos elementos renderizados en una lista.</li>
            <li>Llamamos datos de APIs.</li>
            <li>Un componente se vuelve muy pesado.</li>
            <li>Salen alertas de rendimiento en la consola.</li>
          </ul>
        </li>
      </ul>
      <h3>useCallback</h3>
      <ul>
        <li>Memoriza una función, para no volverla a definir en cada render.</li>
        <li>Úsalo siempre que se pase una función como <b>prop</b> a un componentememorizado.</li>
        <li>Úsalo siempre que se pase una función como parámetro de un efecto.</li>
      </ul>
      <h3>useMemo</h3>
      <ul> 
        <li> Memoriza un valor calculado, es decir, el resultado de una función. </li>
        <li>Genera propiedades computadas.</li>
        <li>Úsalo en procesos pesados.</li>
      </ul>
      <hr />
      <Contador />
    </div>
  );
}

export default App;
