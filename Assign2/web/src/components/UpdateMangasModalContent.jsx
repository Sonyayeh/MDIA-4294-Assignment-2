// this is the content section of updating manga
import React, { useState, useEffect } from "react";
import m from "./AddmangasModalContent.module.css";
import g from "../global.module.css";

// this part is long as heck:
// it fetches the pre-existing data about the manga, its author, name, image, year, genre, and summary
function UpdateMangasModalContent({ onClose, onMangasUpdated, mangas }) {
  const [dbAuthors, setDbAuthors] = useState([]);
  const [authorId, setAuthorId] = useState(mangas.author_id ?? "");
  const [title, setTitle] = useState(mangas.title);
  const [image, setImage] = useState(null);
  const [year, setYear] = useState(mangas.year ?? "");
  const [description, setDescription] = useState(mangas.description ?? "");
  const [genre, setGenre] = useState(mangas.genre ?? "");
  const [isNewAuthor, setIsNewAuthor] = useState(false);
  const [newAuthor, setNewAuthor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // this is basically useEffect fetching data from the API and ensures the authors' data are being fetched and stored in the components's state when they are being first rendered
  useEffect(() => {
    fetch("http://localhost:3000/authors")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch authors");
        }
        return res.json();
      })
      .then((data) => setDbAuthors(data))
      .catch((error) => console.error("Error fetching authors:", error));
  }, []);

  // this is to allow users to switch between selecting an existing author or adding a new one
  // it also manages the relevant state to reflect those changes
  const handleAuthorSelectChange = (event) => {
    if (event.target.value === "-1") {
      setIsNewAuthor(true);
      setAuthorId("");
    } else {
      setIsNewAuthor(false);
      setAuthorId(event.target.value);
    }
  };


  // this is to set up the initial state to handle the submission form and to make sure the UI is ready to show any potential errors
  // it also display a loading state while waiting for the server's response
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    let finalAuthorId = authorId;
    
    // If it's a new author, we need to create that author first
    // This allows the users to add new authors and be stored in the authors section in the API
    // It also have some error messages and system to catch any existing erros when creating new author
    if (isNewAuthor) {
      try {
        const authorResponse = await fetch("http://localhost:3000/authors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newAuthor }),
        });

        if (!authorResponse.ok) {
          const errorText = await authorResponse.text();
          throw new Error(errorText || "Failed to create author");
        }

        const authorData = await authorResponse.json();
        finalAuthorId = authorData.author.id;
      } catch (error) {
        console.error("Error creating new author:", error);
        setErrorMessage("Failed to create author. Please try again.");
        setLoading(false);
        return;
      }
    }

    // this will be used to send the form data to the server snf iy includes the key values that were formed 
    const formData = new FormData();
    formData.append("author_id", finalAuthorId);
    formData.append("title", title);
    formData.append("year", year);
    formData.append("description", description);
    formData.append("genre", genre);

    // If there is a new image, append it to the form data
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(`http://localhost:3000/mangas/${mangas.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error updating manga:", errorText);
        throw new Error("Failed to update manga");
      }

      // This is to call the callback function to update the manga list
      onMangasUpdated();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to update manga. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  // big chunk again:
  // basically this is the edit section, the UI that pops up when you click edit/update
  // you can edit the title, description, author, etc, and they will be updated to the API/Server
  // there are a lot of features, such as edit the author, image, or descriptoin
  // everything will be updated after being saved, and the data will be posted to the server/API
  return (
    <div className={m["modal-container"]}>
      <div className={`${m["modal"]} ${g["card"]}`} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <h3>Edit Manga</h3>
          {errorMessage && <p className={g["error-message"]}>{errorMessage}</p>}
          <form className={g["form-group"]} onSubmit={handleFormSubmit} encType="multipart/form-data">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

            <label htmlFor="author">Author</label>
            {!isNewAuthor ? (
              <select id="author" value={authorId} onChange={handleAuthorSelectChange} required>
                {dbAuthors.map((author) => (
                  <option key={author.id} value={author.id}>{author.name}</option>
                ))}
                <option value="-1">+ New Author +</option>
              </select>
            ) : (
              <input type="text" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} required />
            )}

            <label htmlFor="year">Year</label>
            <input type="number" id="year" value={year} onChange={(e) => setYear(e.target.value)} required />

            <label htmlFor="description">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />

            <label htmlFor="genre">Genre</label>
            <input type="text" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />

            <label htmlFor="image">Upload New Image</label>
            <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />

            <button className={`${g["button"]} ${g["success"]}`} type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
        {/* this is to align the image to the right side of the container and also provide some padding to make sure there are enough space between each content
        
        I also made the width smaller so people can see better on screen and not have the image be too big that it stretches the container!
        */}
        <div style={{ marginLeft: "20px" }}>
          <label>Current Image</label>
          <img src={`http://localhost:3000/images/${mangas.imageUrl}`} alt="Manga Cover" style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "cover" }} />
        </div>
        <button onClick={onClose} className={m["modal__close-button"]}>x</button>
      </div>
    </div>
  );
}

export default UpdateMangasModalContent;
