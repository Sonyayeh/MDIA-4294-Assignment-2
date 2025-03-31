// this is the update manga section
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './UpdateMangasModalContent';  // Adjusted to mangas modal content
import g from '../global.module.css';

function UpdateMangasModal({ onMangasUpdated, mangas }) {
  const [showModal, setShowModal] = useState(false);

  // this section is rendering the edit button
  // when clicked, it opend the modal and allows people to edit manga information and will update without needing to refresh the website.
  return (
    <>
      <button className={`${g['button']} ${g['small']} ${g['warning']}`} onClick={() => setShowModal(true)}>Edit</button>
      
      {/* Modal is rendered when showModal is true */}
      {showModal && createPortal(
        <ModalContent
          onMangasUpdated={onMangasUpdated}
          mangas={mangas}
          onClose={() => setShowModal(false)}
        />,
        document.body
      )}
    </>
  );
}

export default UpdateMangasModal;
