import { useState } from 'react';
import tf from './mangasFilters.module.css'; 
import g from '../global.module.css';

function MangasFilters({ updateMangas }) {
  const [genres] = useState([
    "Dark Fantasy", "Seinen Manga", "Shonen Manga", "Sports Manga", "Fantasy", "Action Manga"
  ]);

  const handleFilterSubmit = (event) => {
    event.preventDefault();

    const filterFormData = new FormData(event.target);
    const selectedGenre = filterFormData.get('genre');

    let queryString = "";

    if (selectedGenre && selectedGenre !== "Select Genre") {
      queryString += `genre=${selectedGenre}`;
    }

    const url = queryString ? `http://localhost:3000/mangas?${queryString}` : "http://localhost:3000/mangas";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (typeof updateMangas === "function") {
          updateMangas(data); // Pass updated data to the parent component
        } else {
          console.error("updateMangas is not a function");
        }
      })
      .catch((error) => console.error('Error fetching mangas:', error));
  };

  return (
    <div className={tf['filters-container']} style={{ padding: "10px" }}>
      <form onSubmit={handleFilterSubmit}>
        <div className={g['form-group']} style={{ marginBottom: "10px" }}>
          <h4>Genres</h4>
          <select name="genre" className={g['select']} style={{ padding: "5px", marginBottom: "10px" }}>
            <option value="Select Genre">Select Genre</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: "10px" }}>
          <input type="submit" value="Apply Filters" className={g['button']} style={{ padding: "8px 12px" }} />
        </div>
      </form>
    </div>
  );
}

export default MangasFilters;
