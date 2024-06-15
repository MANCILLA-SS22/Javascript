import { useContext } from 'react';
import Modal from './UI/Modal.jsx';
import { currencyFormatter } from '../util/formatting.js';
import Input from './UI/Input.jsx';
import Button from './UI/Button.jsx';
import {CartContext} from '../Context/CartContext.jsx';
import UserProgressContext from '../Context/UserProgressContext.jsx';
import useHttp from '../hooks/useHttp.jsx';

// const requestConfig = { //We create this parameter outside of the function so we can avoid infinte loops
//     method: "POST",
//     headers: {"Content-type": "application/json"}
// };

function Checkout() {
    // const {clearCart, items} = useContext(CartContext);
    // const { hideCheckout, progress } = useContext(UserProgressContext);
    // const {data, isLoading: isSending, error, sendRequest, clearData} = useHttp("http://localhost:3000/orders", requestConfig);
    // const cartTotal = items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    // function handleClose() {
    //     hideCheckout();
    // }

    // function handleFinish() {
    //     hideCheckout();
    //     clearCart();
    //     clearData();
    // }

    // function handleSubmit(event) {
    //     event.preventDefault();

    //     const fd = new FormData(event.target);
    //     const customerData = Object.fromEntries(fd.entries()); // { email: test@example.com }

    //     sendRequest(
    //         JSON.stringify({
    //             order: {
    //                 items: items,
    //                 customer: customerData
    //             }
    //         })
    //     );
    // };

    
    // let actions = (
    //     <>
    //         <Button type="button" textOnly onClick={handleClose}>Close</Button>
    //         <Button>Submit Order</Button>
    //     </>
    // );   
    // if(isSending) actions = <span>Sending order data...</span>;
    
    // if(data && !error){
    //     return(
    //         <Modal open={progress === 'checkout'} onClose={handleFinish}>
    //             <h2>Sucess!</h2>
    //             <p>Your order was submitted successfuly</p>
    //             <p>We'll get back to you with more detais via emal within the next few minites.</p>
    //             <p className='modal-actions'>
    //                 <Button onClick={handleFinish}>Okay</Button>
    //             </p>
    //         </Modal>
    //     )
    // };

    // return (
    //     <Modal open={progress === 'checkout'} onClose={handleClose}>
    //         <form onSubmit={handleSubmit}>
    //             <h2>Checkout</h2>
    //             <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
    
    //             <Input label="Full Name" type="text" id="name" />
    //             <Input label="E-Mail Address" type="email" id="email" />
    //             <Input label="Street" type="text" id="street" />
    //             <div className="control-row">
    //                 <Input label="Postal Code" type="text" id="postal-code" />
    //                 <Input label="City" type="text" id="city" />
    //             </div>

    //             {error && <Error title="Failed to submit order" message={error} />}
    
    //             <p className="modal-actions">{actions}</p>
    //         </form>
    //     </Modal>
    // );
}

export default Checkout;