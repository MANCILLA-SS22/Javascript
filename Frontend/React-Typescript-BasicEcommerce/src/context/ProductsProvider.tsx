import { createContext, ReactElement, useEffect, useState } from "react";

type ChildrenType = { children?: ReactElement | ReactElement[] };

type ProductType = { sku: string, name: string, price: number }
type ArrProductType = ProductType[];
type UseProductsContextType = { products: ArrProductType };

const initState: ProductType[] = [];
const initContextState: UseProductsContextType = { products: [] };
const ProductsContext = createContext<UseProductsContextType>(initContextState);

function ProductsProvider({ children }: ChildrenType): ReactElement {
    const [products, setProducts] = useState<ArrProductType>(initState);

    useEffect(function () {
        async function fetchProducts(): Promise<ArrProductType> {
            try {
                const data = await fetch('http://localhost:3000/products');
                if (!data.ok) throw new Error(`HTTP error! status: ${data.status}`);
                return await data.json();
            } catch (err) {
                if (err instanceof Error) console.error("Error fetching products:", err.message)
                return [];
            };
        }

        async function fetchAndSetProducts (){
            try {
                const products = await fetchProducts();
                setProducts(products);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAndSetProducts ();
    }, []);

    return (
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    )
}

export { type UseProductsContextType, type ProductType, ProductsContext, ProductsProvider };