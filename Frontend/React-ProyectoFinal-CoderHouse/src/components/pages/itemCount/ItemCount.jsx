//Elemento hijo de productDetail
import "../itemCount/ItemCount.css"
import { useCount } from "../../hooks/useCount";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ItemCount({initial=1, stock, onAdd}) {
//                                                           1      5
    const {count, decrement, increment, } = useCount(initial,stock, 1)
    const [isAdd, setIsAd] = useState(false);
    const navigate = useNavigate();

    return (
            <div style={{ marginBottom: "20px", display: "flex", gap: "30px" }}>
                
                {
                    !isAdd && (
                        <div className="count--container">
                            <button className="sum_res" onClick={decrement} disabled={stock < 1 ? true : false}>-</button>
                            <span className="cantidad">{count}</span>
                            <button className="sum_res" onClick={increment}>+</button>
                        </div>
                    )
                }

                {
                    isAdd ? <button className="btnx btn-light" onClick={ () => {navigate("/cart")}}>Ir al carrito</button> :
                            <button className="btnx btn-light" onClick={ () => {onAdd(count), setIsAd(true)} }>Agregar al carrito</button>
                }



                {/* <Button variant="contained" onClick={ () => {onAdd(count), setIsAd(true)} }>
                    {
                        isAdd ? "Ir al carrito" : "Agregar al carrito"
                    }
                </Button> */}
            </div>
    )
}

