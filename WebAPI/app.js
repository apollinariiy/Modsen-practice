const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const meetupRouter = require('./routes/meetupRouter');
const errorMiddleware = require('./middleware/errorMiddleware');
const app = express();


app.use(bodyParser.json());
app.use(errorMiddleware);

app.use('/meetups', meetupRouter);

app.listen(3000, () => console.log(`App listening on port ${3000}`))