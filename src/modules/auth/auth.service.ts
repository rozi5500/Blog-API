import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserFieldsEnum } from '../../common/enums/user_fields.enum';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities';
import * as bcrypt from 'bcrypt';
import { AuthLoginResponse } from '../../common/types/auth-login-response.type';
import * as process from 'process';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Partial<User>> {
    const user = await this.usersService.findOne(email, UserFieldsEnum.EMAIL);
    const arePasswordsSame = await bcrypt.compare(pass, user.password);

    if (user && arePasswordsSame) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userData } = user;
      return userData;
    }

    return null;
  }

  generateTokens(payload: any, options?): AuthLoginResponse {
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(
      { userId: payload.userId },
      options,
    );

    return {
      access_token,
      refresh_token,
    };
  }

  async login(user: User): Promise<AuthLoginResponse> {
    const payload = { email: user.email, sub: user.id, role: user.role };

    const tokens = this.generateTokens(payload, {
      expiresIn: process.env.REFRESH_EXPIRES_IN,
      secret: process.env.JWT_REFRESH_SECRET,
    });

    await this.usersService.updateUserById(
      { refresh_token: tokens.refresh_token },
      user.id,
    );

    return tokens;
  }

  async refreshTokens(userId: string): Promise<AuthLoginResponse> {
    const user = await this.usersService.findOne(userId);
    const payload = { email: user.email, sub: user.id, role: user.role };

    const tokens = this.generateTokens(payload, {
      expiresIn: process.env.REFRESH_EXPIRES_IN,
      secret: process.env.JWT_REFRESH_SECRET,
    });

    await this.usersService.updateUserById(
      { refresh_token: tokens.refresh_token },
      user.id,
    );

    return tokens;
  }

  async getUsersProfile(payload: any): Promise<User> {
    return this.usersService.findOne(payload.id);
  }
}
