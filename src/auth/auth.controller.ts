import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    username: string;
    passwordHash: string;
    createdAt: Date;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() request: AuthenticatedRequest) {
    return this.authService.login(request.user);
  }
}
