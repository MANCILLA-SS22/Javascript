import { login, loginWithGoole, register } from "../../../firebaseConfig"
import { useNavigate } from "react-router-dom";

function FirebaseAuth() {

    const navigate = useNavigate();

    let infoInput = {
            email: "german_mancilla22@hotmail.com",  // email:"xxcodigo.rojoxx@gmail.com",
            password: "ellgerhmman"
        }

    async function handleSumbmit(){
        let res = await login(infoInput);
        console.log(res);
        navigate("/")
    }

    let infoForRegiter = {
        email: "german_mancilla22@hotmail.com",
        password: "ellgerhmman"
    }

    async function registerWithEmail(){
        let res = await register(infoForRegiter);
        console.log(res);
    }

    async function handleSubmitGoogle(){
        let res = await loginWithGoole();
        console.log(res);
    }

    return (
        <div>
            <h1>FirebaseAuth</h1>
            <button onClick={handleSumbmit}>Ingresar con email</button>

            <h4>Aun no tienes cuenta?</h4>
            <button onClick={registerWithEmail}>Registrate</button>

            <h4>Ingresar con google</h4>
            <button onClick={handleSubmitGoogle}>Ingresar con google</button>
        </div>
    )
}

export default FirebaseAuth