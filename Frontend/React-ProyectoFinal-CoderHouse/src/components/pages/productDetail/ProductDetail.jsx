//Elemento hijo / Elemento padre de ItemCount
import { ItemCount } from "../itemCount/ItemCount";
import "./ProductDetail.css";
import "../../pages/itemCount/ItemCount.css"

function ProductDetail({productSelected, onAdd, cantidad}){ //console.log(productSelected);

  return (

      <>
        <h1 style={{fontSize:"40px"}} className="text-light pt-5">{productSelected.fullName}</h1>
        <div className="container text-center">

          <div className="tarjeta row row-cols-2 text-light p-4 m-5 ">
            <div className="col align-self-center">
              <img className="ind" src={productSelected.img} alt="" />
            </div>
  
            <div className="col align-self-center">
              {
                productSelected.stock > 0 ? 
                (<div style={{ display: "flex", justifyContent: "center" }}><ItemCount initial={cantidad} stock={productSelected.stock} onAdd={onAdd}/></div>) : 
                (<h3>No hay nada</h3>)            
              }  
            </div>
            
            <div className="col mt-5 align-self-start">
              <p style={{fontSize:"20px"}} className="text-start text-light">{productSelected.completeDescription}</p>
            </div>
            <div className="col d-flex flex-row">
              
              <div className="container text-center">
                <div className="col">
                  <div className="row">
                    <img className="logo" src="https://cdn7.bigcommerce.com/s-1kqh9qmybo/product_images/uploaded_images/freeshipping2.png" alt=""/>
                  </div>
                  <div className="col">
                    <h6>{productSelected.rate}<span>(2 reviews)</span> <span>Write a review</span></h6>
                  </div>
                  <div className="col">
                    <span> ${productSelected.priceBefore}</span> - ${productSelected.priceNow} <span> </span>
                    <p>(You save ${(productSelected.priceBefore - productSelected.priceNow).toFixed(2)}) </p>
                  </div>
                  <div className="col">
                    <h6>{productSelected.credit}</h6>
                  </div>
                  <div className="col">
                    <h6>{productSelected.stockDetail}</h6>
                  </div>
                  <div className="col">
                    <h6>{productSelected.shipping}</h6>
                  </div>
                </div>

                <div className="row">
                  <div className="col pt-3">
                    <h6>Model: </h6>

                    <h6>Caliber: </h6>
                    <h6>Action</h6>
                    <h6>Length: </h6>
                    <h6>Barrel length: </h6>
                    <h6>Weight: </h6>
                    <h6>Magazine capacity: </h6>
                    <h6>Rate of fire (rounds/minute)</h6>
                    <h6>Effective firing range</h6>

                    <h6>Classification: </h6>
                  </div>

                  <div className="col pt-3">
                    <h6>{productSelected.title}</h6>

                    <h6>{productSelected.caliber}</h6>
                    <h6>{productSelected.action}</h6>
                    <h6>{productSelected.LengthFolded}</h6>
                    <h6>{productSelected.BarrelLength}</h6>
                    <h6>{productSelected.WeightEmpty}</h6>
                    <h6>{productSelected.rounds}</h6>
                    <h6>{productSelected.fireRate}</h6>
                    <h6>{productSelected.effective}</h6>

                    <h6>{productSelected.classification}</h6>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </>

  )
}

export default ProductDetail

