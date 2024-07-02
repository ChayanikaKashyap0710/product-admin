import React from "react";
import { useDispatch, useSelector } from "react-redux";
import './Styling/QuantityToggleStyle.css';
import {incQuantity, decQuantity} from './actions/index';

function QuantityChange(){
    const mySate = useSelector((state) => state.numberChange)
    const dispatch = useDispatch();
    return(
        <div className="quantity-change">
            <h1>Quantity Change</h1>
            <div className="number">
                <span className="minus" onClick={ ()=> dispatch(decQuantity())}>-</span>
                <input name="quantity" type="text" value={mySate}/>
                <span className="plus" onClick={ () => dispatch(incQuantity())}>+</span>
            </div>
        </div>
    )
}

export default QuantityChange;