import React from "react";
import classes from "./Card.module.css"

function Card(props){
    return(
        <div className={`${classes.card} ${props.className}`}> {/* We use props.children so we can access to the content in the component Card in AddUsers.js */}
            {props.children}
        </div>
    )
}

export default Card;