import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 1. Wird von der LocalStrategy aufgerufen
  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByUsername(username);

    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      return user;
    }
    return null;
  }

  // 2. Wird vom AuthController aufgerufen, nachdem der Guard erfolgreich war
  login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
