import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
        usernameField: 'login',
        passwordField: 'password'
      });
  }

  async validate(login: string, password: string): Promise<any> {

    const user = await this.prisma.users.findFirst({where:{
        login: login
    }});

    if (!user) throw new UnauthorizedException('Incorrect login');
    if(!await bcrypt.compare(password, user.password)) throw new UnauthorizedException('Incorrect password'); 
    
    return user;
  }
}