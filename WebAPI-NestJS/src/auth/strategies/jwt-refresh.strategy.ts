import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express'
import { PrismaService } from 'src/prisma.service';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    return req?.cookies?.refreshToken;
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.refresh_secret,
        });
    }

    async validate(payload: any) {
        const tokenFromDB = await this.authService.findRefreshToken(payload.refreshToken)
        if (!tokenFromDB) {
            throw new UnauthorizedException('Incorrect refresh token')
        }
        return { tokenId: tokenFromDB.id, id: payload.id, role: payload.role };
    }
}