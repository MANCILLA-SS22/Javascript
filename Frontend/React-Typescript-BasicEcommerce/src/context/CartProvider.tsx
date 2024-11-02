import { useMemo, useReducer, createContext, ReactElement } from "react"

type ReducerAction = { type: string, payload?: CartItemType, };
type ChildrenType = { children?: ReactElement | ReactElement[] }

type CartItemType = { sku: string, name: string, price: number, qty: number };
type ArrCartItem = CartItemType[];
type CartStateType = { cart: ArrCartItem };
const initCartState: CartStateType = { cart: [] }

const REDUCER_ACTION_TYPE = { ADD: "ADD", REMOVE: "REMOVE", QUANTITY: "QUANTITY", SUBMIT: "SUBMIT" };
type ReducerActionType = typeof REDUCER_ACTION_TYPE;
const { ADD, REMOVE, QUANTITY, SUBMIT }: ReducerActionType = REDUCER_ACTION_TYPE

type UseCartContextType = ReturnType<typeof useCartContext>
const initCartContextState: UseCartContextType = {
    dispatch: () => { },
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItems: 0,
    totalPrice: '',
    sortedCart: [],
}

const CartContext = createContext<UseCartContextType>(initCartContextState);

function reducer(state: CartStateType, action: ReducerAction): CartStateType {
    switch (action.type) {
        case ADD: {
            if (!action.payload) throw new Error('action.payload missing in ADD action');
            const { sku, name, price } = action.payload;
            const filteredCart: ArrCartItem = state.cart.filter(item => item.sku !== sku); //We filter the cart so we have all the other items that are not the item we're updating
            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku); //Here we get our filtered cart with all the items that we're not updating
            const qty: number = itemExists ? itemExists.qty + 1 : 1;
            return { 
                ...state, 
                cart: [...filteredCart, { sku, name, price, qty }] 
            };
        };

        case REMOVE: {
            if (!action.payload) throw new Error('action.payload missing in REMOVE action');
            const { sku } = action.payload;
            const filteredCart: ArrCartItem = state.cart.filter(item => item.sku !== sku);
            return { 
                ...state, 
                cart: [...filteredCart] 

            };
        };

        case QUANTITY: {
            if (!action.payload) throw new Error('action.payload missing in QUANTITY action');
            const { sku, qty } = action.payload;
            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku);
            if (!itemExists) throw new Error('Item must exist in order to update quantity');
            const updatedItem: CartItemType = { ...itemExists, qty };
            const filteredCart: ArrCartItem = state.cart.filter(item => item.sku !== sku);
            return { 
                ...state, 
                cart: [...filteredCart, updatedItem] 

            };
        };

        case SUBMIT: {
            return { ...state, cart: [] };
        }

        default:
            throw new Error('Unidentified reducer action type')
    }
};

function useCartContext(initCartState: CartStateType) {
    const [state, dispatch] = useReducer(reducer, initCartState);

    const cart = state.cart;

    const REDUCER_ACTIONS = useMemo(function () {
        return REDUCER_ACTION_TYPE;
    }, [])

    const totalItems: number = cart.reduce(function (previousValue, cartItem) {
        return previousValue + cartItem.qty;
    }, 0)

    const totalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        cart.reduce(function (previousValue, cartItem) {
            return previousValue + (cartItem.qty * cartItem.price);
        }, 0)
    )

    const sortedCart = cart.sort(function (a, b) {
        const itemA = Number(a.sku.slice(-4));
        const itemB = Number(b.sku.slice(-4));
        return itemA - itemB;
    })

    return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, sortedCart }
};

function CartProvider({ children }: ChildrenType): ReactElement {
    return (
        <CartContext.Provider value={useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    );
};

export { type UseCartContextType, type ReducerActionType, type ReducerAction, type CartItemType, CartProvider, CartContext };