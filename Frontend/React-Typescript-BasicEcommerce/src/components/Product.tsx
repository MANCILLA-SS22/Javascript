import { ProductType } from "../context/ProductsProvider"
import { ReducerActionType, ReducerAction } from "../context/CartProvider"
import { ReactElement, memo } from "react"

type PropsType = {
    product: ProductType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
    inCart: boolean,
}

function Product({ product, dispatch, REDUCER_ACTIONS, inCart }: PropsType): ReactElement {
    
    const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href;   console.log(img);
    const itemInCart = inCart ? ' → Item in Cart: ✔️' : null;

    function onAddToCart() {
        return dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });
    }

    return (
        <article className="product">
            <h3>{product.name}</h3>
            <img src={img} alt={product.name} className="product__img" />
            <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}{itemInCart}</p>
            <button onClick={onAddToCart}>Add to Cart</button>
        </article>
    );
}

function areProductsEqual({ product: prevProduct, inCart: prevInCart }: PropsType, { product: nextProduct, inCart: nextInCart }: PropsType) {
    return Object.keys(prevProduct).every(key => prevProduct[key as keyof ProductType] === nextProduct[key as keyof ProductType]) && prevInCart === nextInCart;
}
const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct;