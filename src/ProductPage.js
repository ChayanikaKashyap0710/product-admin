import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styling/ProductPageStyle.css";
import { useParams } from "react-router-dom";
import $ from "jquery";


function Product() {
    const product_id = useParams();
    const [product, setProduct] = useState(null);
    const sendProductId = async () => {
        try {
            var idToSend = Number(product_id.product_id);
            const response = await axios.post('http://localhost:5000/product-id', { value: JSON.stringify(idToSend) });
            console.log(response.data);
        } catch (error) {
            console.log('Error sending value:', error);
        }
    };
    sendProductId();
    document.addEventListener("DOMContentLoaded", function () {
        const buttons = document.querySelectorAll(".option-choose");
        const images = document.querySelectorAll(".left-column img");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const id = button.id.replace('btn-', 'img-');
                images.forEach(img => img.style.display = 'none');
                document.getElementById(id).style.display = 'block';
            });
        });
    });

    useEffect(() => {
        fetch("http://localhost:5000/product-id")
            .then((response) => response.json())
            .then((data) => {

                console.log(data.data.site.products.edges[0]);
                setProduct(data.data.site.products.edges);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <main class="container-product">
            {product && product.map((value, i) => (
                <><div class="left-column">
                    {value.node.variants.edges.length > 1 ?
                        <>
                            {value.node.variants.edges.map((Options, i) => (
                                <img id={`img-${Options.node.options.edges[0].node.values.edges[0].node.entityId}`} key={i} src={Options.node.defaultImage.urlOriginal} />
                            ))}</>
                        :
                        <img id={`img-${value.node.entityId}`} key={i} src={value.node.defaultImage.url960wide} />
                    }
                </div>
                    <div class="right-column">
                        <div class="product-description">
                            <span>{value.node.brand.name}</span>
                            <h1>{value.node.name}</h1>
                            {value.node.description !== "" &&
                                <p>{value.node.description}</p>
                            }
                        </div>
                        <div class="product-configuration">
                            {value.node.variants.edges.length > 1 &&
                                <><span>{value.node.variants.edges[0].node.options.edges[0].node.displayName}</span>
                                    <div class="cable-config">
                                        <div class="option-choose">
                                            <>
                                                {value.node.variants.edges.map((Options, i) => (
                                                    <button id={`btn-${Options.node.options.edges[0].node.values.edges[0].node.entityId}`} key={i}>
                                                        {Options.node.options.edges[0].node.values.edges[0].node.label}
                                                    </button>
                                                ))}
                                            </>
                                        </div> </div>

                                </>
                            }
                        </div>
                        <div class="product-price">
                            <span>${value.node.prices.price.value}</span>
                            <a href="#" class="cart-btn">Add to cart</a>
                        </div>
                    </div></>
            ))}
        </main>
    )

}

export default Product;