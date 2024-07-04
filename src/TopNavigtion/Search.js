import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../Styling/SearchStyle.css';

function Search() {

  const [searchData, setsearchData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      searchItem(inputValue);
      navigate('/search');
    }
  };
  var searchUpdate;
  function searchItem(searchVal) {
    if (searchVal !== '') {
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

  var searchResult;
  const fetchSearchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/search');
      setsearchData(response.data);
      searchResult = response.data;
    } catch (error) {
      searchResult = "error";
      console.error('Error recieving value:', error);
    }
    dispatch({ type: 'SEARCH', payload: searchResult });
    clearInterval(searchUpdate);
  };
  let navbar = document.querySelector(".navbar");
  let searchBox = document.querySelector(".search-box .bx-search");
  function handleSearch() {
    navbar.classList.toggle("showInput");
    if (searchBox != null) {
      if (navbar.classList.contains("showInput")) {
        searchBox.classList.replace("bx-search", "bx-x");
      } else {
        searchBox.classList.replace("bx-x", "bx-search");
      }
    }
  }
  return (
    <>
      <div className="search-box">
        <i className='bx bx-search' onClick={() => handleSearch()}></i>
        <div className="input-box">
          <input 
        type="text"
         id="query"
        value={inputValue} 
        onChange={handleChange} 
        onKeyPress={handleEnterPress}
        placeholder="Search..." 
      />
        </div>
      </div>
    </>
  )
}

export default Search;