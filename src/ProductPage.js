import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styling/ProductPageStyle.css";
import { useParams } from "react-router-dom";
import AddToCart from './Cart/AddToCart';
import $ from "jquery";


function Product() {
    const product_id = useParams();
    const [product, setProduct] = useState(null);
    const [selectedVariant, setselectedVariant] = useState(null);
    const [selectedProduct, setselectedProduct] = useState(null);
    const sendProductId = async () => {
        try {
            var idToSend = Number(product_id.product_id);
            const response = await axios.post('http://localhost:5000/product-id', { value: JSON.stringify(idToSend) });
            //console.log(response.data);
        } catch (error) {
            console.log('Error sending value:', error);
        }
    };
    sendProductId();

    const onOptionChange = (varId) => {
        const variantImg = {};
        var variantArr = product[0].node.variants.edges;
        for (let i = 0; i < variantArr.length; i++) {
            variantImg[variantArr[i].node.entityId] = variantArr[i].node.defaultImage.urlOriginal;
            if (variantArr[i].node.entityId == varId) {
                setselectedProduct(variantArr[i]);
            }
        }
        for (let j = 0; j < Object.entries(variantImg).length; j++) {
            if (Object.entries(variantImg)[j][0] == varId) {
                document.getElementById("img").src = Object.entries(variantImg)[j][1];
            }
        }
        setselectedVariant(varId);
    }
    useEffect(() => {
        fetch("http://localhost:5000/product-id")
            .then((response) => response.json())
            .then((data) => {
                setProduct(data.data.site.products.edges);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <main className="container-product">
            {product && product.map((value, i) => (
                <><div className="left-column">
                    <img id="img" key={i} src={value.node.defaultImage.url960wide} />
                </div>
                    <div className="right-column">
                        <div className="product-description">
                            <span>{value.node.brand.name}</span>
                            <h1>{value.node.name}</h1>
                            {value.node.description !== "" &&
                                <p>{value.node.description}</p>
                            }
                        </div>
                        <div className="product-configuration">
                            {value.node.variants.edges.length > 1 &&
                                <><span>{value.node.variants.edges[0].node.options.edges[0].node.displayName}</span>
                                    <div className="cable-config">
                                        <div className="option-choose">
                                            <>
                                                {value.node.variants.edges.map((Options, i) => (
                                                    <button id={`btn-${Options.node.entityId}`} key={i} onClick={() => onOptionChange(Options.node.entityId)}>
                                                        {Options.node.options.edges[0].node.values.edges[0].node.label}
                                                    </button>
                                                ))}
                                            </>
                                        </div> </div>

                                </>
                            }
                        </div>
                        <div className="product-price">
                            <span>${value.node.prices.price.value}</span><br />
                            {value.node.inventory.aggregated != null ?
                                <AddToCart product={{ value }} />
                                :
                                <div>Product is Out of Stock</div>}
                        </div>
                    </div></>
            ))}
        </main>
    )

}

export default Product;