import {forwardRef, useImperativeHandle, useRef} from 'react'
import { createPortal } from 'react-dom';
import Button from './Button.JSX';

const Modal = forwardRef(function Modal({children, buttonCaption}, ref){
    const dialog = useRef();
    
    useImperativeHandle(ref, function () { //This is a React Hook that lets you customize the handle exposed as a ref. The "ref" parameter comes from "function Modal()"
        return {
            abrir(){
                dialog.current.showModal(); // "show()" and "showModal()" are provided for the HTML built-in dialog component 
            }
        }
    });

    //En React, createPortal se utiliza para renderizar un componente o elementos hijos fuera de la jerarquía del DOM del componente padre. Esto es útil en situaciones donde necesitas que un componente se 
    //renderice en una parte diferente del DOM, como para modales, tooltips, y popovers, que suelen necesitar estar en un nivel superior del DOM para evitar problemas de estilos y posicionamiento.
    return createPortal(
        <dialog ref={dialog} className='backdrop: bg-stone-900/90 p-4 rounded-md shadow-md'>
            {children}
            <form method="dialog" className='mt-4 text-right'>
                <Button>{buttonCaption}</Button>
            </form>
        </dialog>, 
        document.getElementById("modal-root"))
});

export default Modal;