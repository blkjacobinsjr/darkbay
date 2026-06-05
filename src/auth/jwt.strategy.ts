import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  username: string;
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Sucht nach 'Authorization: Bearer <TOKEN>'
      ignoreExpiration: false,
      secretOrKey: 'SUPER_GEHEIMES_SECRET_NUR_FUER_DEN_DEV_MODUS', // Muss exakt dasselbe Secret wie im AuthModule sein!
    });
  }

  validate(payload: JwtPayload) {
    return { id: payload.sub, username: payload.username };
  }
}
