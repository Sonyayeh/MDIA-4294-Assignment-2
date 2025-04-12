import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import g from '../global.module.css';
import bannerImage from '../assets/images/home-bg.jpg';

function SignIn( { handleLogin } ) {
    
    // Set up state variabes
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // Used to redirect back to the home page
    const navigate = useNavigate();

    // Runs when the log in form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch("http://localhost:3000/users/sign-in", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then( response => response.json() )
        .then( returnedData => {
            // The returned data sets the token via the key in the API, here we store it local storate
            localStorage.setItem( "jwt-token", returnedData.jwt);

            // Update authentication state from app.js and redirectß
            handleLogin();
        });

    };

    return (
        <main style={{ backgroundImage: `url(${bannerImage})` }} className={`${g['container']} ${g["full-width"]} ${g['banner']}`}>
            <div className={`${g['grid-container']} ${g["banner__content"]}`}>
                <div className={g['col-12']}>
                    <div className={`${g['card']} ${g['card--w-padding']}`}>
                        <h1 className={g['h1']}>Sign In</h1>
                        <form className={`${g['form-group']} ${g["form--full"]}`} onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    onChange={ (event) => {
                                        setFormData({ ...formData, email: event.target.value })
                                    } } 
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    onChange={ (event) => {
                                        setFormData( {...formData, password: event.target.value} );
                                    } }
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