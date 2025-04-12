const express = require('express');
const db = require('../db'); // Assuming your DB connection is handled here

const authorsRouter = express.Router();

// Get all authors from the database
authorsRouter.get('/', (req, res) => {
  const sql = `SELECT * FROM authors`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching authors:', err.message);
      return res.status(500).send('An error occurred while fetching authors');
    }

    res.json(results);
  });
});

// Handle POST requests to add a new author
authorsRouter.post('/', (req, res) => {
  const { name } = req.body;

  // Check if name is provided and not just empty spaces
  if (!name || name.trim() === '') {
    return res.status(400).send('Name is required and cannot be empty');
  }

  // Check if author already exists
  const checkAuthorSQL = `SELECT * FROM authors WHERE name = ?`;
  db.query(checkAuthorSQL, [name], (err, results) => {
    if (err) {
      console.error('Error checking author existence:', err.message);
      return res.status(500).send('An error occurred while checking author existence');
    }
    
    if (results.length > 0) {
      return res.status(400).send('Author already exists');
    }

    const addAuthorSQL = `INSERT INTO authors (name) VALUES (?)`;
    db.query(addAuthorSQL, [name], (err, results) => {
      if (err) {
        console.error('Error adding author:', err.message);
        return res.status(500).send('An error occurred while adding the author');
      }

      res.json({ 
        message: 'Author added successfully', 
        author: { id: results.insertId, name } 
      });
    });
  });
});

module.exports = authorsRouter;
