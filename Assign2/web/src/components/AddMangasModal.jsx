// this is the addig manga section
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './AddMangasModalContent';
import g from '../global.module.css';

// this is the function for adding manga feature
function AddMangasModal({ onMangasAdded }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    {/* this is the button that triggers the adding manga function, when on clicked, the manga would be added to the displayed list */}
      <button className={g['button']} onClick={() => setShowModal(true)}>
        + Add mangas +
      </button>
      {/* this means when the mangas are addedm the pop up screen for adding manga would disappear, and thus finishes the process of adding mangas */}
      {showModal &&
        createPortal(
          <ModalContent onMangasAdded={onMangasAdded} onClose={() => setShowModal(false)} />,
          document.body
        )}
    </>
  );
}

export default AddMangasModal;
