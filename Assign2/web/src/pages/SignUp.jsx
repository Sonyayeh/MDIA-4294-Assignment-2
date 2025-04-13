import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import g from '../global.module.css';

import bannerImage from '../assets/images/home-bg.jpg';

function SignUp() {
  // this is used to redirect after successful sign up
  const navigate = useNavigate();

  // this is the form's info based on the user's input
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // State for loading and errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // this only runs when the signup form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // this is to make sure the password matches with the confirmed password
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // this is to make sure the email and password fields are not empty
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    // this is to make sure the email is valid
    setLoading(true);
    setError(null);

    // this is to send the post request off to the users endpoint in the API with the form data from above
    fetch("http://localhost:3000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to sign up. Please try again.');
        }
        return response.json();
      })
      .then(returnedJSON => {
        setLoading(false);
        navigate("/sign-in");
      })
      .catch(err => {
        setLoading(false);
        setError(err.message);
      });
  };

  return (
    // this is the container for the sign up section
    // it includes the background image and the user and password fields and the submit button
    <main style={{ backgroundImage: `url(${bannerImage})` }} className={`${g['container']} ${g["full-width"]} ${g['banner']}`}>
      <div className={`${g["banner__content"]}`}>
        <div className={g['col-12']}>
          <div>
            <h1 className={g['h1']}>Register</h1>
            {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
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
                  placeholder="Password"
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
                  placeholder="Retype Password"
                  name="confirm-password"
                  required
                  onChange={(event) => {
                    setFormData({ ...formData, confirmPassword: event.target.value });
                  }}
                />
              </div>
              {/* this is the button for the submission for the sign up
              and the loading state is used to show the user that the request is being processed
              it will only go through if the loading state is false and the form data is valid
              */}
              <input type="submit" value={loading ? "Registering..." : "Register"} className={`${g["button"]} ${g["success"]}`} disabled={loading} />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignUp;
