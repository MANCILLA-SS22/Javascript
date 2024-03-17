import Hijo from './components/Hijo.jsx';
import {UserProvider}  from './UserProvider.jsx';

function App() {
  return (
    <UserProvider> {/* Todos los hijos contenidos dentro de este componente seran los que van a recibir la informacion de los contextos que estamos generando. */}
        <Hijo />
    </UserProvider>
  );
}

export default App;