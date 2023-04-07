import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { UserResponse } from './dto/user.response';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../entities';
import * as bcrypt from 'bcrypt';
import { UserFieldsEnum, UserErrorMessagesEnum } from '../../common/enums';
import { ChangeUserRoleDto } from './dto/change-role.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findAll(): Promise<UserResponse[]> {
    return this.userRepository.findAll();
  }

  async createUser(userBody: CreateUserDto): Promise<UserResponse> {
    const user = await this.userRepository.findOne(
      userBody.email,
      UserFieldsEnum.EMAIL,
    );

    if (userBody.email === user?.email) {
      throw new BadRequestException('This email already exists');
    }

    const userWithHashedPass = await this.hashPassword(userBody);
    return this.userRepository.createUser(userWithHashedPass);
  }

  async updateUserById(userBody: UpdateUserDto, id: string): Promise<User> {
    await this.findOne(id);

    return this.userRepository.updateUserById(userBody, id);
  }

  async deleteUserById(id: string): Promise<void> {
    return this.userRepository.removeUserById(id);
  }

  async findOne(param: string | number, field = 'id'): Promise<User> {
    const user = await this.userRepository.findOne(param, field);

    if (!user) {
      throw new NotFoundException(UserErrorMessagesEnum.USER_NOT_FOUND);
    }

    return user;
  }

  async hashPassword(user: Partial<User>): Promise<any> {
    const salt = 10;
    const hashedPass = await bcrypt.hash(user.password, salt);

    return { ...user, password: hashedPass };
  }

  comparePasswords(password, encryptedPass): undefined | Error {
    const ArePasswordsSame = bcrypt.compareSync(password, encryptedPass);

    if (!ArePasswordsSame) {
      throw new BadRequestException(UserErrorMessagesEnum.INVALID_PASSWORD);
    }

    return;
  }

  async changeUserRole(body: ChangeUserRoleDto): Promise<User> {
    return this.userRepository.updateUserById(body, body.id);
  }

  async changePassword(
    passwords: ChangePasswordDto,
    id: string,
  ): Promise<void> {
    const user = await this.findOne(id);
    const newPassSame = bcrypt.compareSync(
      passwords.newPassword,
      user.password,
    );

    this.comparePasswords(passwords.password, user.password);
    if (newPassSame) {
      throw new BadRequestException(UserErrorMessagesEnum.SAME_PASSWORDS);
    }

    const { password } = await this.hashPassword({
      password: passwords.newPassword,
    });
    await this.userRepository.updateUserById({ password }, id);
  }
}
