const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const mangasRouter = require('./routers/mangas');
const authorsRouter = require('./routers/author');
// because added a user in API, the user router must be added in the server in order to have access
const usersRouter = require('./routers/users');
// this is to add the content router to the server, same reason as to the users
const contentRouter = require('./routers/content'); 

const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/mangas', mangasRouter);
app.use('/authors', authorsRouter);
// because added a user in API, the user router must be added in the server in order to have access
app.use('/users', usersRouter);
// this is to add the content router to the server so the router will work
app.use('/content', contentRouter); 

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
