import React, { useState, useEffect } from "react";
import "./Styling/SignUpStyle.css";


function SignUp() {
    const [country, setCountry] = useState(null);
    useEffect(() => {
        fetch("http://localhost:5000/country")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCountry(data);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div className="container">
            {country &&
            <><div className="title">Registration</div><div className="content">
                    <form action="#">
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input type="text" placeholder="Enter your email" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Password</span>
                                <input type="text" placeholder="Enter your password" required />
                            </div>
                            <div className="input-box">
                                <span className="details"> Confirm Password</span>
                                <input type="text" placeholder="confirm password" required />
                            </div>
                            <div className="input-box">
                                <span className="details">First Name</span>
                                <input type="text" placeholder="Enter your first name" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Last Name</span>
                                <input type="text" placeholder="Enter your last name" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Company</span>
                                <input type="text" placeholder="Enter your company" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Phone Number</span>
                                <input type="text" placeholder="Enter your number" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Address 1</span>
                                <input type="text" placeholder="Enter your address" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Address 2</span>
                                <input type="text" placeholder="Enter your address" required />
                            </div>
                            <div className="input-box">
                                <span className="details">City</span>
                                <input type="text" placeholder="Enter your city" required />
                            </div>

                            <div className="country-details">
                                <span className="country-title">Country</span><br />
                                <select className="details" name="country" id="country">
                                    <option>Select Country</option>
                                    {country .map((value, i) => (
                                    <option key ={i} value={value.country_iso2}>{value.country}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-box">
                                <span className="details">State</span>
                                <input type="text" placeholder="Enter your state" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Zip Code</span>
                                <input type="text" placeholder="Enter your zip code" required />
                            </div>
                        </div>
                        <div className="button">
                            <input type="submit" value="Register" />
                        </div>
                    </form>
                </div></>
}
        </div>
    )

}

export default SignUp;