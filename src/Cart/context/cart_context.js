import React, { useReducer, createContext, useContext } from "react";
import cartReducer from '../reducer/cartReducer';

const CartContext = createContext();
const initiialState = {
    cart : [],
    total_item : "",
    total_amount : ""
};

const CartProvier = ({children}) =>{
    const [state, dispatch] = useReducer(cartReducer, initiialState);
    const addToCart = (selectedProductId, productstock, selectedVariant) => {
        dispatch({ type: "ADD_TO_CART", payload: {selectedProductId, productstock, selectedVariant} })
    };
    return (<CartContext.Provider value = {{...state, addToCart}}>{children}</CartContext.Provider>)
}

const useCartContext = () =>{
    return useContext(CartContext);
}
export { CartProvier, useCartContext };