import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import store from '../store';
import { Link } from 'react-router-dom';
import Search from "./Search";
import {customerLogin, customerLogout} from '../actions/index';
import './AppStyle.css';
import Login from "../Login";
function TopNav() {
  const mySate = useSelector((state) => state.customerLogout);
  const isAuthenticated = useSelector(state => state.customerLoginStatus.isAuthenticated);
  const loginDetails = useSelector(state => state.customerLoginStatus.user);
  const dispatch = useDispatch();
  const [categoryData, setcategoryData] = useState(null);
  const [loginStatus, setloginStatus] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => response.json())
      .then((data) => {
        setcategoryData(data.data.site.categoryTree);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div className="user-nav">
        <Search/>
        <div className="user">
        <ul className="multilevel-dropdown-menu">
          <li className="parent"><i className="fa fa-user" aria-hidden="true"></i>
            <ul className="child">
              {/* <li><Link to={"/login"}>Login</Link></li> */}
              {isAuthenticated ? (
                 <li><Link to={"/logout"}>Log Out</Link></li>
                ) : (
                  <li><Link to={"/login"}>Log In</Link></li>
                )}
              <li><Link to={"/sign-up"}>Sign In</Link></li>
            </ul>
          </li>
          </ul>
        </div>
      <div className ="container-fluid">
      <ul className="multilevel-dropdown-menu">
        {categoryData && categoryData.map((value, i) => (
          <>
            {value.children.length > 0 ?
              <li key={i} className="parent">
                  <Link to={`category/${value.entityId}`}> {value.name}</Link>
                  <i className="fa fa-angle-down"></i>
                <ul className="child">
                  {value.children.map((levelvalue, j) => (
                    <li key={j}>  <Link to={`category/${levelvalue.entityId}`}>{levelvalue.name}</Link></li>
                  ))}
                </ul>
              </li>
              :
              <li key={i} className="parent"><Link to={`category/${value.entityId}`}>{value.name}</Link></li>
            }
          </>
        ))}
      </ul>
      </div>
      </div>
    </>
  )
}

export default TopNav;