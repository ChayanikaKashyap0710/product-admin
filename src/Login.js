import React, { useState, useEffect,useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from './store';
import {customerLogin} from './actions/index';
import $ from "jquery";
import axios from "axios";
import validate from "jquery-validation";
import "./Styling/LoginStyle.css";


function Login() {
    const mySate = useSelector((state) => state.customerLogin)
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [loginResponse, setloginResponse] = useState("");
    const [password, setPassword] = useState("");
     const [isPending, sendLoginDetails] = useTransition();
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswdChange = (event) => {
    setPassword(event.target.value);
    };
    $("#login").validate({
        rules: {
            email: {
            required: true,
            email: true
            },
            password: {
            required: true,
            minlength: 5
            }
        },
        messages: {
            password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long"
            },
            email: "Please enter a valid email address"
        },
        submitHandler: function(form) {
        }
    });
    var loginUpdate;
    var handleSubmit;
    handleSubmit = () => {
      sendLoginDetails(async () => {
          try {
            var detailsToSend = {email,password};
            const response = await axios.post('http://localhost:5000/login', { value: JSON.stringify(detailsToSend) });
           loginUpdate = setInterval(getLoginStatus, 1000);
          } catch (error) {
            console.log('Error sending value:', error);
          }
        })
    };
    var customerLoginResponse;
    const getLoginStatus = async() => {
          try {
            const response = await axios.get('http://localhost:5000/login');
            if(response.data.errors !== undefined){
                setloginResponse(response.data.errors[0].message);
                customerLoginResponse =response.data.errors[0].message;
            }else {
                setloginResponse("SUCCESS") ;
                customerLoginResponse = "SUCCESS";
            }
            dispatch({ type: 'LOGIN', payload: customerLoginResponse });
            clearInterval(loginUpdate);
          } catch (error) {
            console.log('Error recieving value:', error);
          }
        };
    return (
        <div className="container">
            <form id="login">
                <label>Email</label>
                <input type="email" name="email" value={email} onChange={handleEmailChange}/>
                <label>Password</label>
                <input type="password" name="password"value={password} onChange={handlePasswdChange} />
                <button block size="lg" type="submit" onClick={handleSubmit}>
                    Login
                </button>
            </form>
            <div>{loginResponse}</div>
        </div>
    )

}

export default Login;