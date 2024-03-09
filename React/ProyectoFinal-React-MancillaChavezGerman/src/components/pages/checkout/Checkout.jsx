import { Button, TextField } from '@mui/material'

function Checkout( {handleSubmit, handleChange, errors} ) {
    return (
    <div className="d-flex align-items-center justify-content-center">
        <form onSubmit={handleSubmit}>
            <div className="d-flex w-100 justify-content-center">
                <TextField label="Name" variant="outlined" name="name" onChange={handleChange} helperText={errors.name} error={errors.name ? true : false}/>
                <TextField label="Email" variant="outlined" name="email" onChange={handleChange} helperText={errors.email} error={errors.email ? true : false}/>
                <TextField label="Phone" variant="outlined" name="phone" onChange={handleChange} helperText={errors.phone} error={errors.phone ? true : false}/>
                <Button type="submit" variant="outlined">Comprar</Button>
            </div>
        </form>
    </div>
    )
}

export default Checkout