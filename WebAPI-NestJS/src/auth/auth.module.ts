import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/jwt-refresh.strategy';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [PassportModule,
    JwtModule.register({})
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, PrismaService, RefreshJwtStrategy, JwtAuthGuard, RolesGuard],
  controllers: [AuthController]
})
export class AuthModule { }
