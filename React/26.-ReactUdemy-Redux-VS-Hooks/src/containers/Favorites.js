/* //Sin custom hooks
import { ProductsContext } from '../context/products-context';
import FavoriteItem from '../components/Favorites/FavoriteItem';
import './Products.css';
import { useContext } from 'react';

function Favorites() {
  const ctx = useContext(ProductsContext);
  const favoriteProducts = ctx.products.filter(event => event.isFavorite);
  let content = <p className="placeholder">Got no favorites yet!</p>;

  function render(){
    const res = favoriteProducts.map(function (prod){
      return <FavoriteItem key={prod.id} id={prod.id} title={prod.title} description={prod.description} />
    });

    return res;
  }

  if (favoriteProducts.length > 0) content = <ul className="products-list">{render()}</ul>;
  return content;
};

export default Favorites; */

//Con custom hooks
import { useStore } from '../hooks/store';
import FavoriteItem from '../components/Favorites/FavoriteItem';
import './Products.css';

function Favorites() {
  const state = useStore()[0];
  const favoriteProducts = state.products.filter(event => event.isFavorite);
  let content = <p className="placeholder">Got no favorites yet!</p>;

  if (favoriteProducts.length > 0) {
    content = (
      <ul className="products-list">
        {favoriteProducts.map(prod => <FavoriteItem key={prod.id} id={prod.id} title={prod.title} description={prod.description} />)}
      </ul>
    );
  };

  return content;
};

export default Favorites;