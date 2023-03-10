import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { Repository } from 'typeorm';
import { UserResponse } from '../modules/user/dto/user.response';
import { CreateUserDto } from '../modules/user/dto/create-user.dto';
import { UpdateUserDto } from '../modules/user/dto/update-user.dto';
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

  async createUser(userBody: CreateUserDto): Promise<UserResponse> {
    const user = await this.userRepository.create(userBody);
    return this.userRepository.save(user);
  }

  async updateUserById(userBody: UpdateUserDto, id: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(UserErrorMessagesEnum.USER_NOT_FOUND);
    }

    return this.userRepository.save({ id, ...userBody });
  }

  async removeUserById(id: string): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
