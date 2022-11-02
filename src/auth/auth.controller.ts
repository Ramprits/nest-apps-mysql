import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { Users } from '../entities/Users';
import { registerUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './currentUser';

interface UserRequest extends Request {
  user: Users;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: UserRequest) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() user: registerUserDto) {
    return this.authService.register(user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@CurrentUser() user: any) {
    return user;
  }
}
