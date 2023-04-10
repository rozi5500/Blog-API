import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UsersService } from '../../users';

type payloadData = {
  userId: string;
};

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: payloadData): Promise<any> {
    const user = await this.usersService.findOne(payload.userId);
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();

    if (user.refresh_token === refreshToken) {
      return { userId: payload.userId };
    }

    return null;
  }
}
