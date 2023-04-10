import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories';
import { User } from '../../entities';
import * as bcrypt from 'bcrypt';
import { UserFieldsEnum, UserErrorMessagesEnum } from '../../common/enums';
import {
  ChangePasswordDto,
  ChangeUserRoleDto,
  CreateUserDto,
  UpdateUserDto,
  UserResponse,
} from './dto';
import { AuthService } from '../auth';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

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

    const hashedPass = await this.authService.hashPassword(userBody.password);
    return this.userRepository.createUser({
      ...userBody,
      password: hashedPass,
    });
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

    this.authService.passwordsMatch(passwords.password, user.password);
    if (newPassSame) {
      throw new BadRequestException(UserErrorMessagesEnum.SAME_PASSWORDS);
    }

    const hashedPass = await this.authService.hashPassword(
      passwords.newPassword,
    );
    await this.userRepository.updateUserById({ password: hashedPass }, id);
  }
}
