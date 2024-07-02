import React, { useState, useEffect } from "react";
import axios from 'axios';
import $ from "jquery";
import { Link, useParams, useSearchParams } from 'react-router-dom';
import './Styling/CategoryPageStyle.css';

function CategoryDetails() {
  const catId = useParams();
  const [variantId, setvariantId] = useState(null);
  const [catData, setcatData] = useState(null);
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  const onOptionChange = e => {
    setvariantId(e.target.id);
  }
  window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  const sendCatId = async () => {
    try {
      var idToSend = Number(catId['cat_id']);
      const response = await axios.post('http://localhost:5000/category-id', { value: JSON.stringify(idToSend) });
      console.log(response.data);
    } catch (error) {
      console.log('Error sending value:', error);
    }
  };
  sendCatId();
  useEffect(() => {
    const fetchCat = async () => {
    fetch("http://localhost:5000/category-id")
      .then((response) => response.json())
      .then((data) => {
        setcatData(data);
      })
      .catch((error) => console.log(error));
    }
    fetchCat();
  }, [catId]);

  if (!catData) {
    return <div>Loading...</div>;
  }
  const products = catData.data.site.category.products.edges;
  return (
    <div>
      {catData &&
        <>
          <h2 className="cat-name">{catData.data.site.category.name}</h2>
        </>
      }
      <main className="grid">
        {products.length != 0 ?
          <>
            {products.map((value, i) => (
              <>
                <article key={i}>
                  <div className="product-image">
                    <Link to={"/product/" + value.node.entityId}>
                      {value.node.defaultImage ?
                      <img src={value.node.defaultImage.urlOriginal} alt={value.node.name} />
                      :
                      <div>No Image</div>
                    }
                    </Link>
                  </div>
                  <div className="text"><h3>
                    <Link to={"/product/" + value.node.entityId}>
                      {value.node.name}
                    </Link></h3>
                  </div>
                </article>
              </>
            ))}
          </>
          :
          <div>No Product</div>
        }
      </main>
    </div>
  )
}

export default CategoryDetails;