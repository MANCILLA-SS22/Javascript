/* //Sin custom hooks
import { ProductsContext } from '../context/products-context';
import ProductItem from '../components/Products/ProductItem';
import './Products.css';
import { useContext } from 'react';

function Products() {
  const ctx = useContext(ProductsContext);

  function render(){
    const res = ctx.products.map(function(prod){
      return <ProductItem key={prod.id} id={prod.id} title={prod.title} description={prod.description} isFav={prod.isFavorite} />
    });

    return res;
  }
  
  return <ul className="products-list">{render()}</ul>;
};

export default Products; */

//Con custom hooks
import { useStore } from '../hooks/store';
import ProductItem from '../components/Products/ProductItem';
import './Products.css';

function Products() {
  const state = useStore()[0]; //const [state, setState] = useStore();
  return (
    <ul className="products-list">
      {state.products.map(prod => <ProductItem key={prod.id} id={prod.id} title={prod.title} description={prod.description} isFav={prod.isFavorite} />)}
    </ul>
  );
};

export default Products;