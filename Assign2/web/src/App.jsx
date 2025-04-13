import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import authRequired from './authRequired';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AllMangas from './pages/AllMangas';
import MangaDetail from './components/MangaDetail';
import Mangas from './pages/Mangas';

// this is to protect the content of all mangas and mangas page
// it will only show the content if the users are signed in
const ProtectedAllMangas = authRequired(AllMangas);
const ProtectedManga = authRequired(Mangas);

import a from './App.module.css';

function App() {
  // this is the state that handles the authentication of the user
  // if the user is authenticated, it will show the content of all mangas and mangas page
  // if the user is not authenticated, it will redirect to the sign in page
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // this is the function that handles the logout of the user
  // it will remove the jwt token from the local storage and set the authentication state to false
  // it will also redirect the user to the sign in page
  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    setIsAuthenticated(false);
  };

  // this is the function that handles the login of the user
  // it will set the authentication state to true
  // it will also redirect the user to the all mangas page and set the jwt token in the local storage
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // this is to check if the user is authenticated or not
  // if the user is authenticated, it will set the authentication state to true, if not, it will set it to false
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt-token");
    if (jwtToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className={a.app}>
        <Header handleLogout={handleLogout} isAuthenticated={isAuthenticated} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          {/* specifically, the sign in will handle the login feature */}
          <Route path="/sign-in" element={<SignIn handleLogin={handleLogin} />} />
          {/* this is to protect the content of all mangas and mangas page */}
          <Route path="/all-mangas" element={isAuthenticated ? <ProtectedAllMangas /> : <Navigate to="/sign-in" />} />
          {/* this is to protect the content of mangas page */}
          <Route path="/manga" element={isAuthenticated ? <ProtectedManga /> : <Navigate to="/sign-in" />} />
          <Route path="/mangas/:id" element={<MangaDetail />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
