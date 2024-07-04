import { Controller, Request, Post, UseGuards, Get, Res, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('signin')
    async signin(@Request() req, @Res() res: Response) {
        const { accessToken, refreshToken } = await this.authService.signin(req.user);
        res.cookie('refreshToken', refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
        res.json({ accessToken });
    }

    @Post('signup')
    async signup(@Body() body, @Res() res: Response) {
        const { login, password } = body;
        const { accessToken, refreshToken } = await this.authService.signup(login, password);
        res.cookie('refreshToken', refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
        res.json({ accessToken });
    }

    
    @UseGuards(AuthGuard('jwt-refresh'))
    @Get('refresh')
    async getProfile(@Request() req, @Res() res: Response) {
        const { accessToken, refreshToken } = await this.authService.refresh(req.user);
        res.cookie('refreshToken', refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
        res.json({ accessToken });
    }
}
