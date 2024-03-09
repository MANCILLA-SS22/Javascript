import { Button, TextField } from "@mui/material"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from "formik"
import  *as Yup from "yup"

function FormFormik() {

    //handleSubmit pertenece al formulario, mientras que handleChange pertenece al input.
    const {handleSubmit, handleChange, errors} = useFormik({
        initialValues:{
            nombre: "",
            email: "",
            password: "",
            repeatPassword:""
        },

        onSubmit: function(data){
            console.log("Res", data);
        },

        validateOnChange:false,
        
        validationSchema: Yup.object({ //Este metodo .object crea un esquema de validacion que sera un objeto. Dentro de cada imput, es donde se valida cada objeto. Lo que se encuentra del lado derecho del min y el max, representa un condificonal que, si no cumple con el numero requerido, entonces muestra el mensage (STRING).
            nombre: Yup.string().required("Este campo es invalido").min(3, "min").max(16, "max"),
            email: Yup.string().email("No corresponde a un email valido").required("Es obligatorio"),
            password: Yup.string().required("Requerido").matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,15}$/, {
                message: "la contaseña debe tener,1 mayuscula, 1 minuscula etc etc"
            }),
            repeatPasswoerd: Yup.string().required("Requerido").oneOf([Yup.ref("password")], "Las contrasenas no coinciden")
        })
    });

    return (
        <div style={{padding:"40px"}} className="bg-light">
            <form style={{color:"black"}} className="text-white bg-light" action="" onSubmit={handleSubmit}>
                <TextField label="Nombre" variant="outlined" name="nombre" onChange={handleChange} error={errors.nombre ? true : false} helperText={errors.nombre}/>
                <TextField label="Email" variant="outlined" name="email" onChange={handleChange} error={errors.email ? true : false} helperText={errors.email}/>
                <TextField label="Pass" variant="outlined" name="password" onChange={handleChange} error={errors.password ? true : false} helperText={errors.password}/>
                <TextField label="RepeatPass" variant="outlined" name="repeatPassword" onChange={handleChange} error={errors.repeatPassword ? true : false} helperText={errors.repeatPassword}/>
                <Button type="submit" variant="contained">Enviar</Button>
            </form>
        </div>
    )
}

export default FormFormik