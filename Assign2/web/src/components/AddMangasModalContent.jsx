// this is the content section of the adding manga process
import React, { useState, useEffect } from 'react';
import m from './AddMangasModalContent.module.css';
import g from '../global.module.css';

// this section sets and every new authors, titles, images of the manga, while maintaining the database's existing authors
function ModalContent({ onClose, onMangasAdded }) {
  const [dbAuthors, setDbAuthors] = useState([]);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [isNewAuthor, setIsNewAuthor] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');

  // this feature fetches the author data from the API, with the localhost link provided
  useEffect(() => {
    fetch('http://localhost:3000/authors')
      .then((res) => res.json())
      .then((data) => {
        setDbAuthors(data);
        if (data.length > 0) {
          // This sets the first author as the default author
          setAuthor(data[0].id); 
        }
      })
      // having an error catcher just in case if ther are any errors
      .catch((error) => console.error('Error fetching authors:', error));
  }, []);

  // This is the author handling section
  // this allows the users to pick and choose which author they want, but from the API authors list
  const handleAuthorSelectChange = (event) => {
    if (event.target.value === '-1') {
      setIsNewAuthor(true);
      setAuthor('');
    } else {
      setIsNewAuthor(false);
      setAuthor(event.target.value);
    }
  };

  // This is the form submission feature
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let authorId = author;

    // This is the new author making section
    // you can see I already put my name in it as a testing
    // once users input the authors name, it will be saved to the API's authors section with POST method
    if (isNewAuthor) {
      try {
        const response = await fetch('http://localhost:3000/authors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newAuthor }),
        });

        // this is to make sure to give a response if users/system fails to create a new author
        const data = await response.json();
        if (!response.ok) {
          throw new Error('Failed to create author.');
        }
        // this is to give the new author their new author ID in the authors section of the API, as well as a catcher for any potential errors
        authorId = data.authorId || data.id; 
      } catch (error) {
        console.error('Error creating author:', error);
        alert('Failed to create the author. Please try again.');
        return;
      }
    }

    // This is the form section for newly added mangas
    const formData = new FormData();
    formData.append('author_id', authorId);
    formData.append('title', title);
    formData.append('image', image);

    try {
      // Once the form is filled in, it will send to the API link below in the method of POST
      const response = await fetch('http://localhost:3000/mangas', {
        method: 'POST',
        body: formData,
      });

      // if it failed to add manga, it will give an error message
      if (!response.ok) {
        throw new Error('Failed to add manga.');
      }

      // This is to get the new manga data from the response
      const newManga = await response.json();

      // And this is to update the manga list with the newly added manga 
      onMangasAdded(newManga);

      // And this is for closing the modal, with an error catcher just in case if there are any
      onClose();
    } catch (error) {
      console.error('Error adding manga:', error);
      alert('Failed to add manga. Please try again.');
    }
  };

  // this is basically the container section of the form
  // it includes the header, adding new author, name, year and images for you to upload.
  // There is also an add a new author feature so you don't have to always stick to the same authors in the API
  return (
    <div className={m['modal-container']}>
      <div className={`${m['modal']} ${g['card']}`}>
        {/* this is the header */}
        <h3>Add a new manga</h3>
        <form className={`${g['form-group']} ${g['grid-container']}`} onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div className={g['col-6']}>
            {/* author section */}
            <label htmlFor="author">Author</label>
            {/* this is the author list, basically you can choose any authors in the API list and it will map through every options available */}
            {!isNewAuthor ? (
              <select name="author" id="author" value={author} onChange={handleAuthorSelectChange}>
                {dbAuthors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
                {/* this is the new author input section
                if the author is new, add the author to the API under author.name */}
                <option value="-1">+ New Author +</option>
              </select>
            ) : (
              <>
              {/* this is the choosing section, and the button option for adding a new author */}
                <input type="text" name="author" id="author" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} placeholder="Enter new author name" />
                <button type="button" className={`${g['button']} ${m['modal__show-list']}`} onClick={() => setIsNewAuthor(false)}>
                  Show List
                </button>
              </>
            )}
          </div>

            {/* this is the title section, basically the same as author but less annoying because there's no list option. 
            you input the title name and it will be saved to the API */}
          <div className={g['col-6']}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter manga title" />
          </div>

              {/* same thing with the image! */}
          <div className={g['col-6']}>
            <label htmlFor="image">Image</label>
            <input type="file" name="image" id="image" onChange={(e) => setImage(e.target.files[0])} />
          </div>

          {/* And this is the button for submitting the form in the name of Add Manga */}
          <button type="submit" className={`${g['button']} ${g['primary']}`}>
            Add Manga
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalContent;
