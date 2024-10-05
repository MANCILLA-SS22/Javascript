import { useContext } from "react"
import { ProductsContext, UseProductsContextType } from "../context/ProductsProvider"

function useProduct(): UseProductsContextType{
    return useContext(ProductsContext)
}

export default useProduct