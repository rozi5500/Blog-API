import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserFieldsEnum } from '../../common/enums/user_fields.enum';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email, UserFieldsEnum.EMAIL);
    const arePasswordsSame = await bcrypt.compare(pass, user.password);

    if (user && arePasswordsSame) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userData } = user;
      return userData;
    }

    return null;
  }

  async login(user: User): Promise<object> {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
