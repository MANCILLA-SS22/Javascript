// import { TextField } from "@mui/material"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { useState } from 'react'

export function Login(){

    const[showPassword, setShowPassword] = useState(false);
    return (
        <Box sx={{ width:"100%", gap:"30px", minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
            <TextField id="outlined-basic" label="Email" variant="outlined" color='secondary' size='medium'/>
            <TextField id="outlined-basic" label="Contraseña" type={showPassword ? "text" : "password"} variant="outlined" color='secondary' size='medium'/>
            
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={ 
                        <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"/>
            </FormControl>
            <Button variant="contained" color='secondary'>Ingresar</Button>
        </Box>
    ) 
}

export default Login