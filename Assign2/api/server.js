const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mangasRouter = require('./routers/mangas');
const authorsRouter = require('./routers/author');
const port = 3000;

const app = express();

// Enable CORS
app.use(cors());

// Enable JSON body parsing
app.use(bodyParser.json());

// Serve the 'public' folder as a static folder
app.use(express.static('public'));

// Use the routers for other routes
app.use('/mangas', mangasRouter);
app.use('/authors', authorsRouter);

// POST /users route for user registration
app.post('/users', (req, res) => {
    const { email, password } = req.body;

    // Check if email or password are missing
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing email or password' });
    }

    // Here, you could save the user to a database (e.g., MySQL)
    console.log('✅ New user registered:', email);

    // Respond back with a success message
    res.status(201).json({ message: 'User created successfully', email });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
