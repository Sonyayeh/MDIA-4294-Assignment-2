
// this is the manga detail section
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import g from '../global.module.css';  

function MangaDetail() {
    // Get manga ID from the URL
    const { id } = useParams();  
    // Use navigate hook to go back
    const navigate = useNavigate();  
    const [manga, setManga] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // this basically fetches the manga details based on their IDs on API
        const fetchMangaDetails = async () => {
            try {
                // this is the link that the data is being fetched
                const response = await fetch(`http://localhost:3000/mangas/${id}`);
                // if it fails, show an error message
                if (!response.ok) {
                    throw new Error('Failed to fetch manga details');
                }
                // this makes sure the UI updates properly by shiwing either the manga details or an error message if something goes wrong
                const data = await response.json();
                setManga(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching manga details:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchMangaDetails();
    }, [id]);

    // this is the loading message it shows when users click on the view button
    if (loading) {
        return <div>Loading...</div>;
    }

    // the error message if it failed to load
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        // this whole thing's explanation will be here so you can read it all at once:
        // basically, it shows the title, image, description, year, author and genre, and they're all fetched from the API
        // the reason why this part is so long, is becasue the positioning of each elements
        // i made sure that the image goes first, following by other supporting details at the very bottom, just to keep it prettier
        // i also added a back button for users to go back to the manga list
        
        manga && (
            <main className={g['container']}>
                <h2>{manga.title}</h2>

                <div className={g['flex']} style={{ flexDirection: 'column' }}>
                    {manga.imageUrl && (
                        <img 
                            src={`http://localhost:3000/images/${manga.imageUrl}`} 
                            alt={manga.title} 
                            loading="lazy" 
                            className={g['manga-detail-image']}  
                        />
                    )}
                    <div className={g['manga-detail-info']} style={{ marginTop: '20px' }}>
                        <h3>Description</h3>
                        <p>{manga.description || 'No description available.'}</p>
                        <p><strong>Author:</strong> {manga.author}</p>
                        <p><strong>Year:</strong> {manga.year}</p>
                        <p><strong>Genre:</strong> {manga.genre}</p>
                    </div>
                </div>
                {/* Back Button */}
                <button onClick={() => navigate('/')} className={g['button']}>Back to Manga List</button> 
            </main>
        )
    );
}

export default MangaDetail;
