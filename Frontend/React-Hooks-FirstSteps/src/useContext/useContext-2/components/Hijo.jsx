import { useUserContext, useUserToggleContext } from "../UserProvider.jsx";

function Hijo() {
    const firstHook = useUserContext();
    const secondHook = useUserToggleContext();

    console.log("user", firstHook);
    console.log("cambiaLogin", secondHook);

    return (
    <div>
        <h2>Componente Hijo</h2>
        {
            firstHook && <p>Hola {firstHook.name}</p>
        }
        <button onClick={secondHook.logginToggle}>Cambia Login</button>
    </div>
    )
}

export default Hijo;