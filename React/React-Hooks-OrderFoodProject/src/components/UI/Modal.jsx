import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom';

function Modal({children, open, onClose, className=""}){
    const dialog = useRef();

    useEffect(() => {
        if (open) dialog.current.showModal(); //ShowModal() is a built-in method in HTML that belongs, in this case, to <dialog></dialog>

        return function(){
            dialog.current.close();
        }
    }, [open]);

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose} >{children}</dialog>, 
        document.getElementById("modal")
    );
} 

export default Modal;