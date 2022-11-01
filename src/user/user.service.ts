import { Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { compareHashedPassword } from '../utils';
import { Users } from '../entities/Users';
import { registerUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService extends TypeOrmCrudService<Users> {
  constructor(@InjectRepository(Users) repo: Repository<Users>) {
    super(repo);
  }

  async validateUserForLogin(email: string, password: string) {
    const user = await this.repo.findOne({
      where: {
        email,
      },
      select: ['email', 'firstName', 'lastName', 'password', 'id'],
    });

    if (!user) {
      throw new NotFoundException('User email does not exists');
    }

    const passwordMatched = compareHashedPassword(password, user.password);

    if (!passwordMatched)
      throw new NotFoundException(
        'User email or password does not match please try again.',
      );
    user.password = undefined;
    return user;
  }

  async registerUser(
    userPayload: registerUserDto,
  ): Promise<{ message: string }> {
    // check user already
    const user = await this.repo.findOne({
      where: { email: userPayload.email },
    });

    if (user) {
      throw new BadRequestException('user already exist.');
    }

    const newUser = this.repo.create({
      ...userPayload,
      userName: userPayload.email,
    });
    await this.repo.save(newUser);
    return { message: 'user created successfully' };
  }
}
