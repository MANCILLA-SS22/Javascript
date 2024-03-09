import { Link } from "react-router-dom"
import "./productCard.css"

function ProductCard({evento}){
    return (
        <div className="main">
                <ul className="cards">
                    <li className="cards_item">
                    <div className="card">
                        <div className="card_image"><img className="ss" src={evento.img}/>

                        </div>

                        <div className="card_content">
                            <h1>{evento.title}</h1>
                            <p className="card_text">{evento.description}</p>
                            
                            <div className="d-flex justify-content-around">
                                <h3>${evento.priceNow.toFixed(2)}</h3>
                                <h5>{evento.rate}</h5>
                            </div>
                            <div className="d-flex flex-column align-items-center">

                                {/* PARTE 3: Navegamos en la ruta itemDetail, seguido del id correspondiente a las 4 zapatillas. En la barra de navegacion aparece como, ejemplo: itemDetail/2 */}
                                <Link to={`/itemDetail/${evento.id}`}>  
                                    <button className="btn">See details</button>  
                                </Link>
                            </div>
                        </div>
                    </div>
                    </li>
                </ul>
            </div>
    )
}

export default ProductCard


/* //Forma estatica
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

function ProductCard({evento}){
    return (
        <Card sx={{width: 345 }}>
        <CardMedia component="img" alt="green iguana" height="140" image={evento.img} title={evento.title}/>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {evento.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {evento.description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button variant="contained">Ver detalles</Button>
        </CardActions>
    </Card>
    )
}

export default ProductCard */