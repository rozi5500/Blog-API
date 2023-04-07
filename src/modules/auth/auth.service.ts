import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities';
import { AuthLoginResponse } from '../../common/types/auth-login-response.type';
import { UserErrorMessagesEnum, UserFieldsEnum } from '../../common/enums';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { RestorePasswordDto } from './dto/restore-password.dto';
import { MailService } from '../mail/mail.service';
import * as process from 'process';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
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

  async forgotPassword(body: ForgotPasswordDto): Promise<void> {
    const user = await this.usersService.findOne(
      body.email,
      UserFieldsEnum.EMAIL,
    );

    if (!user) {
      throw new NotFoundException(UserErrorMessagesEnum.USER_NOT_FOUND);
    }

    const token = this.jwtService.sign({ email: user.email, sub: user.id });
    const restorePassUrl = `${process.env.DB_HOST}:${process.env.PORT}/auth/password/restore?token=${token}`;

    await this.usersService.updateUserById({ authToken: token }, user.id);
    await this.mailService.sendMail(user, restorePassUrl);
  }

  async restorePassword(
    token: string,
    userData: RestorePasswordDto,
  ): Promise<void> {
    try {
      const decodedToken = this.jwtService.verify(token);
      const user = await this.usersService.findOne(
        decodedToken.email,
        UserFieldsEnum.EMAIL,
      );
      const ArePasswordsSame = await bcrypt.compare(
        userData.password,
        user.password,
      );

      if (user.authToken !== token) {
        throw new UnauthorizedException(UserErrorMessagesEnum.INVALID_TOKEN);
      }
      if (ArePasswordsSame) {
        throw new BadRequestException(UserErrorMessagesEnum.SAME_PASSWORDS);
      }

      const { password } = await this.usersService.hashPassword({
        password: userData.password,
      });

      await this.usersService.updateUserById(
        { password, authToken: null },
        decodedToken.sub,
      );
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
