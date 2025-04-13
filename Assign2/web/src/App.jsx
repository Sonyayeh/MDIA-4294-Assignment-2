import { BrowserRouter } from 'react-router-dom';  // Import Router and Routes
import { Routes, Route, Navigate, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import authRequired from './authRequired';

import Home from './pages/Home'; // Home page
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AllMangas from './pages/AllMangas'; // All mangas page
import MangaDetail from './components/MangaDetail'; // Manga details page (updated import from components)
import Mangas from './pages/Mangas'; // Manga page (updated import from pages)

// this is to protect the data from those who aren't logged in
const ProtectedAllMangas = authRequired(AllMangas);
const ProtectedManga = authRequired(Mangas);

import a from './App.module.css'; // Assuming you have some custom styling

function App() {

  const navigate = useNavigate(); // Set up navigate for routing

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle logout and redirect
  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    setIsAuthenticated(false);
    navigate("/sign-in"); // Navigate to sign-in page after logout
  }

  // Handle login and redirect
  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/manga"); // Redirect to the manga page (or home page)
  }

  // Check if the user is already authenticated
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt-token");
    if (jwtToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter> {/* Wrap everything in BrowserRouter for routing */}
      <div className={a.app}> {/* Main wrapper div with styles */}
        <Header handleLogout={handleLogout} isAuthenticated={isAuthenticated}/> {/* Include the header */}
        
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page route */}
          <Route path="/sign-up" element={<SignUp />} /> {/* Sign up page */}
          <Route path="/sign-in" 
            element={<SignIn handleLogin={handleLogin} />} /> {/* Sign in page */}
          
          {/* Define Routes for each page */}
          <Route path="/all-mangas" element={<AllMangas />} /> {/* All mangas page route */}
          
          {/* Protected route to redirect to /all-mangas if logged in */}
          <Route 
            path="/manga" 
            element={
              isAuthenticated ? <ProtectedAllMangas /> : <Navigate to="/sign-in" /> 
            } 
          /> {/* Redirect to /sign-in if not authenticated */}
          
          {/* Manga details page route */}
          <Route 
            path="/mangas/:id" 
            element={<MangaDetail />} 
          />
        </Routes>

        <Footer /> {/* Footer component */}
      </div>
    </BrowserRouter>
  );
}

export default App;
