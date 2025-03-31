import { useState, useEffect } from 'react';
import AddMangasModal from './AddMangasModal';
import g from '../global.module.css';

function Mangas() {
  const [mangas, setMangas] = useState([]);

  // Function to fetch mangas from the server
  const fetchMangas = () => {
    fetch('http://localhost:3000/mangas')
      .then((response) => response.json())
      .then((data) => setMangas(data)) // Update state to trigger re-render
      .catch((error) => console.error('Error fetching mangas:', error));
  };

  // Trigger the fetch of mangas when the component mounts
  useEffect(() => {
    fetchMangas(); // Initially fetch mangas when the component mounts
  }, []); // Empty dependency array ensures this runs only on initial mount

  // Handler for when a manga is added
  const handleMangasAdded = (newManga) => {
    // Add new manga to the list
    setMangas((prevMangas) => [...prevMangas, newManga]); 
  };

  return (
    <div>
      {/* Pass callback to modal */}
      <AddMangasModal onMangasAdded={handleMangasAdded} /> 
      <div className={g['grid-container']}>
        {mangas.length > 0 ? (
          mangas.map((manga) => (
            <div key={manga.id} className={g['col-4']}>
              <h3>{manga.name}</h3>
              <img src={`http://localhost:3000/images/${manga.image_name}`} alt={manga.name} />
            </div>
          ))
        ) : (
          <p>No mangas found</p>
        )}
      </div>
    </div>
  );
}

export default Mangas;
