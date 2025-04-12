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

// Use the routers
app.use('/mangas', mangasRouter);
app.use('/authors', authorsRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
