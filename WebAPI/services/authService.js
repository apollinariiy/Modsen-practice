const UserDto = require('../dtos/userDTO');
const tokenService = require('./tokenService');
require('dotenv').config();
const prisma = require('../models/prisma');
const bcrypt = require('bcryptjs');
const AuthError = require('../models/error');

class AuthService {
    async signup(data) {
        const candidate = await prisma.users.findFirst({
            where: {
                login: data.login
            }
        })
        if (candidate) {
            throw AuthError.BadRequest('User already exists');
        }
        const hashPassword = bcrypt.hashSync(data.password, 3);
        const newUser = await prisma.users.create({
            data: {
                login: data.login,
                password: hashPassword,
                role: 'user'
            }
        })
        const userDto = new UserDto(newUser);
        const tokens = await tokenService.generateTokens({ id: userDto.id, role: userDto.role })
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }



    async signin(user) {
        const userDto = new UserDto(user);
        const tokens = await tokenService.generateTokens({ id: userDto.id, role: userDto.role })
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }

    async signout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw AuthError.UnauthorizedError();
        }
        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDB) {
            throw AuthError.UnauthorizedError();
        }
        const user = await prisma.users.findUnique({
            where: {
                id: userData.id
            }
        })
        const userDto = new UserDto(user);
        const tokens = await tokenService.generateTokens({ id: userDto.id, role: userDto.role })
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new AuthService()