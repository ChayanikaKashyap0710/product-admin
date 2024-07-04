import React, { useState } from "react";
import { Link } from 'react-router-dom';
import CartAmountToggle from './CartAmountToggle';
import { CartProvider, useCartContext } from './context/cart_context';
import "../Styling/ProductPageStyle.css";

function AddToCart(props) {
    const { addToCart } = useCartContext();
    var product = props.product;
    var selectedVariant = props.product.selectedVariant;
    var selectedProduct = [];

    // for (let i = 0; i < product.productData.data.site.product.variants.edges.length; i++) {
    //     if (product.productData.data.site.product.variants.edges[i].node.entityId == selectedVariant) {
    //         selectedProduct.push(product.productData.data.site.product.variants.edges[i].node);
    //     }
    // }
     var selectedProductId = product.value.node.entityId;
     const [productstock, setProductStock] = useState(1);
     //const [isModalOpen, setModalOpen] = useState(false);
    // const openModal = () => {
    //     setModalOpen(true);
    // };

    // const closeModal = () => {
    //     setModalOpen(false);
    // };

    const setDecrease = () => {
        setProductStock((prevStock) => (prevStock > 1 ? prevStock - 1 : 1));
    };
    const setIncrease = () => {
        const maxStock = product.value.node.inventory.aggregated.availableToSell;
        setProductStock((prevStock) =>
            prevStock < maxStock ? prevStock + 1 : maxStock
        );
    };

    return (
        <div>
            <CartAmountToggle
                productstock={productstock}
                setDecrease={setDecrease}
                setIncrease={setIncrease}
            />


            <Link to="/cart" onClick={() => addToCart(selectedProductId, productstock, Number(selectedVariant))}>
                <button className="cart-btn">Add To Cart</button>
            </Link>


            {/* <button onClick={openModal}>Add To Cart</button>
             <ModalComponent
        isOpen={isModalOpen}
        closeModal={closeModal}
        productId= {selectedProductId} variantId= {selectedVariant} stock = {productstock} product = {product} selectedProduct = {selectedProduct}
      /> */}
        </div>
    );
}

export default AddToCart;
