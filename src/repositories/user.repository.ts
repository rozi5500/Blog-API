import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { Repository } from 'typeorm';
import { UserResponse } from '../modules/users/dto/user.response';
import { CreateUserDto } from '../modules/users/dto/create-user.dto';
import { UpdateUserDto } from '../modules/users/dto/update-user.dto';
import { UserErrorMessagesEnum } from '../common/enums/error-messages.enum';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserResponse[]> {
    return this.userRepository.find({
      relations: ['posts', 'comments'],
      select: { password: false },
    });
  }

  async findOne(param: string | number, field = 'id'): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { [field]: param },
    });

    if (!user) {
      throw new NotFoundException(UserErrorMessagesEnum.USER_NOT_FOUND);
    }

    return user;
  }

  async createUser(userBody: CreateUserDto): Promise<UserResponse> {
    const user = await this.userRepository.create(userBody);
    return this.userRepository.save(user);
  }

  async updateUserById(userBody: UpdateUserDto, id: string): Promise<User> {
    await this.userRepository.save({ id, ...userBody });

    return this.findOne(id);
  }

  async removeUserById(id: string): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
