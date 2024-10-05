import useCart from "../hooks/useCart"

type PropsType = {
    viewCart: boolean,
}

function Footer({ viewCart }: PropsType) {
    const { totalItems, totalPrice } = useCart();
    const year: number = new Date().getFullYear();

    const ShoppingCartP = <p>Shopping Cart &copy; {year}</p>; 
    const cartValues = <>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {totalPrice}</p>
        <p>Shopping Cart &copy; {year}</p>
    </>

    return (
        <footer className="footer">
            { viewCart ? ShoppingCartP : cartValues }
        </footer>
    );
}
export default Footer