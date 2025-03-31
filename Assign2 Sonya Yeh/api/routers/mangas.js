const express = require('express');
const db = require('../db');
const upload = require('../storage');
const path = require('path'); // Import path for static file handling

const mangasRouter = express.Router();

// Serve images from the 'public/images' folder
mangasRouter.use('/images', express.static(path.join(__dirname, '../public/images')));

// Get all mangas from the database, with optional author and genre filters
mangasRouter.get('/', (req, res) => {
  const { authors, genre } = req.query;  // Extract authors and genre from query

  let sql = `
    SELECT mangas.*, authors.name AS author, authors.id AS author_id
    FROM mangas
    JOIN authors ON mangas.author_id = authors.id
  `;

  const queryParams = [];
  
  // Filter by authors if provided
  if (authors) {
    const authorsArray = authors.split(',');
    sql += ` WHERE authors.id IN (?)`;
    queryParams.push(authorsArray);
  }

  // Filter by genre if provided (and not "Select Genre")
  if (genre && genre !== "Select Genre") {
    if (queryParams.length > 0) {
      sql += " AND ";  // If there are already filters (authors), use AND
    } else {
      sql += " WHERE ";
    }
    sql += `mangas.genre = ?`;  // Ensure you have a 'genre' column in your mangas table
    queryParams.push(genre);
  }

  // Execute the query
  db.query(sql, queryParams, (err, results) => {
    if (err) {
      console.error('Error fetching mangas:', err.message);
      return res.status(500).send('An error occurred while fetching mangas');
    }

    res.json(results);
  });
});

// Get a single manga from the database
mangasRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT mangas.*, authors.name AS author, authors.id AS author_id
    FROM mangas
    JOIN authors ON mangas.author_id = authors.id
    WHERE mangas.id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching manga by id:', err.message);
      return res.status(500).send('An error occurred while fetching the manga');
    }

    if (results.length === 0) {
      return res.status(404).send('Manga not found');
    }

    res.json(results[0]);
  });
});

// Delete a manga entry in the database
mangasRouter.delete('/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM mangas WHERE id = ? LIMIT 1`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.log('Error deleting manga:', err.message);
      return res.status(500).send("Internal server error");
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('Manga not found');
    }

    res.json({ message: "Manga deleted!" });
  });
});

// Update a manga entry in the database
mangasRouter.put('/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { title, author_id, year } = req.body;

  if (!title || !author_id || !year) {
    return res.status(400).send('Missing required fields');
  }

  let updatemangasQL = `
    UPDATE mangas
    SET title = ?, author_id = ?, year = ?
  `;

  const queryParams = [title, author_id, year];

  if (req.file) {
    updatemangasQL += `, imageUrl = ?`;
    queryParams.push(req.file.filename);  // Use the image filename
  }

  updatemangasQL += ` WHERE id = ? LIMIT 1`;
  queryParams.push(id);

  db.query(updatemangasQL, queryParams, (err, results) => {
    if (err) {
      console.error('Error updating manga:', err.message);
      return res.status(500).send('An error occurred while updating the manga');
    }

    res.json({ message: 'Manga updated successfully' });
  });
});

// Add a new manga to the database
mangasRouter.post('/', upload.single('image'), (req, res) => {
  const { author_id, title, year } = req.body;
  const image = req.file ? req.file.filename : null;  // Store the image filename

  const addmangasQL = `INSERT INTO mangas (author_id, title, imageUrl, year) VALUES (?, ?, ?, ?)`;

  db.query(addmangasQL, [author_id, title, image, year], (err, results) => {
    if (err) {
      console.error('Error adding manga:', err.message);
      return res.status(500).send('An error occurred while adding the manga');
    }

    res.json({ message: 'Manga added successfully' });
  });
});

module.exports = mangasRouter;
