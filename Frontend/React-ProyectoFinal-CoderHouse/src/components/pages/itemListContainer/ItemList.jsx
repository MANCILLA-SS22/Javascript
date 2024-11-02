import ProductCard from "../../common/productCard/ProductCard";
import "./ItemListContainer.css"

function ItemList ( {Items} ){
  return (
    <div className="card-container p-5">
      {
        Items.map((evento) => {
          return <ProductCard key={evento.id} evento={evento}/>;
        })
      }
    </div>
  )
}

export default ItemList

/* {Items.length > 0 ? (
          <div>
            <h2>{Items[0].title}</h2>
            <img src={Items[0].img} alt="" />
            <h3>{Items[0].price}</h3>
          </div> 
          ) : <h1>Cargando...</h1>
      } */