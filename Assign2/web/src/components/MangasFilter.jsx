// this is the filter thing by the first page
import { useState } from 'react';
import tf from './mangasFilters.module.css'; 
import g from '../global.module.css';

// I decided to filter by genre because...it only made sense to do it based on genre...?
function MangasFilters({ updatemangas }) {
    const [genres] = useState([
        // these genres are also stored in the API!
        "Dark Fantasy", "Seinen Manga", "Shonen Manga", "Sports Manga", "Fantasy", "Action Manga"
    ]);

    // long story short, it manages to show only the manga with the same genre, it basically filters out the manga with the same genre to display in the front
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
            .then((data) => updatemangas(data))
            .catch((error) => console.error('Error fetching mangas:', error));
    };


    // this section is long too...so I will put all details here:
    // basically this is the filter section and what it looks like. it includes the filter dropdown menu and a button to initiate the filter. Once each genre is being chosen, it will filter out the only mangas that has the same genre. if you click select genre, the default option, it will return every single manga available. I also added paddings for the button and filter, so it looks better
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
