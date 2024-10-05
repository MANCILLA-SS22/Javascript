import { useContext } from "react";
import { CartContext, UseCartContextType } from "../context/CartProvider";

function useCart(): UseCartContextType{
    return useContext(CartContext)
}

export default useCart;