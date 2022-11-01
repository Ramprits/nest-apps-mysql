import { ApiTags } from '@nestjs/swagger';
import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserService } from './user.service';
import { Users } from '../entities/Users';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Crud({
  model: {
    type: Users,
  },
})
@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController implements CrudController<Users> {
  constructor(public service: UserService) {}
}
