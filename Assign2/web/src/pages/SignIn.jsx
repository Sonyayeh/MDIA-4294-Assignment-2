import { useState } from 'react';
import { useNavigate } from "react-router";
import g from '../global.module.css';
import bannerImage from '../assets/images/home-bg.jpg';

function SignIn({ handleLogin }) {

    // Set up state variables
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState(""); // Store error message
    const navigate = useNavigate(); // Used to redirect after login

    // Runs when the sign in form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/users/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const returnedData = await response.json();

            if (!response.ok) {
                throw new Error(returnedData.message || "Login failed");
            }

            // Store JWT token and update auth state
            localStorage.setItem("jwt-token", returnedData.jwt);
            handleLogin();

            // Redirect to AllMangas page after successful login
            navigate("/all-mangas");

        } catch (err) {
            console.error("Login error:", err);
            setErrorMessage(err.message); // Display the error message
        }
    };

    return (
        <main
            style={{ backgroundImage: `url(${bannerImage})` }}
            className={`${g['container']} ${g["full-width"]} ${g['banner']}`}
        >
            <div className={`${g['grid-container']} ${g["banner__content"]}`}>
                <div className={g['col-12']}>
                    <div className={`${g['card']} ${g['card--w-padding']}`}>
                        <h1 className={g['h1']}>Sign In</h1>
                        <form
                            className={`${g['form-group']} ${g["form--full"]}`}
                            onSubmit={handleSubmit}
                        >
                            {/* Show error message if login fails */}
                            {errorMessage && (
                                <p style={{ color: 'red', marginBottom: '1rem' }}>{errorMessage}</p>
                            )}
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
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
                                    required
                                    value={formData.password}
                                    onChange={(event) => {
                                        setFormData({ ...formData, password: event.target.value });
                                    }}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Sign In"
                                className={`${g["button"]} ${g["success"]}`}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignIn;
