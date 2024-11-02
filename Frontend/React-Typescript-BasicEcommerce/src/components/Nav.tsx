type PropsType = {
    viewCart: boolean,
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
}

function Nav({ viewCart, setViewCart }: PropsType) {
    const productsButton = <button onClick={() => setViewCart(false)}>View Products</button>
    const cartButton = <button onClick={() => setViewCart(true)}>View Cart</button>

    return (
        <nav className="nav">
            {viewCart ? productsButton : cartButton}
        </nav>
    );
};

export default Nav