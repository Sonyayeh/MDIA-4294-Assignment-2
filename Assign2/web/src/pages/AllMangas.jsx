import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddMangasModal from '../components/AddMangasModal';
import UpdateMangasModal from '../components/UpdateMangasModal';
import DeleteMangasModal from '../components/DeleteMangasModal';
import MangasFilters from "../components/MangasFilter";
import g from '../global.module.css';
import at from './Allmangas.module.css';

function AllMangas() {
    const [mangas, setMangas] = useState([]);
    const [modalOpen, setModalOpen] = useState(null);
    const [modalOpenType, setModalOpenType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMangas = async (filters = "") => {
        try {
            setLoading(true);
            const url = filters ? `http://localhost:3000/mangas?${filters}` : 'http://localhost:3000/mangas';
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch mangas');
            }
            const data = await response.json();
            setMangas(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching mangas:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    const handleUpdatedMangas = (updatedMangas) => {
        setMangas(updatedMangas);
        setModalOpen(null);  // Close modal after update
        setModalOpenType(null);  // Reset modal type
    };

    useEffect(() => {
        fetchMangas();
    }, []);

    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">Oops! Something went wrong. Please try again later.</div>;
    }

    return (
        <main className={g['container']}>
            <h2>Manga Collection</h2>
            <div className={g['grid-container']}>
                <div className={g['col-3']}>
                    <h3>Filters</h3>
                    <MangasFilters updateMangas={handleUpdatedMangas} />
                </div>
                <div className={g['col-9']}>
                    <div className={`${g['flex']} ${g['space-between']} ${g['items-center']}`}>
                        <h3>My Collection</h3>
                        <AddMangasModal onMangasAdded={fetchMangas} />
                    </div>
                    <div className={g['grid-container']}>
                        {mangas.map(mangasItem => (
                            <div key={mangasItem.id} className={`${g['col-4']} ${g['flex']} ${g['flex-grow']}`}>
                                <div className={g['card']}>
                                    {mangasItem.imageUrl ? (
                                        <img 
                                            src={`http://localhost:3000/images/${mangasItem.imageUrl}`} 
                                            alt={mangasItem.title} 
                                            loading="lazy" 
                                        />
                                    ) : (
                                        <div className={g['no-image']}>No Image Available</div>
                                    )}

                                    <div className={g['card-content']}>
                                        <h4 className={at['mangas-title']}>{mangasItem.title}</h4>
                                        <p>
                                            {Array.isArray(mangasItem.author)
                                                ? mangasItem.author.map(a => a.name).join(", ")
                                                : mangasItem.author || "Unknown Author"}
                                        </p>

                                        <div className={at['mangas-actions']}>
                                            <Link to={`/mangas/${mangasItem.id}`} className={`${g['button']} ${g['small']}`}>
                                                View
                                            </Link>

                                            {modalOpen === mangasItem.id && modalOpenType === "update" && (
                                                <UpdateMangasModal onMangasUpdated={fetchMangas} mangas={mangasItem} />
                                            )}
                                            {modalOpen === mangasItem.id && modalOpenType === "delete" && (
                                                <DeleteMangasModal onMangasDeleted={fetchMangas} mangas={mangasItem} />
                                            )}

                                            <button 
                                                onClick={() => {
                                                    setModalOpen(mangasItem.id);
                                                    setModalOpenType("update");
                                                }}
                                                className={`${g['button']} ${g['small']}`} 
                                            >
                                                Update
                                            </button>

                                            <button 
                                                onClick={() => {
                                                    setModalOpen(mangasItem.id);
                                                    setModalOpenType("delete");
                                                }}
                                                className={`${g['button']} ${g['small']}`} 
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AllMangas;
