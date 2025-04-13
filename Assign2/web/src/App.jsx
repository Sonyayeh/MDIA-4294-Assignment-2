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

const ProtectedAllMangas = authRequired(AllMangas);
const ProtectedManga = authRequired(Mangas);

import a from './App.module.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    setIsAuthenticated(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

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
          <Route path="/sign-in" element={<SignIn handleLogin={handleLogin} />} />
          <Route path="/all-mangas" element={isAuthenticated ? <ProtectedAllMangas /> : <Navigate to="/sign-in" />} />
          <Route path="/manga" element={isAuthenticated ? <ProtectedManga /> : <Navigate to="/sign-in" />} />
          <Route path="/mangas/:id" element={<MangaDetail />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
