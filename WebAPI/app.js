const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const meetupRouter = require('./routes/meetupRouter');
const authRouter = require('./routes/authRouter');
const errorMiddleware = require('./middleware/errorMiddleware');
const participantRouter = require('./routes/participantRoute');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
var cookieParser = require('cookie-parser');
const deleteOldNotes = require('./middleware/deleteOldNotes');
require('./services/passportService');
const app = express();


app.use(bodyParser.json());
app.use(cookieParser());


const swaggerDoc = YAML.load('./swagger.yaml');
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(deleteOldNotes);
app.use('/auth', authRouter);
app.use('/meetups', meetupRouter);
app.use('/participants', participantRouter);
app.use(errorMiddleware);



app.listen(3000)