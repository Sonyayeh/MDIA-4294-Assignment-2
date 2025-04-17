import { useState } from 'react';
import { useNavigate } from "react-router-dom"; // Make sure the import path is correct
import g from '../global.module.css';
import bannerImage from '../assets/images/home-bg.jpg';

function SignIn({ handleLogin }) {
    
    // this is to set up state variables for the form data and error messages
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    // State to store any errors
    const [error, setError] = useState(null); 

    // this is used to redirect after successful sign in
    // ideally, users will be directed to all mangas page when signed in
    const navigate = useNavigate();

    // this runs when the login form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();

        setError(null);

        // this is to send the sign in request off to the users endpoint in the API with the form data from above
        fetch("http://localhost:3000/users/sign-in", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            // this is to check if the response is ok, if not, it will throw an error and an error message
            if (!response.ok) {
                throw new Error("Login failed. Please check your credentials.");
            }
            return response.json();
        })
        .then(returnedData => {
            // This is the returned data sets the token via the key in the API, here we store it in local storage
            localStorage.setItem("jwt-token", returnedData.jwt);

            // this is the update authentication state and redirect
            handleLogin();

            // Redirect to the all-mangas page after successful login
            navigate('/all-mangas'); 
        })
        .catch(err => {
            // Catch any errors and set error state
            setError(err.message);
        });
    };

    return (
        // this is the main container for the sign in page
        // the user will not sign in if the information, like email and password, does not match with the API's database
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
                            {/* this is basically the same thing as sign up, except this is sign in */}
                            <input type="submit" value="Sign In" className={`${g["button"]} ${g["success"]}`} />
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignIn;
