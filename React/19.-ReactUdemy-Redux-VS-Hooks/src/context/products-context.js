//Sin custom hooks y con useContex
import { createContext, useState } from 'react';
import { productsArray } from '../data/array';

export const ProductsContext = createContext({
    products: [],
    toggleFav: function (id) { }
});

function ProductsProvider(props) {
    const [productsList, setProductsList] = useState(productsArray);

    function toggleFavorite(productId) {
        setProductsList(function (currentProdList) {
            const prodIndex = currentProdList.findIndex(p => p.id === productId);
            const newFavStatus = !currentProdList[prodIndex].isFavorite;         
            const updatedProducts = [...currentProdList];                        

            updatedProducts[prodIndex] = {
                ...currentProdList[prodIndex],
                isFavorite: newFavStatus
            };

            console.log("prodIndex", prodIndex);
            console.log("newFavStatus", newFavStatus);
            console.log("updatedProducts", updatedProducts);

            return updatedProducts;
        });
    };

    return (
        <ProductsContext.Provider value={{ products: productsList, toggleFav: toggleFavorite }} >
            {props.children}
        </ProductsContext.Provider>
    );
};

export default ProductsProvider;