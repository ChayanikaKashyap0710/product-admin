import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from './store';
import {customerLogout} from './actions/index';

function Logout() {
    const dispatch = useDispatch();
    useEffect(() => {
        fetch("http://localhost:5000/logout")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          dispatch({ type: 'LOGOUT'});
        })
        .catch((error) => console.log(error));
}, []);
      
   
    return (
        <div className="container">
            <h1>You are logged Out</h1>
        </div>
    )

}

export default Logout;