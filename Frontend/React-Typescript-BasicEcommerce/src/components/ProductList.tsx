import useCart from "../hooks/useCart"
import useProducts from "../hooks/useProduct"
import { ReactElement } from "react"
import Product from "./Product"

function ProductList() {
    const { dispatch, REDUCER_ACTIONS, sortedCart } = useCart();
    const { products } = useProducts();

    let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>;

    if (products?.length) {
        pageContent = products.map(function (product){
            const inCart: boolean = sortedCart.some(item => item.sku === product.sku);
            return <Product key={product.sku} product={product} dispatch={dispatch} REDUCER_ACTIONS={REDUCER_ACTIONS} inCart={inCart} />;
        })
    }

    return (
        <main className="main main--products">
            {pageContent}
        </main>
    );
}
export default ProductList;