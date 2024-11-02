import "../UI/Card.css"

function Card(props){
    //console.log(props, props.children); //Cuando usamos children, apuntamos al contenido (div y h2) que hay dentro de, en este caso, Card. 
    const classes = "card "+ props.className;
    return <div className={classes}>{props.children}</div>
}

export default Card;