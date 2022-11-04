import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { registerUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { Users } from '../entities/Users';

export interface TokenPayload {
  userId: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validate(email: string, pass: string) {
    const user = await this.userService.validateEmail(email, pass);
    if (user) return user;
    return null;
  }
  async login(user: Users, response?: Response) {
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);

    if (response) {
      response.cookie('Authentication', token, {
        httpOnly: true,
        expires,
      });
    }

    return token;
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }

  async register(user: registerUserDto): Promise<{ message: string }> {
    return await this.userService.registerUser(user);
  }
}
