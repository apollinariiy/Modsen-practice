const SingUserDto = require('../dtos/signUserDTO');
const AuthService = require('../services/authService');
const passport = require('passport');

class AuthController {
    async signup(req, res, next) {
        try {
            const data = req.body;
            const singUserDto = new SingUserDto(data);
            const userData = await AuthService.signup(singUserDto)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async signin(req, res, next) {
        passport.authenticate('local', async (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(400).json({ message: info.message });
            }
            try {
                const userData = await AuthService.signin(user);
                res.cookie('refreshToken', userData.refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
                return res.json(userData)
            } catch (e) {
                next(e);
            }
        })(req, res, next);
    }

    async signout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await AuthService.signout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token)
        } catch (e) {
            next(e)
        }

    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await AuthService.refresh(refreshToken);
            res.cookie('refreshToken', token.refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
            return res.json(token)
        } catch (e) {
            next(e)
        }

    }
}

module.exports = new AuthController();