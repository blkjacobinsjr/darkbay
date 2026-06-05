import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/users.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = User>(err: any, user: any): TUser {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          'Zugriff verweigert. Ungültiges oder fehlendes Token.',
        )
      );
    }

     return user as TUser;
  }
}
