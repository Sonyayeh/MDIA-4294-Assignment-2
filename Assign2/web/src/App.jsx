import { BrowserRouter } from 'react-router-dom';  // Import Router and Routes
import { Routes, Route, Navigate, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import authRequired from './authRequired';

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

  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Passed into the header to log out
  const handleLogout = () => {
    
    localStorage.removeItem("jwt-token");
    setIsAuthenticated(false);
    
    navigate("/sign-in");

  }

  // Passed into the header to Sign-in page to login
  const handleLogin = () => {

    setIsAuthenticated(true);
    navigate("/manga");

  }

  // When the page loads, check if the user has a token
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt-token");

    if(jwtToken) {
      setIsAuthenticated(true);
    }

  }, []);

  return (
    <BrowserRouter> {/* Wrap everything in BrowserRouter for routing */}
      <div className={a.app}> {/* Main wrapper div with styles */}
        <Header handleLogout={handleLogout} isAuthenticated={isAuthenticated}/> {/* Include the header */}
        
        <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" 
          element={<SignIn handleLogin={handleLogin} />} />
          {/* Define Routes for each page */}
          <Route path="/" element={<AllMangas />} /> {/* Home page route */}
          <Route 
            path="/manga" 
            element={
              <>
                <Navigate to="/" /> 
                <ProtectedAllMangas />
              </>} /> {/* Redirect to home if user hits '/manga' */}
              <Route 
                path="/mangas/:id" 
                element={
                  <>
                    <MangaDetail /> 
                    <ProtectedManga />
                  </>
                } 
              /> {/* Manga details page route */}
        </Routes>

        <Footer /> {/* Footer component */}
      </div>
    </BrowserRouter>
  );
}

export default App;
