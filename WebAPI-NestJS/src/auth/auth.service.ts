import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private prisma: PrismaService) { }

    async signin(user: any) {
        const payload = { id: user.id, role: user.role };
        const resreshToken = this.jwtService.sign(payload, { expiresIn: '1d' });
        await this.prisma.tokens.create({
            data: {
                userId: user.id,
                refreshToken: resreshToken
            }
        });
        return {
            accessToken: this.jwtService.sign(payload),
            refreshToken: resreshToken,
        };
    }

    async signup(login: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 3);

        const user = await this.prisma.users.create({
            data: {
                login,
                password: hashedPassword,
                role: 'user'
            },
        });

        const payload = { login: user.login, role: user.role };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '1d' });

        await this.prisma.tokens.create({
            data: {
                refreshToken: refreshToken,
                userId: user.id,
            },
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async refresh(user: any) {
        const payload = { id: user.id, role: user.role };
        const resreshToken = this.jwtService.sign(payload, { expiresIn: '1d' });
        await this.prisma.tokens.update({
           where: {
            id: user.tokenId
           },
           data:{
            refreshToken: resreshToken
           }
        });
        return {
            accessToken: this.jwtService.sign(payload),
            refreshToken: resreshToken,
        };
    }
}