import { Controller, Request, Post, UseGuards, Get, Res, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserDto } from './dto/user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RefreshJwtAuthGuard } from './guards/refresh.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('signin')
    @ApiBody({type: UserDto})
    async signin(@Request() req, @Res() res: Response) {
        const { accessToken, refreshToken } = await this.authService.signin(req.user);
        res.cookie('refreshToken', refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
        res.json({ accessToken });
    }

    @Post('signup')
    async signup(@Body() userDto: UserDto, @Res() res: Response) {
        const { accessToken, refreshToken } = await this.authService.signup(userDto);
        res.cookie('refreshToken', refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
        res.json({ accessToken });
    }


    @UseGuards(RefreshJwtAuthGuard)
    @Get('refresh')
    async refresh(@Request() req, @Res() res: Response) {
        const { accessToken, refreshToken } = await this.authService.refresh(req.user);
        res.cookie('refreshToken', refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
        res.json({ accessToken });
    }

}
