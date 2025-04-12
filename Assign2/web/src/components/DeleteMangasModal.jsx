import { useState } from "react";
import { createPortal } from "react-dom";
import DeleteMangasModalContent from "./DeleteMangasModalContent"; 
import g from "../global.module.css";


// this is the deleting option for each manga
function DeleteMangasModal({ mangas, onMangasDeleted }) { 
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    {/* this is the button section with the styles applied from the selected imported css */}
      <button 
        className={`${g["button"]} ${g["small"]} ${g["delete"]}`} 
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>

        {/* this content is wrapped around DeleteMangaModalContent, and when manga, which is under the name of mangas, is being selected to delete, the pop up screen would close when clicked yes */}
      {showModal && createPortal(
        <DeleteMangasModalContent 
          mangas={mangas}
          onMangasDeleted={onMangasDeleted}
          onClose={() => setShowModal(false)}
        />, 
        document.body
      )}
    </>
  );
}

export default DeleteMangasModal;
