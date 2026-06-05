import { Controller, Post, Body, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/users.entity';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, 
        private readonly usersService: UserService
    ) {}
    @Post('login')
    async login(@Body()loginDto: LoginDto): Promise<User> {
        return this.authService.login(request.user);
    }
}
