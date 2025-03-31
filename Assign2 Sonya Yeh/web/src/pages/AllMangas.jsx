// this shows the all mangas that are displayed on the server/API
// this also includes every feature from the component, like add, update, delete and manage filter
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddMangasModal from '../components/AddMangasModal';
import UpdateMangasModal from '../components/UpdateMangasModal';
import DeleteMangasModal from '../components/DeleteMangasModal';
import MangasFilters from "../components/MangasFilter";
import g from '../global.module.css';
import at from './Allmangas.module.css';

// because this is too long, I'm just going to do a summary:
// basically, this is the landing page, it displays all of the mangas on the server with features such as view, delete and update manga information. It also includes features such as viewing information about each manga and filter based on their genres. 

// each feature, the add, update, delete manga and manage filter, are directly imported from the other component pages, and will become accessible for every mangas. Every single time when users view about the manga or do anything to it, the system will fetch the information of individual manga data from the server/API, and then display the information onto the page when buttons of the actions were clicked. 

// each mangas and information about the mangas and authors, will be fetched from the localhost:3000 link in every url line mentioned!
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
    };

    useEffect(() => {
        fetchMangas();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <main className={g['container']}>
            <h2>Manga Collection</h2>
            <div className={g['grid-container']}>
                <div className={g['col-3']}>
                    <h3>Filters</h3>
                    {/* Make sure the correct function is passed */}
                    <MangasFilters updatemangas={handleUpdatedMangas} /> 
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
                                                className={`${g['button']} ${g['small']}`}  // Add the same styles as View
                                            >
                                                Update
                                            </button>

                                            <button 
                                                onClick={() => {
                                                    setModalOpen(mangasItem.id);
                                                    setModalOpenType("delete");
                                                }}
                                                className={`${g['button']} ${g['small']}`}  // Add the same styles as View
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
