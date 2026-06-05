import { Controller } from '@nestjs/common';
import { User } from './users.entity';
import { RegisterDto } from '../user/dto/register.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {

    @Post('register')
    register(@Body()registerDto: RegisterDto): Promise<User> {
      return this.usersService.create(RegisterDto);
    }
  }
}
