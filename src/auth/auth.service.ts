import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { registerUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.validateUserForLogin(email, pass);
    if (user) return user;
    return null;
  }

  async login(user: any) {
    const payload = { user_id: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
        expiresIn: '60m',
      }),
    };
  }
  async register(user: registerUserDto): Promise<{ message: string }> {
    return await this.userService.registerUser(user);
  }
}
