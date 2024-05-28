import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button.jsx';
import CartContext from '../Context/CartContext.jsx';
import UserProgressContext from '../Context/UserProgressContext.jsx';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((acc, cur) => {return acc + cur.quantity}, 0);

    function handleShowCart(){
        userProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="A restaurant" />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly={true} onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    );
}
