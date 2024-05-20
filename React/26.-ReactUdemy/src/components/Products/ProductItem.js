/* //Sin custom hooks
import { ProductsContext } from '../../context/products-context';
import { memo, useContext } from 'react';
import Card from '../UI/Card';
import './ProductItem.css';

const ProductItem = memo(function (props){
  const ctx = useContext(ProductsContext);

  function toggleFavHandler() {
    ctx.toggleFav(props.id);
  };

  function render(){
    return props.isFav ? 'Un-Favorite' : 'Favorite'
  }

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className="product-item">
        <h2 className={props.isFav ? 'is-fav' : ''}>{props.title}</h2>
        <p>{props.description}</p>
        <button className={!props.isFav ? 'button-outline' : ''} onClick={toggleFavHandler} >
          {render()}
        </button>
      </div>
    </Card>
  );
});

export default ProductItem; */

//Con custom hooks
import { useStore } from '../../hooks/store';
import React, { memo } from 'react';
import Card from '../UI/Card';
import './ProductItem.css';

const ProductItem = React.memo(function (props) {
  const setDispatch = useStore(false)[1];

  function toggleFavHandler() {
    setDispatch('TOGGLE_FAV', props.id);
  };

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className="product-item">
        <h2 className={props.isFav ? 'is-fav' : ''}>{props.title}</h2>
        <p>{props.description}</p>
        <button className={!props.isFav ? 'button-outline' : ''} onClick={toggleFavHandler} >
          {props.isFav ? 'Un-Favorite' : 'Favorite'}
        </button>
      </div>
    </Card>
  );
});

export default ProductItem;