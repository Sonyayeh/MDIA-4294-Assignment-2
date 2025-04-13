import { useState } from 'react';
import { useNavigate } from "react-router-dom"; // Make sure the import path is correct
import g from '../global.module.css';
import bannerImage from '../assets/images/home-bg.jpg';

function SignIn({ handleLogin }) {
    
    // Set up state variables
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(null); // State to store any errors

    // Used to redirect after login
    const navigate = useNavigate();

    // Runs when the login form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();

        // Clear previous errors
        setError(null);

        // Send login request to the backend
        fetch("http://localhost:3000/users/sign-in", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Login failed. Please check your credentials.");
            }
            return response.json();
        })
        .then(returnedData => {
            // The returned data sets the token via the key in the API, here we store it in local storage
            localStorage.setItem("jwt-token", returnedData.jwt);

            // Update authentication state and redirect
            handleLogin();

            // Redirect to the all-mangas page after successful login
            navigate('/all-mangas'); // Make sure the path matches your route path
        })
        .catch(err => {
            // Catch any errors and set error state
            setError(err.message);
        });
    };

    return (
        <main style={{ backgroundImage: `url(${bannerImage})` }} className={`${g['container']} ${g["full-width"]} ${g['banner']}`}>
            <div className={`${g['grid-container']} ${g["banner__content"]}`}>
                <div className={g['col-12']}>
                    <div>
                        <h1 className={g['h1']}>Sign In</h1>
                        {/* Display error message if any */}
                        {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                        <form className={`${g['form-group']} ${g["form--full"]}`} onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
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
                                    required
                                    onChange={(event) => {
                                        setFormData({ ...formData, password: event.target.value });
                                    }}
                                />
                            </div>
                            <input type="submit" value="Sign In" className={`${g["button"]} ${g["success"]}`} />
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignIn;
