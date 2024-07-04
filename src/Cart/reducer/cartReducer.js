import React from 'react';
const cartReducer = (state, action) =>{
    if(action.type === "ADD_TO_CART"){
        let {selectedProductId, productstock , selectedVariant } = action.payload;
        let cartItems;
        
        cartItems = {
            productId : selectedProductId,
            variantId : selectedVariant,
            quantity : productstock
        };
        console.log("cartItems", cartItems);
        return {...state,
            cart: [...state.cart, cartItems]
        };
    }
};

export default cartReducer;