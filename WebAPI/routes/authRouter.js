const express = require('express');
const authRouter = express.Router();
const controller = require('../controllers/AuthController');



authRouter.post('/signup', controller.signup);
authRouter.post('/signin', controller.signin);
authRouter.post('/signout', controller.signout);
authRouter.get('/refresh', controller.refresh);

module.exports = authRouter;