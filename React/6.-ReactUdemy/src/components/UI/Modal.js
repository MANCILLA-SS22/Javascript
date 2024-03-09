import React, { Fragment } from 'react';
import classes from "./Modal.module.css";
import ReactDOM from 'react-dom';

function Backdrop(props){
    return(
        <div className={classes.backdrop} onClick={props.onClose}/>
    )
}

function ModalOverlay(props){
    // console.log(props);
    return(
        <div className={classes.modal}>
            <div className={classes.content}>
                {/* When using ReactDOM.createPortal() - we will "teleport" the component to the new place.
                    You still need to pass the props.children to ModalOverlay so it can render its content and apply styling for it. 
                    it is 2 levels deep, the main content is in the Cart.js component. So the content within the <Modal> tag is the props.children in the Modal component. 
                    Now, the same content is forwarded or projected into the ModalOverlay component. So props.children basically have the same content. And the reason to project 
                    is because we want the ModalOverlay component to handle (style) the content.*/}
                {props.children} 
            </div>
        </div>
    )
}

const portalElement = document.getElementById("overlays");

function Modal(props){
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
}

export default Modal; 