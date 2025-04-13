const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const mangasRouter = require('./routers/mangas');
const authorsRouter = require('./routers/author');
const usersRouter = require('./routers/users');
const contentRouter = require('./routers/content'); // ✅ add this!

const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/mangas', mangasRouter);
app.use('/authors', authorsRouter);
app.use('/users', usersRouter);
app.use('/content', contentRouter); // ✅ now /content routes will work!

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
