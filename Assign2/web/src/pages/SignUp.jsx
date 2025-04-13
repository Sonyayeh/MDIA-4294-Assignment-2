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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            // Make the request to the backend
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const returnedJSON = await response.json();

            // Check if the response is okay (status 2xx)
            if (!response.ok) {
                throw new Error(returnedJSON.message || "Signup failed");
            }

            navigate("/sign-in"); // Redirect to sign-in page after successful registration

        } catch (err) {
            console.error("Error during signup:", err);
            alert("Error during signup: " + err.message); // Display error message to user
        }
    };

    return (
        <main style={{ backgroundImage: `url(${bannerImage})` }} className={`${g['container']} ${g["full-width"]} ${g['banner']}`}>
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
                                    placeholder="Email"
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
                                    name="password"
                                    placeholder="Password"
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
                                    placeholder="Retype Password"
                                    name="confirm-password"
                                    required
                                    onChange={(event) => {
                                        setFormData({ ...formData, confirmPassword: event.target.value });
                                    }}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Register"
                                className={`${g["button"]} ${g["success"]}`}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignUp;
