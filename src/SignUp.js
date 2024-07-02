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
        <div class="container">
            {country &&
            <><div class="title">Registration</div><div class="content">
                    <form action="#">
                        <div class="user-details">
                            <div class="input-box">
                                <span class="details">Email</span>
                                <input type="text" placeholder="Enter your email" required />
                            </div>
                            <div class="input-box">
                                <span class="details">Password</span>
                                <input type="text" placeholder="Enter your password" required />
                            </div>
                            <div class="input-box">
                                <span class="details"> Confirm Password</span>
                                <input type="text" placeholder="confirm password" required />
                            </div>
                            <div class="input-box">
                                <span class="details">First Name</span>
                                <input type="text" placeholder="Enter your first name" required />
                            </div>
                            <div class="input-box">
                                <span class="details">Last Name</span>
                                <input type="text" placeholder="Enter your last name" required />
                            </div>
                            <div class="input-box">
                                <span class="details">Company</span>
                                <input type="text" placeholder="Enter your company" required />
                            </div>
                            <div class="input-box">
                                <span class="details">Phone Number</span>
                                <input type="text" placeholder="Enter your number" required />
                            </div>
                            <div class="input-box">
                                <span class="details">Address 1</span>
                                <input type="text" placeholder="Enter your address" required />
                            </div>
                            <div class="input-box">
                                <span class="details">Address 2</span>
                                <input type="text" placeholder="Enter your address" required />
                            </div>
                            <div class="input-box">
                                <span class="details">City</span>
                                <input type="text" placeholder="Enter your city" required />
                            </div>

                            <div class="country-details">
                                <span class="country-title">Country</span><br />
                                <select class="details" name="country" id="country">
                                    <option>Select Country</option>
                                    {country .map((value, i) => (
                                    <option key ={i} value={value.country_iso2}>{value.country}</option>
                                    ))}
                                </select>
                            </div>
                            <div class="input-box">
                                <span class="details">State</span>
                                <input type="text" placeholder="Enter your state" required />
                            </div>
                            <div class="input-box">
                                <span class="details">Zip Code</span>
                                <input type="text" placeholder="Enter your zip code" required />
                            </div>
                        </div>
                        <div class="button">
                            <input type="submit" value="Register" />
                        </div>
                    </form>
                </div></>
}
        </div>
    )

}

export default SignUp;