import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import g from '../global.module.css';

import bannerImage from '../assets/images/home-bg.jpg';

function SignUp() {

    // Used to redirect after successful sign up
    const navigate = useNavigate();

    // The form data lives here
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    // Runs when the signup form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // If the user has typed different passwords, don't continue
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Send the post request off to the users endpoint in the api with the form data from above
        fetch("http://localhost:3000/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(async (response) => {
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Something went wrong!");
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                console.log("User created:", data);
            } else {
                console.warn("No JSON response received.");
            }

            navigate("/sign-in");
        })
        .catch((error) => {
            console.error("Signup error:", error.message);
            alert("There was an issue signing up. Please try again.");
        });
    };    

    return (
        <main style={{backgroundImage: `url(${bannerImage})`}} className={`${g['container']} ${g["full-width"]} ${g['banner']}`}>
            <div className={`${g["banner__content"]}`}>
                <div className={g['col-12']}>
                    <div>
                        <h1 className={g['h1']}>Register</h1>
                        <form onSubmit={handleSubmit} className={`${g['form-group']} ${g["form--full"]}`}>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                    placeholder='Email'
                                    required
                                    onChange={(event) => {
                                        setFormData({ ...formData, email: event.target.value });
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    placeholder='Password'
                                    name="password" 
                                    required
                                    onChange={(event) => {
                                        setFormData({ ...formData, password: event.target.value });
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input 
                                    type="password" 
                                    id="confirm-password" 
                                    placeholder='Retype Password'
                                    name="confirm-password" 
                                    required
                                    onChange={(event) => {
                                        setFormData({ ...formData, confirmPassword: event.target.value });
                                    }}
                                />
                            </div>
                            <input type="submit" value="Register" className={`${g["button"]} ${g["success"]}`} />
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignUp;
