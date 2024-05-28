import React, { Fragment } from "react";
import Card from "./Card";
import Button from "./Button";
import classes from "./ErrorMessage.module.css";
import ReactDOM from "react-dom";

function Backdrop(props){
    return(
        <div className={classes.backdrop} onClick={props.onConfirm} />
    )
}

function ModalOverlay(props){
    return(
        <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>
                    
            <div className={classes.content}>
                <p>{props.message}</p>
            </div>

            <footer className={classes.actions}>
                <Button onClick={props.onConfirm}>Okay</Button>
            </footer>
        </Card>
    )
}

function ErrorMessage(props){
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, document.getElementById("backdrop-root"))}
            {ReactDOM.createPortal(<ModalOverlay title={props.title} message={props.message} onConfirm={props.onConfirm} />, document.getElementById("overlay-root"))}
        </Fragment>
    )
}

export default ErrorMessage;