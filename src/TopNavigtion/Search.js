import React, { useState } from "react";
import axios from "axios";
import { Link} from 'react-router-dom';
import '../Styling/SearchStyle.css';
import '../Styling/CategoryPageStyle.css';
import $ from "jquery";
 
 function Search(){

  const [searchData, setsearchData] = useState(null);
  var searchUpdate;
      function searchItem(e) {
        e.preventDefault();
        var searchVal = $('#query').val();
        if(searchVal !== ''){
          axios.post('http://localhost:5000/search', {
            value: JSON.stringify(searchVal)
          })
          .then((response) => {
            searchUpdate = setInterval(fetchSearchData, 1000);
          }, (error) => {
            console.log(error);
          });
        }
      }

      const fetchSearchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/search');
           //console.log(response.data);
          setsearchData(response.data);
        } catch (error) {
          console.error('Error recieving value:', error);
        }
        clearInterval(searchUpdate);
      };
    return (
        <>
        <form id="search">
          <input type="search" id="query" name="search-input"  value="" placeholder="Search..." />
          <button onClick={searchItem}><svg viewBox="0 0 1024 1024"><path className="path1" d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"></path></svg></button>
        </form>
        <div>
          {searchData &&
          <>
           {searchData.data.site.search.searchProducts.products.edges.length !== 0 ?
           <>
           {searchData.data.site.search.searchProducts.products.edges.map((value, i) => (
            <div className="product-image">
            <Link to={"/product/" + value.node.entityId}>
              {value.node.defaultImage ?
              <img src={value.node.defaultImage.urlOriginal} alt={value.node.name} />
              :
              <div>No Image</div>
            }
            </Link>
          </div>
           ))}
           </>
           :
           <div> No Data Found</div>
           }
           </>
          }
        </div>
        </>
    )
 }

 export default Search;