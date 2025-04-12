// this is the content section of the deleting manga feature
import PropTypes from 'prop-types';
import g from "../global.module.css";
import m from "./DeleteMangasModalContent.module.css";

// this checks if the manga exists and have an id. 
// if not, it will return the error message and logs as an error and returns null to stop the function from running
function DeleteMangasModalContent({ mangas, onClose, onMangasDeleted }) {
  if (!mangas || !mangas.id) {
    console.error('Manga ID is missing');
    alert('Manga not found!');
    return null;
  }

  // the function runs when the user tries to delete a manga
  // these code prevent the default from action so the page doesn't reload
  // it also sends a DELETE request to the API to remove the manga by using its ID and check if the request was successful
  // if it's not successful, it throws an error
  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/mangas/${mangas.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete manga');
      }

      // Notify parent component to update the state
      onMangasDeleted(mangas.id);

      // Close the modal after deletion on its own!
      onClose();
    } catch (error) {
      console.error('Error during deletion:', error);
      alert('An error occurred while deleting the manga.');
    }
  };

  // this is the form section, similar to adding mangas, it shows the information about the manga's name and author.
  // it is like shooting a question asking "are you sure you want to delete "manga title from API" by "manga Author from API"?
  // if click yes, the manga is deleted, and the form closes itself
  // users don't need to refresh the page to see if it's removed, as it will render on its own without needing to refresh
  return (
    <div className={m["modal-container"]}>
      <div className={`${m["modal"]} ${g["card"]}`}>
        <h3>
          Are you sure you want to delete the manga "{mangas.title}" by {mangas.author}?
        </h3>
        <form onSubmit={handleDelete}>
          <button className={`${g["button"]} ${g["delete"]}`} type="submit">
            Yes
          </button>
        </form>
        {/* and this is just a X button to close the form, the same thing we did in class hehe */}
        <button className={m["modal__close-button"]} onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}

// this code is to make sure the component gets to the correct data, helping to catch any errors early
DeleteMangasModalContent.propTypes = {
  mangas: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onMangasDeleted: PropTypes.func.isRequired,
};

export default DeleteMangasModalContent;
