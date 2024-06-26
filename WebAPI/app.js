const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const meetupRouter = require('./routes/meetupRouter');
const authRouter = require('./routes/authRouter');
const errorMiddleware = require('./middleware/errorMiddleware');
const participantRouter = require('./routes/participantRoute');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJsdoc = require('swagger-jsdoc');
var cookieParser = require('cookie-parser');
require('./services/passportService');
const passport = require('passport');
const app = express();


app.use(bodyParser.json());
app.use(cookieParser());


const swaggerDoc = YAML.load('./swagger.yaml');
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/auth', authRouter);
app.use('/meetups', meetupRouter);
app.use('/participants', participantRouter);

app.use(errorMiddleware);


app.listen(3000, () => console.log(`App listening on port ${3000}`))