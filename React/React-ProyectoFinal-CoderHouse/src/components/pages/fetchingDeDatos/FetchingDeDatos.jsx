function FetchingDeDatos( {x, y} ){

    return (
        <div>
            {
                x.map((evento) => {
                    return(
                        <div key={evento.id}>
                            <h2>{evento.id}</h2>
                            <h2>{evento.name}</h2>
                            <h2>{evento.username}</h2>
                            <h2>{evento.email}</h2>
                            {/* <h2>{evento.address.street}</h2> */}
                            <h2>{evento.phone}</h2>
                            <h2>{evento.website}</h2>
                            {/* <h2>{evento.company}</h2> */}
                            <br />
                        </div>
                    )
                })
            }
            
            <button onClick={y}>Crear Usuario</button>
        </div>
    )
}

export default FetchingDeDatos