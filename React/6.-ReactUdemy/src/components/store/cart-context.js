import { createContext } from "react";

// Setting defaults inside createContext() is recommended but not always required. The defaults improves IDE intellisense (code hinting)
const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: function(item){},
    removeItem: function(id){}
});

export default CartContext;