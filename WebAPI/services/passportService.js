const prisma = require('../models/prisma')
const passport = require('passport');
const passportJWT = require("passport-jwt");
const bcrypt = require('bcryptjs');
const SingUserDto = require('../dtos/signUserDTO');
require('dotenv').config();

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
},
    async function(login, password, done) {
        try {
            const singUserDto = new SingUserDto({login, password});
            const user = await prisma.users.findFirst({
                where: {
                    login: singUserDto.login
                }
            });

            if (!user) {
                return done(null, false, { message: 'Incorrect login' });
            }

            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user, { message: 'Logged' });
        } catch (err) {
            return done(err);
        }
    }
));


passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_access
},
    async function (jwtPayload, done) {
        try {
            const user = await prisma.users.findUnique({
                where: {
                    id: jwtPayload.id
                }
            });
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

module.exports = passport;