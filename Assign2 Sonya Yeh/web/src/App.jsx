import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';  // Import Router and Routes

import Header from './components/Header';
import Footer from './components/Footer';

import AllMangas from './pages/AllMangas'; // All mangas page
import MangaDetail from './components/MangaDetail'; // Manga details page (updated import from components)

import a from './App.module.css'; // Assuming you have some custom styling

function App() {
  return (
    <BrowserRouter> {/* Wrap everything in BrowserRouter for routing */}
      <div className={a.app}> {/* Main wrapper div with styles */}
        <Header /> {/* Include the header */}
        
        <Routes>
          {/* Define Routes for each page */}
          <Route path="/" element={<AllMangas />} /> {/* Home page route */}
          <Route path="/manga" element={<Navigate to="/" />} /> {/* Redirect to home if user hits '/manga' */}
          <Route path="/mangas/:id" element={<MangaDetail />} /> {/* Manga details page route */}
        </Routes>

        <Footer /> {/* Footer component */}
      </div>
    </BrowserRouter>
  );
}

export default App;
