import React from "react";
import classes from "./Button.module.css";

function Button(props){
    return(
        <button className={classes.button} type={props.type || "button"} onClick={props.onClick}>
            Enter
        </button>
    )
}

export default Button;