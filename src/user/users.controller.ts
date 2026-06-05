import { Body, Controller, Post } from '@nestjs/common';
import { User } from './users.entity';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return await this.usersService.createUser(registerDto);
  }
}
