import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express'
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    return req?.cookies?.refreshToken;
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.access_secret,
        });
    }

    async validate(payload: any) {
        const refreshToken = payload.refreshToken;
        console.log(refreshToken);
        const tokenFromDB = await this.prisma.tokens.findFirst({
            where: {
                refreshToken: refreshToken
            }
        });
        if (!tokenFromDB) {
            throw new UnauthorizedException('Incorrect refresh token')
        }
        return { tokenId: tokenFromDB.id, id: payload.id, role: payload.role };
    }
}