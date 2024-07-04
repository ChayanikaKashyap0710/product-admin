import React, { useState, useEffect } from "react";
import axios from "axios";
import { store } from "../store";
import { Link } from 'react-router-dom';
import '../Styling/CategoryPageStyle.css';

function SearchItems() {
    const [searchData, setsearchData] = useState(null);

    useEffect(()=>{
        console.log("store",store.getState());
        setsearchData(store.getState().searchResult.searchData);
    })

    if (!searchData || searchData.data == undefined) {
      return <div>Loading...</div>;
    }
  return (
    <>
    <main className="grid">
        {searchData &&
          <>
            {searchData.data.site.search.searchProducts.products.edges.length !== 0 ?
              <>
                {searchData.data.site.search.searchProducts.products.edges.map((value, i) => (
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
                ))}
              </>
              :
              <div> No Data Found</div>
            }
          </>
        }
      </main>
    </>
  )
}

export default SearchItems;