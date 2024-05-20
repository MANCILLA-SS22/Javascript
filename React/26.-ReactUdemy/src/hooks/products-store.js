//Con custom hooks
import { productsArray } from '../data/array';
import { initStore } from './store';

export default function configureProductStore() {

  function toggleFunction(curState, productId) {
    const prodIndex = curState.products.findIndex(p => p.id === productId);
    const newFavStatus = !curState.products[prodIndex].isFavorite;
    const updatedProducts = [...curState.products];

    updatedProducts[prodIndex] = {
      ...curState.products[prodIndex],
      isFavorite: newFavStatus
    };

    return { products: updatedProducts };
  }

  const userActions = { TOGGLE_FAV: toggleFunction };
  const products = { products: productsArray }

  initStore(userActions, products);
};