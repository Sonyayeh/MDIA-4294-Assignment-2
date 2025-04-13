import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import g from '../global.module.css'; // Assuming this is the global styles file that includes button styles

function MangaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/mangas/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch manga details');
        }
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

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Oops! Something went wrong. Please try again later.</div>;

  return (
    <div className={g['container']}>
      {manga && (
        <div className={g['flex']} style={{ gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <img
            src={`http://localhost:3000/images/${manga.imageUrl}`}
            alt={manga.title}
            style={{ width: '200px', height: 'auto', objectFit: 'cover' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <h2>{manga.title}</h2>
            <p>{manga.description}</p>
            <button
              className={`${g['button']} ${g['small']}`}
              style={{ width: '23%' }} // Adjusted button width
              onClick={() => navigate('/all-mangas')}
            >
              Back to All Mangas
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MangaDetail;
