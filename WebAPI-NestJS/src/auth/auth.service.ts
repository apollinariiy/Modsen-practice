import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { PayloadDto } from './dto/payload.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private prisma: PrismaService) { }

    async signin(user: PayloadDto) {
        const payload = { id: user.id, role: user.role };
        const tokens = await this.generateTokens(payload)
        await this.saveRefreshToken(tokens.refreshToken, user.id)
        return {
            ...tokens
        };
    }

    async signup(user: UserDto) {
        const candidate = await this.prisma.users.findFirst({
            where: {
                login: user.login
            }
        })
        if (candidate) throw new BadRequestException('User already exists');
        const hashedPassword = await bcrypt.hash(user.password, +process.env.bcrypt_rounds);
        const createdUser = await this.prisma.users.create({
            data: {
                login: user.login,
                password: hashedPassword,
                role: 'user'
            },
        });

        const payload = { id: createdUser.id, role: createdUser.role };
        const tokens = await this.generateTokens(payload);

        await this.saveRefreshToken(tokens.refreshToken, createdUser.id)

        return {
            ...tokens
        };
    }

    async refresh(user: PayloadDto) {
        const payload = { id: user.id, role: user.role };
        const tokens = await this.generateTokens(payload);
        await this.saveRefreshToken(tokens.refreshToken, user.id)

        return {
            ...tokens
        };
    }

    async validateUser(userDto: UserDto) {
        const user = await this.prisma.users.findFirst({
            where: {
                login: userDto.login
            }
        });
        const checkPassword = await bcrypt.compare(userDto.password, user.password)
        if (user && checkPassword) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async findRefreshToken(refreshToken: string) {
        const tokenFromDB = await this.prisma.tokens.findFirst({
            where: {
                refreshToken: refreshToken
            }
        });
        if (tokenFromDB) {
            return tokenFromDB;
        }
        return null;
    }

    async saveRefreshToken(refreshToken: string, userId: number) {
        const tokenData = await this.prisma.tokens.findFirst({
            where: {
                userId: userId
            }
        })
        if (tokenData) {
            const updateToken = await this.prisma.tokens.update({
                where: { id: tokenData.id },
                data: { refreshToken: refreshToken }
            })
            return updateToken
        }
        const token = await this.prisma.tokens.create({
            data: {
                userId: userId,
                refreshToken: refreshToken
            }
        })
        return token;
    }

    generateTokens = async (payload:PayloadDto) => {
        const accessToken = this.jwtService.sign(payload, { secret:process.env.access_secret ,expiresIn: '1h' })
        const refreshToken = this.jwtService.sign(payload, {secret:process.env.refresh_secret, expiresIn: '1d' })
        return {
            accessToken, refreshToken
        }
    }

}