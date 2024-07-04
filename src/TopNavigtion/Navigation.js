import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from '../store';
import { Link } from 'react-router-dom';
import Search from "./Search";
import { customerLogin, customerLogout } from '../actions/index';
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

  let navbar = document.querySelector(".navbar");
  let navLinks = document.querySelector(".nav-links");
  let menuOpenBtn = document.querySelector(".navbar");
  let menuCloseBtn = document.querySelector(".nav-links");
  if (menuOpenBtn != null) {
    menuOpenBtn.onclick = function () {
      navLinks.style.left = "0";
    }
    menuCloseBtn.onclick = function () {
      navLinks.style.left = "-100%";
    }
  }

  let htmlcssArrow = document.querySelector(".htmlcss-arrow");
  if (htmlcssArrow != null) {
    htmlcssArrow.onclick = function () {
      navLinks.classList.toggle("show1");
    }
  }
  let moreArrow = document.querySelector(".more-arrow");
  if (moreArrow != null) {
    moreArrow.onclick = function () {
      navLinks.classList.toggle("show2");
    }
  }
  let jsArrow = document.querySelector(".js-arrow");
  if (jsArrow != null) {
    jsArrow.onclick = function () {
      navLinks.classList.toggle("show3");
    }
  }
  return (
    <>

      <nav>
        <div className="navbar">
          <i className='bx bx-menu'></i>
          <div className="logo"><Link to={`/`}>BigCommerce Headless</Link></div>
          <div className="nav-links">
            <div className="sidebar-logo">
              <span className="logo-name"><Link to={`/`}>BigCommerce Headless</Link></span>
              <i className='bx bx-x'></i>
            </div>
            <ul className="links">
              {categoryData && categoryData.map((value, i) => (
                <>
                  {value.children.length > 0 ?
                    <li key={i}>
                      <Link to={`category/${value.entityId}`}> {value.name}</Link>
                      <i className='bx bxs-chevron-down htmlcss-arrow arrow'></i>
                      <ul className="htmlCss-sub-menu sub-menu">
                        {value.children.map((levelvalue, j) => (
                          <li key={j}>  <Link to={`category/${levelvalue.entityId}`}>{levelvalue.name}</Link></li>
                        ))}
                      </ul>
                    </li>
                    :
                    <li key={i}><Link to={`category/${value.entityId}`}>{value.name}</Link></li>
                  }
                </>
              ))}
              <li key={"user"}>
                <i className="fa fa-user" aria-hidden="true"></i>
                <i className='bx bxs-chevron-down htmlcss-arrow arrow'></i>
                <ul className="htmlCss-sub-menu sub-menu">
                  {isAuthenticated ? (
                    <li key={"logout"}><Link to={"/logout"}>Log Out</Link></li>
                  ) : (
                    <li key={"login"}><Link to={"/login"}>Log In</Link></li>
                  )}
                  <li key={"sign-up"}><Link to={"/sign-up"}>Sign In</Link></li>
                </ul> </li>
            </ul>
          </div>
          <Search />
        </div>
      </nav>
    </>
  )
}

export default TopNav;